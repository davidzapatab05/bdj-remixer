import { NextRequest, NextResponse } from 'next/server';
import { googleDriveService } from '@/lib/googleDrive';

// Control de concurrencia
declare global {
  var processingCount: number;
}

// Configuración global inicial
global.processingCount = global.processingCount || 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    const fileInfo = await googleDriveService.getFileInfo(fileId);
    if (!fileInfo) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const audioMimeTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a',
      'audio/mp4', 'audio/aac', 'audio/ogg', 'audio/flac',
      'audio/x-m4a', 'audio/x-mp4'
    ];
    if (!audioMimeTypes.includes(fileInfo.mimeType)) {
      return NextResponse.json({ error: 'File is not an audio file' }, { status: 400 });
    }

    const fileBuffer = await googleDriveService.downloadFile(fileId);
    if (!fileBuffer || fileBuffer.length === 0) {
      return NextResponse.json({ error: 'Could not download file' }, { status: 500 });
    }

    // 🔒 Control de seguridad
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    const MAX_CONCURRENT = 5;

    if (fileBuffer.length > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 100MB.' }, { status: 413 });
    }
    if (global.processingCount >= MAX_CONCURRENT) {
      return NextResponse.json({ error: 'Server busy. Please try again later.' }, { status: 503 });
    }

    global.processingCount++;

    // 🔒 SEGURIDAD: Solo servir el archivo original para procesamiento en cliente
    // El procesamiento FFmpeg se hace en el cliente para evitar errores de servidor
    const contentType = getContentType(fileInfo.mimeType);
    const fileName = fileInfo.name;

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'X-Original-Filename': fileInfo.name,
        'X-Processing-Required': 'true', // Indica que necesita procesamiento en cliente
      },
    });

  } catch (err) {
    console.error('Error in GET /api/convert:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    global.processingCount = Math.max(0, (global.processingCount || 1) - 1);
  }
}

// 🧩 Utilidades

function getContentType(mimeType: string): string {
  if (mimeType.includes('wav')) return 'audio/wav';
  if (mimeType.includes('m4a') || mimeType.includes('mp4')) return 'audio/mp4';
  if (mimeType.includes('flac')) return 'audio/flac';
  if (mimeType.includes('aac')) return 'audio/aac';
  if (mimeType.includes('ogg')) return 'audio/ogg';
  return 'audio/mpeg';
}