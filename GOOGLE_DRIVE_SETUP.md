# Guía de Puesta en Producción: Google Drive

Esta guía documenta los cambios realizados y los pasos necesarios para asegurar que la integración con Google Drive funcione indefinidamente en producción.

## 1. Cambios Implementados en el Código

Se ha modificado el archivo `lib/googleDrive.ts` para incluir **persistencia automática de tokens**.

### ¿Cómo funciona?
1.  Cuando el `access_token` expira (cada 1 hora), el sistema solicita uno nuevo a Google automáticamente.
2.  Google devuelve un nuevo `access_token` y, ocasionalmente, rota el `refresh_token`.
3.  **Anteriormente:** El nuevo `refresh_token` se perdía al reiniciar la aplicación.
4.  **Ahora:** El sistema detecta el nuevo token y **lo guarda automáticamente** en tu archivo `.env.local`.

> [!NOTE]
> Esto asegura que incluso si reinicias el servidor, la aplicación siempre tendrá las credenciales más recientes.

## 2. Configuración en Google Cloud Console (CRÍTICO)

Para que el token dure **años** y no solo 7 días, debes publicar la aplicación.

### Pasos para Publicar:
1.  Ve a [Google Cloud Console > Pantalla de consentimiento de OAuth](https://console.cloud.google.com/apis/credentials/consent).
2.  Selecciona tu proyecto.
3.  Busca la sección **"Estado de publicación"** (Publishing status).
4.  Haz clic en el botón **"PUBLICAR LA APLICACIÓN"** (PUBLISH APP).
5.  Confirma la acción.

### Proceso de Verificación de Google
Al publicar, Google te pedirá verificar la aplicación si usas permisos sensibles (como leer todo el Drive).

*   **Si te piden verificación:** Google revisará tu app. Esto puede tardar varios días.
*   **Mientras esperas:** Tu app seguirá funcionando, pero mostrará una pantalla de advertencia ("Google no ha verificado esta aplicación") a los nuevos usuarios que intenten loguearse.
*   **Para ti (uso personal):** Puedes ignorar la advertencia (Click en "Avanzado" > "Ir a [Nombre de tu App] (no seguro)") y autorizarla. Una vez autorizada, el token funcionará correctamente.

## 3. Mantenimiento

### ¿Qué hacer si deja de funcionar?
Si en algún momento la conexión falla (por ejemplo, si cambias tu contraseña de Google, lo cual invalida todos los tokens):

1.  Ve a la ruta `/api/refresh-token` en tu navegador.
2.  Sigue los pasos para volver a autorizar.
3.  El sistema guardará los nuevos tokens automáticamente.

---
**Estado Actual:** Código actualizado para persistencia. Esperando confirmación de publicación en Google Console.
