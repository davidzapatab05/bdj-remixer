import { NextRequest, NextResponse } from 'next/server';
import { googleDriveService } from '@/lib/googleDrive';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action') || 'shared-drives';
    const folderId = url.searchParams.get('folderId') || undefined;
    const driveId = url.searchParams.get('driveId') || undefined;
    const query = url.searchParams.get('query') || undefined;

    console.log(`🔍 API Request: action=${action}, folderId=${folderId}, driveId=${driveId}, query=${query}`);

    switch (action) {
      case 'shared-drives': {
        const drives = await googleDriveService.getSharedDrives();
        return NextResponse.json({ sharedDrives: drives });
      }

      case 'folders': {
        if (!driveId) {
          return NextResponse.json({ error: 'driveId is required for folders' }, { status: 400 });
        }
        
        // Mostrar carpetas siempre - la verificación de permisos se hace al hacer clic
        const folders = await googleDriveService.getFoldersInDrive(driveId);
        return NextResponse.json({ folders });
      }

      case 'files': {
        if (!folderId) {
          return NextResponse.json({ error: 'folderId is required for files' }, { status: 400 });
        }
        
        // Mostrar archivos siempre - la verificación de permisos se hace al hacer clic
        const files = await googleDriveService.getFilesInFolder(folderId, driveId);
        return NextResponse.json({ files });
      }

      case 'search': {
        if (!query) {
          return NextResponse.json({ error: 'query is required' }, { status: 400 });
        }
        
        // Mostrar resultados de búsqueda siempre - la verificación de permisos se hace al hacer clic
        const results = await googleDriveService.searchFiles(query, driveId);
        return NextResponse.json({ files: results });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error('API /drive error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}