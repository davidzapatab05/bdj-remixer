import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { config } from '@/lib/config';

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      config.googleDrive.clientId,
      config.googleDrive.clientSecret,
      config.googleDrive.redirectUri
    );

    // Generar URL de autorización
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.metadata.readonly'
      ],
      prompt: 'select_account' // Solo pedir consentimiento si es necesario, no forzar
    });

    return NextResponse.json({ 
      authUrl,
      message: 'Visita esta URL para renovar los tokens',
      instructions: [
        '1. Haz clic en el enlace de autorización',
        '2. Inicia sesión con tu cuenta de Google',
        '3. Autoriza la aplicación',
        '4. Copia el código de autorización de la URL',
        '5. Usa el endpoint /api/exchange-token con el código'
      ]
    });

  } catch (error: unknown) {
    console.error('Error generating auth URL:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ 
      error: 'Error generating authorization URL', 
      details: errorMessage 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      config.googleDrive.clientId,
      config.googleDrive.clientSecret,
      config.googleDrive.redirectUri
    );

    // Intercambiar código por tokens
    const { tokens } = await oauth2Client.getToken(code);
    
    // Guardar tokens automáticamente
    try {
      const saveResponse = await fetch(`${process.env.BASE_URL || 'http://localhost:3000'}/api/save-tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token
        })
      });
      
      const saveResult = await saveResponse.json();
      
      return NextResponse.json({
        success: true,
        tokens: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date
        },
        autoSave: saveResult.success,
        instructions: [
          '✅ Tokens obtenidos y guardados automáticamente',
          '🔄 Reinicia tu aplicación para que los cambios surtan efecto',
          '💾 Los tokens ahora persistirán entre reinicios'
        ]
      });
    } catch {
      return NextResponse.json({
        success: true,
        tokens: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date
        },
        autoSave: false,
        instructions: [
          '✅ Tokens obtenidos exitosamente',
          '⚠️ Guardado automático falló, actualiza manualmente tu .env.local:',
          `GOOGLE_ACCESS_TOKEN=${tokens.access_token}`,
          `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`,
          '🔄 Reinicia tu aplicación para que los cambios surtan efecto'
        ]
      });
    }

  } catch (error: unknown) {
    console.error('Error exchanging token:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ 
      error: 'Error exchanging authorization code', 
      details: errorMessage 
    }, { status: 500 });
  }
}
