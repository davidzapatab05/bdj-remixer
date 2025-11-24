import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Política de Privacidad | BDJ Remixer',
    description: 'Política de Privacidad de BDJ Remixer - Música Exclusiva para DJs. Conoce cómo protegemos tu información y datos personales.',
    robots: 'index, follow',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-6"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al inicio
                    </Link>

                    <h1 className="text-4xl font-bold text-white mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-gray-300">
                        Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-gray-100 space-y-8">

                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Introducción</h2>
                        <p className="leading-relaxed">
                            En <strong>BDJ Remixer</strong> ("nosotros", "nuestro" o "la aplicación"), nos comprometemos a proteger
                            tu privacidad y tus datos personales. Esta Política de Privacidad explica qué información recopilamos,
                            cómo la usamos, y tus derechos respecto a tus datos cuando utilizas nuestra aplicación web.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Información que Recopilamos</h2>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">2.1 Información de Uso</h3>
                        <p className="leading-relaxed mb-3">
                            Cuando utilizas BDJ Remixer, podemos recopilar automáticamente cierta información, incluyendo:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Dirección IP</li>
                            <li>Tipo de navegador y versión</li>
                            <li>Sistema operativo</li>
                            <li>Páginas visitadas y tiempo de permanencia</li>
                            <li>Archivos de música consultados o descargados</li>
                            <li>Términos de búsqueda utilizados</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">2.2 Datos de Google Drive</h3>
                        <p className="leading-relaxed">
                            Nuestra aplicación utiliza la API de Google Drive para acceder a archivos de música almacenados.
                            Solo accedemos a los archivos específicos que has autorizado y no almacenamos tus credenciales
                            de Google en nuestros servidores.
                        </p>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">2.3 Cookies y Almacenamiento Local</h3>
                        <p className="leading-relaxed">
                            Utilizamos cookies y almacenamiento local del navegador para:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Recordar tus preferencias de navegación</li>
                            <li>Mantener tu sesión activa</li>
                            <li>Mejorar el rendimiento de la aplicación mediante caché</li>
                            <li>Habilitar funcionalidad offline (PWA)</li>
                        </ul>
                    </section>

                    {/* How We Use Information */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Cómo Utilizamos tu Información</h2>
                        <p className="leading-relaxed mb-3">
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Proporcionar y mantener nuestro servicio</li>
                            <li>Mejorar, personalizar y expandir nuestra aplicación</li>
                            <li>Entender y analizar cómo utilizas nuestra aplicación</li>
                            <li>Desarrollar nuevos productos, servicios y funcionalidades</li>
                            <li>Comunicarnos contigo para soporte técnico o actualizaciones</li>
                            <li>Detectar y prevenir fraudes o usos no autorizados</li>
                        </ul>
                    </section>

                    {/* Data Sharing */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Compartir Información</h2>
                        <p className="leading-relaxed mb-3">
                            <strong>No vendemos ni alquilamos tu información personal a terceros.</strong> Podemos compartir
                            información solo en las siguientes circunstancias:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Google Drive API:</strong> Para acceder a los archivos de música autorizados</li>
                            <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar la aplicación (hosting, análisis)</li>
                            <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
                        </ul>
                    </section>

                    {/* Google Drive Specific */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Uso de Google Drive API</h2>
                        <p className="leading-relaxed mb-3">
                            BDJ Remixer utiliza la API de Google Drive y cumple con la{' '}
                            <a
                                href="https://developers.google.com/terms/api-services-user-data-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 underline"
                            >
                                Política de Datos de Usuario de los Servicios API de Google
                            </a>, incluyendo los requisitos de Uso Limitado.
                        </p>
                        <p className="leading-relaxed mb-3">
                            El uso que hace BDJ Remixer de la información recibida de las APIs de Google se adhiere a la
                            Política de Datos de Usuario de los Servicios API de Google, incluyendo los requisitos de Uso Limitado.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Solo accedemos a archivos específicos autorizados por el usuario</li>
                            <li>No almacenamos credenciales de Google en nuestros servidores</li>
                            <li>No transferimos datos de Google Drive a terceros sin consentimiento explícito</li>
                            <li>Los tokens de acceso se manejan de forma segura y se renuevan automáticamente</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Seguridad de Datos</h2>
                        <p className="leading-relaxed">
                            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información
                            personal contra acceso no autorizado, alteración, divulgación o destrucción. Estas medidas incluyen:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                            <li>Cifrado SSL/TLS para todas las comunicaciones</li>
                            <li>Almacenamiento seguro de variables de entorno</li>
                            <li>Autenticación OAuth 2.0 con Google</li>
                            <li>Auditorías de seguridad regulares</li>
                        </ul>
                    </section>

                    {/* User Rights */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Tus Derechos</h2>
                        <p className="leading-relaxed mb-3">
                            Tienes derecho a:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Acceso:</strong> Solicitar una copia de tus datos personales</li>
                            <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                            <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos personales</li>
                            <li><strong>Restricción:</strong> Limitar el procesamiento de tus datos</li>
                            <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                            <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                            <li><strong>Revocación:</strong> Revocar el acceso a Google Drive en cualquier momento</li>
                        </ul>
                    </section>

                    {/* Data Retention */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Retención de Datos</h2>
                        <p className="leading-relaxed">
                            Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos
                            descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
                            Los datos de caché local se eliminan automáticamente según las políticas del Service Worker (7-30 días).
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Privacidad de Menores</h2>
                        <p className="leading-relaxed">
                            Nuestra aplicación no está dirigida a menores de 13 años. No recopilamos intencionalmente información
                            personal de niños menores de 13 años. Si descubrimos que hemos recopilado información de un menor,
                            la eliminaremos inmediatamente.
                        </p>
                    </section>

                    {/* Changes to Policy */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Cambios a esta Política</h2>
                        <p className="leading-relaxed">
                            Podemos actualizar nuestra Política de Privacidad periódicamente. Te notificaremos cualquier cambio
                            publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
                            Te recomendamos revisar esta política periódicamente.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">11. Contacto</h2>
                        <p className="leading-relaxed mb-3">
                            Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos, contáctanos:
                        </p>
                        <div className="bg-purple-900/30 rounded-lg p-4 space-y-2">
                            <p><strong>BDJ Remixer</strong></p>
                            <p>WhatsApp: <a href="https://wa.me/51945227780" className="text-purple-400 hover:text-purple-300">+51 945 227 780</a></p>
                            <p>TikTok: <a href="https://www.tiktok.com/@bdjremixeroficial" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">@bdjremixeroficial</a></p>
                        </div>
                    </section>

                    {/* Consent */}
                    <section className="border-t border-purple-500/30 pt-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">12. Consentimiento</h2>
                        <p className="leading-relaxed">
                            Al utilizar BDJ Remixer, aceptas esta Política de Privacidad y consientes el procesamiento de tu
                            información según lo descrito aquí. Si no estás de acuerdo con esta política, por favor no utilices
                            nuestra aplicación.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-400">
                    <p>© 2025 BDJ Remixer - Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    );
}
