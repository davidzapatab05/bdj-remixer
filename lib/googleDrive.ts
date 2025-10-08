import { google } from 'googleapis';
import { config } from './config';

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

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      config.googleDrive.clientId,
      config.googleDrive.clientSecret,
      config.googleDrive.redirectUri
    );

    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

    console.log('🔍 Verificando tokens (server)...');
    console.log('Has refresh token:', !!refreshToken);
    console.log('Has access token:', !!accessToken);

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

  // Verificar si el usuario actual tiene acceso a un drive compartido
  async checkUserAccess(driveId: string, userEmail?: string): Promise<boolean> {
    if (!this.drive) return false;
    
    try {
      // Intentar acceder al drive compartido
      const res = await this.drive.drives.get({
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
      const res = await this.drive.files.get({
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
      // Try refresh token flow if possible
      try {
        if (this.oauth2Client && this.oauth2Client.refreshAccessToken) {
          const { credentials } = await this.oauth2Client.refreshAccessToken();
          this.oauth2Client.setCredentials(credentials);
          const retry = await this.drive.drives.list({
            pageSize: 100,
            fields: 'nextPageToken, drives(id, name, themeId, colorRgb, backgroundImageLink, createdTime)',
          });
          return retry.data.drives || [];
        }
      } catch (refreshErr) {
        console.error('Error refreshing token:', refreshErr);
      }
      return [];
    }
  }

  // Folders in a shared drive (only root level folders)
  async getFoldersInDrive(driveId: string): Promise<DriveFolder[]> {
    if (!this.drive) return [];
    try {
      console.log('🔍 Getting root folders for drive:', driveId);
      
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
      console.log('📁 Root folders from API:', rootFolders.length);
      console.log('📂 Root folder names (before sorting):', rootFolders.map((f: DriveFolder) => f.name));
      
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
      
      console.log('📂 Root folder names (after sorting):', sortedFolders.map((f: DriveFolder) => f.name));
      
      return sortedFolders;
    } catch (err) {
      console.error('Error getFoldersInDrive:', err);
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

  // Búsqueda mejorada con LIKE (caracteres similares)
  async searchFiles(q: string, driveId?: string): Promise<DriveFile[]> {
    if (!this.drive) return [];
    try {
      console.log('🔍 Searching for:', q, 'in drive:', driveId);
      
      // Escapar caracteres especiales para la query de Google Drive
      const escapedQuery = q.replace(/['"]/g, "\\'");
      
      // Query simplificada que funciona mejor con Google Drive API
      const query = `name contains '${escapedQuery}' and trashed=false`;
      
      console.log('📝 Search query:', query);
      
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
      console.log('📁 Files found by API:', files.length);
      console.log('📂 Sample files:', files.slice(0, 3).map((f: DriveFile) => f.name));
      
      // Filtrar resultados para coincidencias más precisas
      const filteredFiles = files.filter((file: DriveFile) => {
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
      
      console.log('📄 Filtered results:', filteredFiles.length);
      
      return filteredFiles;
    } catch (err) {
      console.error('Error searchFiles:', err);
      return [];
    }
  }
}

export const googleDriveService = new GoogleDriveService();
