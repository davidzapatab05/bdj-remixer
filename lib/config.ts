export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  googleDrive: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || '',
  },
  whatsapp: {
    number: process.env.WHATSAPP_NUMBER || '51945227780',
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'BDJ Remixer',
  },
};