# BDJ Remixer - Explorador de Google Drive

Una aplicación web moderna que permite acceder a unidades compartidas de Google Drive sin necesidad de login, con funcionalidades de búsqueda y navegación intuitiva.

## Características

- 🔍 **Búsqueda en tiempo real** - Busca carpetas y archivos instantáneamente
- 📁 **Navegación por carpetas** - Explora tu Google Drive de forma organizada
- 🔗 **Redirección segura** - Los archivos se abren en Google Drive para verificar permisos
- 📱 **Diseño responsivo** - Funciona perfectamente en desktop y móvil
- 💬 **Integración WhatsApp** - Botón directo para solicitar acceso
- 🛡️ **Sin login requerido** - Acceso directo a contenido compartido

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (copia desde `env.example`):

```env
# Base URL Configuration
BASE_URL=http://localhost:3000

# Google Drive OAuth2 Configuration
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
GOOGLE_DRIVE_FOLDER_ID=id_de_tu_carpeta_compartida

# Google Drive Tokens (obtenidos después de la autenticación)
GOOGLE_REFRESH_TOKEN=tu_refresh_token
GOOGLE_ACCESS_TOKEN=tu_access_token

# WhatsApp Configuration
WHATSAPP_NUMBER=51945227780

# App Configuration
NEXT_PUBLIC_APP_NAME=BDJ Remixer
```

### 2. Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
bdj-remixer/
├── app/
│   ├── api/drive/          # API routes para Google Drive
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página principal
├── components/
│   ├── DriveExplorer.tsx   # Explorador de archivos y carpetas
│   └── WhatsAppModal.tsx   # Modal de contacto WhatsApp
├── lib/
│   ├── config.ts           # Configuración de la aplicación
│   └── googleDrive.ts      # Servicio de Google Drive API
└── public/                 # Archivos estáticos
```

## Funcionalidades

### Header
- **Logo BDJ Remixer** - Logo de la aplicación
- **Buscador central** - Búsqueda en tiempo real
- **Comprar Acceso** - Modal con números de WhatsApp

### Explorador de Archivos
- **Navegación por carpetas** - Click para entrar en carpetas
- **Breadcrumb** - Navegación de regreso fácil
- **Vista de archivos** - Lista organizada con iconos por tipo
- **Botones de acción** - Ver y Abrir archivos
- **Búsqueda global** - Busca en todas las carpetas y archivos

### Seguridad
- Los archivos se abren en Google Drive para verificar permisos
- No se almacenan credenciales en el cliente
- API Key protegida en variables de entorno

## Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Google Drive API** - Integración con Google Drive
- **Lucide React** - Iconos modernos

## Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. Despliega automáticamente

### Otras plataformas

```bash
# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## Soporte

Para soporte técnico o solicitar acceso, contacta por WhatsApp.

## Licencia

Este proyecto es privado y está destinado únicamente para uso de BDJ Remixer.