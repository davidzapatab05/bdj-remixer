# BDJ Remixer - Música para DJs | PWA

Una aplicación web moderna (PWA) que permite acceder a música exclusiva para DJs: remixes, pistas, beats y sets. Optimizada para SEO y funcionamiento offline.

## 🎵 Características Principales

- 🔍 **Búsqueda en tiempo real** - Busca carpetas y archivos de música instantáneamente
- 📁 **Navegación por carpetas** - Explora la colección organizada de música DJ
- 🎧 **Reproductor integrado** - Previsualiza pistas antes de descargar
- 📱 **PWA Instalable** - Instala como aplicación nativa en cualquier dispositivo
- 🚀 **Funciona Offline** - Service Worker con caché inteligente
- 💬 **Integración WhatsApp** - Contacto directo para solicitudes especiales
- 🛡️ **Acceso seguro** - Redirección segura a Google Drive
- 🌐 **SEO Optimizado al 100%** - Posicionamiento máximo en buscadores

## 🎯 Optimizaciones SEO

### Meta Tags Avanzados
- ✅ Open Graph completo para redes sociales
- ✅ Twitter Cards para compartir en Twitter
- ✅ Dublin Core Metadata
- ✅ Apple Web App meta tags
- ✅ Soporte multi-idioma (es, es-ES, es-MX, es-AR, es-CO, es-PE)

### Structured Data (JSON-LD)
- ✅ Organization Schema
- ✅ WebSite Schema con SearchAction
- ✅ WebPage Schema
- ✅ WebApplication Schema con ratings
- ✅ MusicGroup Schema
- ✅ BreadcrumbList Schema
- ✅ FAQPage Schema

### Performance y Cache
- ✅ Service Worker avanzado con múltiples estrategias
- ✅ Cache-First para imágenes (30 días)
- ✅ Cache-First para audio (7 días)
- ✅ Network-First para HTML y APIs
- ✅ Headers de seguridad y cache optimizados
- ✅ Compresión activada
- ✅ Preconnect para recursos externos

### PWA Features
- ✅ Manifest completo con shortcuts
- ✅ Iconos maskable para Android
- ✅ Apple Touch Icons
- ✅ Screenshots para instalación
- ✅ Modo standalone
- ✅ Theme colors adaptativos

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

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework de React con SSR
- **TypeScript** - Tipado estático para mayor confiabilidad
- **Tailwind CSS 4** - Estilos utilitarios modernos
- **Google Drive API** - Integración con almacenamiento
- **Lucide React** - Iconos SVG optimizados
- **FFmpeg WASM** - Procesamiento de audio en el navegador
- **Service Worker** - Cache inteligente y modo offline
- **JSON-LD** - Structured Data para SEO avanzado

## 📊 SEO Score

La aplicación está optimizada para obtener:
- ✅ **100/100** en SEO (Lighthouse)
- ✅ **95+/100** en Performance
- ✅ **100/100** en Best Practices
- ✅ **100/100** en Accessibility
- ✅ **PWA Badge** completo

## 🎨 Características PWA

### Instalación
La aplicación se puede instalar como PWA en:
- 📱 **Android** - Chrome, Edge, Firefox
- 🍎 **iOS/iPadOS** - Safari
- 💻 **Desktop** - Chrome, Edge, Opera

### Shortcuts (Accesos directos)
- **Buscar Música DJ** - Búsqueda rápida
- **Remixes Exclusivos** - Acceso directo a remixes
- **Contacto WhatsApp** - Contacto inmediato

### Modo Offline
El Service Worker cachea automáticamente:
- Páginas HTML visitadas
- Imágenes y logos (30 días)
- Archivos de audio (7 días)
- Scripts y estilos necesarios

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

## 🔍 Keywords SEO

La aplicación está optimizada para las siguientes keywords:
- Música para DJs, Remixes exclusivos, Pistas DJ
- Música electrónica, House music, Techno, EDM
- Reggaeton remix, Trap beats, Música latina
- Club music, Party music, Dance music
- DJ tools, DJ tracks, Professional DJ
- Sets DJ, Mixtapes, Live sets

## 📱 Soporte y Contacto

Para soporte técnico, solicitar acceso o música exclusiva:
- 📞 **WhatsApp**: +51-945-270-604
- 📱 **TikTok**: [@bdjremixeroficial](https://www.tiktok.com/@bdjremixeroficial)

## 🚀 Próximas Mejoras

- [ ] Sistema de favoritos
- [ ] Playlists personalizadas
- [ ] Compartir en redes sociales
- [ ] Comentarios y ratings
- [ ] Sistema de recomendaciones
- [ ] Chat en vivo

## 📄 Licencia

Este proyecto es privado y está destinado únicamente para uso de BDJ Remixer.

---

**© 2025 BDJ Remixer** - Música Exclusiva para DJs Profesionales