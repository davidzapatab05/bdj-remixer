import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { access_token, refresh_token } = await request.json();
    
    if (!access_token || !refresh_token) {
      return NextResponse.json({ 
        error: 'access_token and refresh_token are required' 
      }, { status: 400 });
    }

    // Leer el archivo .env.local actual
    const envPath = join(process.cwd(), '.env.local');
    let envContent = '';
    
    try {
      envContent = readFileSync(envPath, 'utf8');
    } catch {
      // Si no existe, crear uno nuevo
      envContent = '';
    }

    // Actualizar o agregar los tokens
    const lines = envContent.split('\n');
    const updatedLines = [];
    let accessTokenUpdated = false;
    let refreshTokenUpdated = false;

    for (const line of lines) {
      if (line.startsWith('GOOGLE_ACCESS_TOKEN=')) {
        updatedLines.push(`GOOGLE_ACCESS_TOKEN=${access_token}`);
        accessTokenUpdated = true;
      } else if (line.startsWith('GOOGLE_REFRESH_TOKEN=')) {
        updatedLines.push(`GOOGLE_REFRESH_TOKEN=${refresh_token}`);
        refreshTokenUpdated = true;
      } else {
        updatedLines.push(line);
      }
    }

    // Agregar tokens si no existían
    if (!accessTokenUpdated) {
      updatedLines.push(`GOOGLE_ACCESS_TOKEN=${access_token}`);
    }
    if (!refreshTokenUpdated) {
      updatedLines.push(`GOOGLE_REFRESH_TOKEN=${refresh_token}`);
    }

    // Escribir el archivo actualizado
    writeFileSync(envPath, updatedLines.join('\n'));

    return NextResponse.json({
      success: true,
      message: 'Tokens guardados en .env.local',
      instructions: [
        'Los tokens han sido guardados automáticamente',
        'Reinicia tu aplicación para que los cambios surtan efecto',
        'Los tokens ahora persistirán entre reinicios'
      ]
    });

  } catch (error: unknown) {
    console.error('Error saving tokens:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ 
      error: 'Error saving tokens', 
      details: errorMessage 
    }, { status: 500 });
  }
}
