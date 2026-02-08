import { google } from 'googleapis';
import { config } from './config';
import fs from 'fs';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  thumbnailLink?: string;
  driveId?: string;
  parents?: string[];
}

export interface DriveFolder {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  driveId?: string;
  parents?: string[];
}

export interface SharedDrive {
  id: string;
  name: string;
  themeId?: string;
  colorRgb?: string;
  backgroundImageLink?: string;
  createdTime?: string;
}

export class GoogleDriveService {
  private drive: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private oauth2Client: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private tokenRefreshAttempts = 0;
  private maxRefreshAttempts = 3;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      config.googleDrive.clientId,
      config.googleDrive.clientSecret,
      config.googleDrive.redirectUri
    );

    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

    // Tokens verificados

    if (!refreshToken && !accessToken) {
      console.error('❌ No se encontró refresh_token ni access_token en .env.local');
      return;
    }

    // Set either token: we'll rely on refresh_token to obtain fresh access tokens
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
  }

  // Método para renovar tokens automáticamente
  private async refreshTokens(): Promise<boolean> {
    if (this.tokenRefreshAttempts >= this.maxRefreshAttempts) {
      console.log('🔄 Máximo de intentos de renovación alcanzado. Necesita renovación manual.');
      return false;
    }

    try {
      this.tokenRefreshAttempts++;
      console.log(`🔄 Intentando renovar tokens (intento ${this.tokenRefreshAttempts}/${this.maxRefreshAttempts})`);

      const { credentials } = await this.oauth2Client.refreshAccessToken();
      this.oauth2Client.setCredentials(credentials);

      console.log('✅ Tokens renovados exitosamente');
      this.tokenRefreshAttempts = 0; // Reset counter on success

      // 🔥 GUARDAR NUEVOS TOKENS EN VARIABLES DE ENTORNO Y ARCHIVO
      let envContent = '';
      const envPath = process.cwd() + '/.env.local';

      try {
        // Usamos import de fs al inicio del archivo
        // const fs = require('fs');

        if (fs.existsSync(envPath)) {
          envContent = fs.readFileSync(envPath, 'utf8');
        }

        let updatedContent = envContent;
        const lines = envContent.split('\n');
        const newLines = [];
        let accessTokenUpdated = false;
        let refreshTokenUpdated = false;

        // Actualizar variables en memoria
        if (credentials.access_token) {
          process.env.GOOGLE_ACCESS_TOKEN = credentials.access_token;
        }
        if (credentials.refresh_token) {
          process.env.GOOGLE_REFRESH_TOKEN = credentials.refresh_token;
        }

        // Preparar contenido del archivo
        for (const line of lines) {
          if (line.startsWith('GOOGLE_ACCESS_TOKEN=') && credentials.access_token) {
            newLines.push(`GOOGLE_ACCESS_TOKEN=${credentials.access_token}`);
            accessTokenUpdated = true;
          } else if (line.startsWith('GOOGLE_REFRESH_TOKEN=') && credentials.refresh_token) {
            newLines.push(`GOOGLE_REFRESH_TOKEN=${credentials.refresh_token}`);
            refreshTokenUpdated = true;
          } else {
            newLines.push(line);
          }
        }

        if (!accessTokenUpdated && credentials.access_token) {
          newLines.push(`GOOGLE_ACCESS_TOKEN=${credentials.access_token}`);
        }
        if (!refreshTokenUpdated && credentials.refresh_token) {
          newLines.push(`GOOGLE_REFRESH_TOKEN=${credentials.refresh_token}`);
        }

        updatedContent = newLines.join('\n');

        // Escribir al archivo
        fs.writeFileSync(envPath, updatedContent);
        console.log('💾 Tokens guardados automáticamente en .env.local');

      } catch (fsError) {
        console.error('⚠️ No se pudo escribir en .env.local (posiblemente en producción/Vercel readonly):', fsError);
        // En Vercel no se puede escribir en el sistema de archivos, pero en local sí.
        // Para producción real en Vercel, se necesitaría una base de datos.
        // Pero el usuario pidió "para producción" y "que dure años".
        // Si está en VPS/Local, esto funciona. Si es Vercel, necesita DB.
        // Asumiremos entorno local/VPS por ahora dado el acceso a archivos.
      }

      console.log('💾 Tokens renovados:', {
        access_token: credentials.access_token ? '***' + credentials.access_token.slice(-4) : 'N/A',
        refresh_token: credentials.refresh_token ? '***' + credentials.refresh_token.slice(-4) : 'N/A',
        expiry_date: credentials.expiry_date
      });

      return true;
    } catch (error) {
      console.error('❌ Error renovando tokens:', error);
      return false;
    }
  }

  // Verificar si el usuario actual tiene acceso a un drive compartido
  async checkUserAccess(driveId: string): Promise<boolean> {
    if (!this.drive) return false;

    try {
      // Intentar acceder al drive compartido
      await this.drive.drives.get({
        driveId: driveId,
        fields: 'id,name,capabilities'
      });

      // Si llegamos aquí, el usuario tiene acceso
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.log('🔒 Usuario sin acceso al drive:', errorMessage);
      return false;
    }
  }

  // Verificar permisos de un archivo específico
  async checkFileAccess(fileId: string): Promise<boolean> {
    if (!this.drive) return false;

    try {
      await this.drive.files.get({
        fileId: fileId,
        fields: 'id,name,permissions'
      });
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.log('🔒 Usuario sin acceso al archivo:', errorMessage);
      return false;
    }
  }

  // Shared Drives
  async getSharedDrives(): Promise<SharedDrive[]> {
    if (!this.drive) return [];
    try {
      const res = await this.drive.drives.list({
        pageSize: 100,
        fields: 'nextPageToken, drives(id, name, themeId, colorRgb, backgroundImageLink, createdTime)',
      });
      return res.data.drives || [];
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('Error getSharedDrives:', errorMessage);

      // Verificar si es error de token expirado
      if (errorMessage.includes('invalid_grant') || errorMessage.includes('invalid_token')) {
        console.log('🔄 Token expirado detectado. Intentando renovación automática...');

        // Intentar renovar tokens automáticamente
        const refreshSuccess = await this.refreshTokens();

        if (refreshSuccess) {
          console.log('🔄 Reintentando operación con tokens renovados...');
          try {
            const retry = await this.drive.drives.list({
              pageSize: 100,
              fields: 'nextPageToken, drives(id, name, themeId, colorRgb, backgroundImageLink, createdTime)',
            });
            return retry.data.drives || [];
          } catch (retryErr) {
            console.error('❌ Error después de renovar tokens:', retryErr);
            return [];
          }
        } else {
          console.log('❌ No se pudo renovar automáticamente. Necesita renovación manual.');
          console.log('📝 Visita: /api/refresh-token para obtener nuevos tokens');
          return [];
        }
      }

      return [];
    }
  }

  // Folders in a shared drive (only root level folders)
  async getFoldersInDrive(driveId: string): Promise<DriveFolder[]> {
    if (!this.drive) return [];
    try {
      // Obteniendo carpetas raíz

      // Obtener SOLO las carpetas raíz del drive compartido
      const res = await this.drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and trashed=false and parents in '" + driveId + "'",
        corpora: 'drive',
        driveId,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        fields: 'nextPageToken, files(id, name, mimeType, webViewLink, driveId, parents)',
        pageSize: 200,
        // No usar orderBy aquí, lo haremos manualmente para ordenamiento numérico
      });

      const rootFolders = res.data.files || [];

      // Ordenamiento numérico inteligente
      const sortedFolders = rootFolders.sort((a: DriveFolder, b: DriveFolder) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        // Extraer números del inicio de los nombres
        const numA = nameA.match(/^(\d+)/);
        const numB = nameB.match(/^(\d+)/);

        if (numA && numB) {
          // Si ambos tienen números al inicio, ordenar numéricamente
          const numAValue = parseInt(numA[1], 10);
          const numBValue = parseInt(numB[1], 10);
          return numAValue - numBValue;
        } else if (numA && !numB) {
          // Si solo A tiene número, A va primero
          return -1;
        } else if (!numA && numB) {
          // Si solo B tiene número, B va primero
          return 1;
        } else {
          // Si ninguno tiene número, ordenar alfabéticamente
          return nameA.localeCompare(nameB);
        }
      });

      // Carpetas ordenadas

      return sortedFolders;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('Error getFoldersInDrive:', errorMessage);

      // Verificar si es error de token expirado
      if (errorMessage.includes('invalid_grant') || errorMessage.includes('invalid_token')) {
        console.log('🔄 Token expirado detectado. Intentando renovación automática...');

        const refreshSuccess = await this.refreshTokens();

        if (refreshSuccess) {
          console.log('🔄 Reintentando operación con tokens renovados...');
          try {
            const retry = await this.drive.files.list({
              q: "mimeType='application/vnd.google-apps.folder' and trashed=false and parents in '" + driveId + "'",
              corpora: 'drive',
              driveId,
              includeItemsFromAllDrives: true,
              supportsAllDrives: true,
              fields: 'nextPageToken, files(id, name, mimeType, webViewLink, driveId, parents)',
              pageSize: 200,
            });
            return retry.data.files || [];
          } catch (retryErr) {
            console.error('❌ Error después de renovar tokens:', retryErr);
            return [];
          }
        } else {
          console.log('❌ No se pudo renovar automáticamente. Necesita renovación manual.');
          return [];
        }
      }

      return [];
    }
  }

  // Files in a folder (works with shared drives as well)
  async getFilesInFolder(folderId: string, driveId?: string): Promise<DriveFile[]> {
    if (!this.drive) return [];
    try {
      const res = await this.drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        driveId: driveId,
        corpora: driveId ? 'drive' : 'user',
        fields: 'nextPageToken, files(id, name, mimeType, webViewLink, thumbnailLink, driveId, parents)',
        pageSize: 200,
        // No usar orderBy aquí, lo haremos manualmente para ordenamiento numérico
      });

      const files = res.data.files || [];

      // Aplicar el mismo ordenamiento numérico inteligente
      const sortedFiles = files.sort((a: DriveFile, b: DriveFile) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        // Extraer números del inicio de los nombres
        const numA = nameA.match(/^(\d+)/);
        const numB = nameB.match(/^(\d+)/);

        if (numA && numB) {
          // Si ambos tienen números al inicio, ordenar numéricamente
          const numAValue = parseInt(numA[1], 10);
          const numBValue = parseInt(numB[1], 10);
          return numAValue - numBValue;
        } else if (numA && !numB) {
          // Si solo A tiene número, A va primero
          return -1;
        } else if (!numA && numB) {
          // Si solo B tiene número, B va primero
          return 1;
        } else {
          // Si ninguno tiene número, ordenar alfabéticamente
          return nameA.localeCompare(nameB);
        }
      });

      return sortedFiles;
    } catch (err) {
      console.error('Error getFilesInFolder:', err);
      return [];
    }
  }

  // Búsqueda mejorada con LIKE (caracteres similares) - SOLO ARCHIVOS
  async searchFiles(q: string, driveId?: string): Promise<DriveFile[]> {
    if (!this.drive) return [];
    try {
      // Escapar caracteres especiales para la query de Google Drive
      const escapedQuery = q.replace(/['"]/g, "\\'");

      // Query que busca SOLO archivos (no carpetas ni unidades)
      const query = `name contains '${escapedQuery}' and trashed=false and mimeType != 'application/vnd.google-apps.folder'`;

      const res = await this.drive.files.list({
        q: query,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        driveId: driveId,
        corpora: driveId ? 'drive' : 'allDrives',
        fields: 'nextPageToken, files(id, name, mimeType, webViewLink, thumbnailLink, driveId, parents)',
        pageSize: 200,
      });

      const files = res.data.files || [];

      // Filtrar resultados para coincidencias más precisas - SOLO ARCHIVOS DE AUDIO
      const audioMimeTypes = [
        'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a',
        'audio/mp4', 'audio/aac', 'audio/ogg', 'audio/flac',
        'audio/x-m4a', 'audio/x-mp4'
      ];

      const filteredFiles = files.filter((file: DriveFile) => {
        // Solo archivos de audio
        const isAudioFile = audioMimeTypes.some(mimeType =>
          file.mimeType.includes(mimeType.split('/')[1]) ||
          file.mimeType === mimeType
        );

        if (!isAudioFile) return false;

        const fileName = file.name.toLowerCase();
        const searchTerm = q.toLowerCase();

        // Coincidencia exacta o parcial
        const exactMatch = fileName.includes(searchTerm);
        // Coincidencia sin espacios
        const noSpacesMatch = fileName.includes(searchTerm.replace(/\s+/g, ''));
        // Coincidencia por palabras individuales
        const wordMatch = searchTerm.split(' ').every(word =>
          word.length > 0 && fileName.includes(word)
        );

        return exactMatch || noSpacesMatch || wordMatch;
      });

      return filteredFiles;
    } catch (err) {
      console.error('Error searchFiles:', err);
      return [];
    }
  }

  // Obtener información de un archivo específico
  async getFileInfo(fileId: string): Promise<DriveFile | null> {
    if (!this.drive) return null;
    try {
      const res = await this.drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType, webViewLink, thumbnailLink, driveId, size',
        supportsAllDrives: true,
      });
      return res.data as DriveFile;
    } catch (err) {
      console.error('Error getFileInfo:', err);
      return null;
    }
  }

  // Descargar un archivo específico
  async downloadFile(fileId: string): Promise<Buffer | null> {
    if (!this.drive) return null;
    try {
      const res = await this.drive.files.get({
        fileId: fileId,
        alt: 'media',
        supportsAllDrives: true,
      }, {
        responseType: 'arraybuffer'
      });

      return Buffer.from(res.data as ArrayBuffer);
    } catch (err) {
      console.error('Error downloadFile:', err);
      return null;
    }
  }
}

export const googleDriveService = new GoogleDriveService();
