import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Condiciones del Servicio | BDJ Remixer',
    description: 'Condiciones del Servicio de BDJ Remixer - Música Exclusiva para DJs. Lee los términos y condiciones de uso de nuestra aplicación.',
    robots: 'index, follow',
};

export default function TermsOfService() {
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
                        Condiciones del Servicio
                    </h1>
                    <p className="text-gray-300">
                        Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-gray-100 space-y-8">

                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Aceptación de los Términos</h2>
                        <p className="leading-relaxed">
                            Bienvenido a <strong>BDJ Remixer</strong>. Al acceder y utilizar esta aplicación web, aceptas estar
                            sujeto a estos Términos y Condiciones del Servicio (&quot;Términos&quot;). Si no estás de acuerdo con alguna
                            parte de estos términos, no debes utilizar nuestra aplicación.
                        </p>
                        <p className="leading-relaxed mt-3">
                            Estos Términos constituyen un acuerdo legal vinculante entre tú (&quot;Usuario&quot; o &quot;tú&quot;) y BDJ Remixer
                            (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la Aplicación&quot;).
                        </p>
                    </section>

                    {/* Service Description */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Descripción del Servicio</h2>
                        <p className="leading-relaxed mb-3">
                            BDJ Remixer es una aplicación web progresiva (PWA) que proporciona acceso a música exclusiva para
                            DJs profesionales, incluyendo:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Remixes exclusivos y pistas originales</li>
                            <li>Beats y sets de música electrónica</li>
                            <li>Herramientas de búsqueda y navegación de archivos</li>
                            <li>Reproductor de audio integrado</li>
                            <li>Acceso a contenido almacenado en Google Drive</li>
                        </ul>
                        <p className="leading-relaxed mt-3">
                            Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio
                            en cualquier momento sin previo aviso.
                        </p>
                    </section>

                    {/* User Accounts */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Cuentas de Usuario y Acceso</h2>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">3.1 Autorización de Acceso</h3>
                        <p className="leading-relaxed">
                            Para acceder a ciertos contenidos, deberás autorizar el acceso a través de Google Drive. Eres
                            responsable de mantener la confidencialidad de tus credenciales y de todas las actividades que
                            ocurran bajo tu cuenta.
                        </p>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">3.2 Elegibilidad</h3>
                        <p className="leading-relaxed">
                            Debes tener al menos 13 años de edad para utilizar este servicio. Si eres menor de 18 años,
                            debes tener el permiso de tus padres o tutores legales.
                        </p>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">3.3 Uso Profesional</h3>
                        <p className="leading-relaxed">
                            Este servicio está destinado principalmente para DJs profesionales y entusiastas de la música.
                            El contenido proporcionado es para uso profesional en eventos, mezclas y producciones musicales.
                        </p>
                    </section>

                    {/* Acceptable Use */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Uso Aceptable</h2>
                        <p className="leading-relaxed mb-3">
                            Al utilizar BDJ Remixer, aceptas NO:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Redistribuir, revender o compartir públicamente el contenido sin autorización</li>
                            <li>Utilizar el servicio para actividades ilegales o no autorizadas</li>
                            <li>Intentar acceder a áreas restringidas del servicio o sistemas relacionados</li>
                            <li>Realizar ingeniería inversa, descompilar o desensamblar la aplicación</li>
                            <li>Utilizar bots, scrapers u otras herramientas automatizadas sin permiso</li>
                            <li>Cargar o transmitir virus, malware o código malicioso</li>
                            <li>Infringir derechos de propiedad intelectual de terceros</li>
                            <li>Hacerse pasar por otra persona o entidad</li>
                            <li>Interferir con el funcionamiento normal del servicio</li>
                        </ul>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Propiedad Intelectual</h2>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">5.1 Contenido de BDJ Remixer</h3>
                        <p className="leading-relaxed">
                            Todo el contenido disponible en BDJ Remixer, incluyendo pero no limitado a música, remixes,
                            gráficos, logos, iconos, texto, y software, es propiedad de BDJ Remixer o sus licenciantes y
                            está protegido por leyes de derechos de autor y propiedad intelectual.
                        </p>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">5.2 Licencia de Uso</h3>
                        <p className="leading-relaxed">
                            Te otorgamos una licencia limitada, no exclusiva, no transferible y revocable para acceder y
                            utilizar el contenido exclusivamente para fines profesionales de DJ. Esta licencia no incluye:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li>Derechos de redistribución o reventa</li>
                            <li>Derechos de modificación sin atribución</li>
                            <li>Uso comercial fuera del contexto de actuaciones de DJ</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">5.3 Marcas Registradas</h3>
                        <p className="leading-relaxed">
                            &quot;BDJ Remixer&quot; y todos los logos relacionados son marcas registradas o marcas comerciales de
                            BDJ Remixer. No puedes usar estas marcas sin nuestro consentimiento previo por escrito.
                        </p>
                    </section>

                    {/* Content and Copyright */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Derechos de Autor y DMCA</h2>
                        <p className="leading-relaxed">
                            Respetamos los derechos de propiedad intelectual de otros. Si crees que tu trabajo ha sido
                            copiado de manera que constituye una infracción de derechos de autor, contáctanos con la
                            siguiente información:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                            <li>Identificación del trabajo protegido por derechos de autor</li>
                            <li>Identificación del material infractor</li>
                            <li>Tu información de contacto</li>
                            <li>Una declaración de buena fe</li>
                            <li>Una declaración bajo pena de perjurio de que la información es exacta</li>
                        </ul>
                    </section>

                    {/* Payment and Subscriptions */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Pagos y Suscripciones</h2>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">7.1 Acceso de Pago</h3>
                        <p className="leading-relaxed">
                            Ciertos contenidos y funcionalidades pueden requerir pago. Los precios y métodos de pago se
                            comunicarán a través de WhatsApp u otros canales oficiales.
                        </p>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">7.2 Política de Reembolsos</h3>
                        <p className="leading-relaxed">
                            Los pagos por acceso a contenido digital generalmente no son reembolsables, excepto cuando lo
                            requiera la ley aplicable. Cada caso se evaluará individualmente.
                        </p>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">7.3 Cambios de Precio</h3>
                        <p className="leading-relaxed">
                            Nos reservamos el derecho de modificar los precios en cualquier momento. Los cambios de precio
                            no afectarán a suscripciones ya pagadas durante su período vigente.
                        </p>
                    </section>

                    {/* Third-Party Services */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Servicios de Terceros</h2>
                        <p className="leading-relaxed mb-3">
                            BDJ Remixer utiliza servicios de terceros, incluyendo:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Google Drive API:</strong> Para almacenamiento y acceso a archivos</li>
                            <li><strong>WhatsApp:</strong> Para comunicación y soporte</li>
                        </ul>
                        <p className="leading-relaxed mt-3">
                            El uso de estos servicios está sujeto a sus propios términos y condiciones. No somos responsables
                            por las acciones, contenido o políticas de estos servicios de terceros.
                        </p>
                    </section>

                    {/* Disclaimers */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Descargos de Responsabilidad</h2>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">9.1 &quot;Como Está&quot;</h3>
                        <p className="leading-relaxed">
                            El servicio se proporciona &quot;como está&quot; y &quot;según disponibilidad&quot; sin garantías de ningún tipo,
                            ya sean expresas o implícitas, incluyendo pero no limitado a garantías de comerciabilidad,
                            idoneidad para un propósito particular o no infracción.
                        </p>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">9.2 Disponibilidad</h3>
                        <p className="leading-relaxed">
                            No garantizamos que el servicio esté disponible de forma ininterrumpida, segura o libre de errores.
                            Podemos experimentar interrupciones técnicas o realizar mantenimiento que afecte la disponibilidad.
                        </p>

                        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-4">9.3 Contenido</h3>
                        <p className="leading-relaxed">
                            No garantizamos la exactitud, calidad o idoneidad del contenido para tus necesidades específicas.
                            El uso del contenido es bajo tu propio riesgo.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Limitación de Responsabilidad</h2>
                        <p className="leading-relaxed">
                            En la máxima medida permitida por la ley, BDJ Remixer, sus directores, empleados, socios o
                            afiliados no serán responsables por daños indirectos, incidentales, especiales, consecuentes
                            o punitivos, incluyendo pero no limitado a pérdida de beneficios, datos, uso, o pérdidas
                            intangibles, resultantes de:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                            <li>Tu acceso o uso (o incapacidad de acceso o uso) del servicio</li>
                            <li>Cualquier conducta o contenido de terceros en el servicio</li>
                            <li>Acceso no autorizado, uso o alteración de tus transmisiones o contenido</li>
                            <li>Cualquier otro asunto relacionado con el servicio</li>
                        </ul>
                    </section>

                    {/* Indemnification */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">11. Indemnización</h2>
                        <p className="leading-relaxed">
                            Aceptas defender, indemnizar y mantener indemne a BDJ Remixer y sus afiliados de cualquier
                            reclamo, daño, obligación, pérdida, responsabilidad, costo o deuda, y gasto (incluyendo
                            honorarios de abogados) que surja de:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                            <li>Tu uso y acceso al servicio</li>
                            <li>Tu violación de estos Términos</li>
                            <li>Tu violación de derechos de terceros, incluyendo derechos de propiedad intelectual</li>
                            <li>Cualquier contenido que envíes o compartas a través del servicio</li>
                        </ul>
                    </section>

                    {/* Termination */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">12. Terminación</h2>
                        <p className="leading-relaxed">
                            Podemos terminar o suspender tu acceso al servicio inmediatamente, sin previo aviso o
                            responsabilidad, por cualquier motivo, incluyendo sin limitación si incumples estos Términos.
                        </p>
                        <p className="leading-relaxed mt-3">
                            Tras la terminación, tu derecho a usar el servicio cesará inmediatamente. Todas las
                            disposiciones de estos Términos que por su naturaleza deban sobrevivir a la terminación
                            sobrevivirán, incluyendo disposiciones de propiedad, descargos de garantía, indemnización
                            y limitaciones de responsabilidad.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">13. Ley Aplicable</h2>
                        <p className="leading-relaxed">
                            Estos Términos se regirán e interpretarán de acuerdo con las leyes de Perú, sin dar efecto
                            a ningún principio de conflicto de leyes. Cualquier disputa relacionada con estos Términos
                            estará sujeta a la jurisdicción exclusiva de los tribunales de Perú.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">14. Modificaciones a los Términos</h2>
                        <p className="leading-relaxed">
                            Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento.
                            Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes
                            de que los nuevos términos entren en vigor.
                        </p>
                        <p className="leading-relaxed mt-3">
                            Tu uso continuado del servicio después de que dichas modificaciones entren en vigor constituye
                            tu aceptación de los nuevos Términos. Si no estás de acuerdo con los nuevos términos, debes
                            dejar de usar el servicio.
                        </p>
                    </section>

                    {/* Severability */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">15. Divisibilidad</h2>
                        <p className="leading-relaxed">
                            Si alguna disposición de estos Términos se considera inválida o inaplicable, dicha disposición
                            se eliminará o limitará en la medida mínima necesaria, y las disposiciones restantes de estos
                            Términos continuarán en pleno vigor y efecto.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">16. Contacto</h2>
                        <p className="leading-relaxed mb-3">
                            Si tienes preguntas sobre estos Términos y Condiciones, contáctanos:
                        </p>
                        <div className="bg-purple-900/30 rounded-lg p-4 space-y-2">
                            <p><strong>BDJ Remixer</strong></p>
                            <p>WhatsApp: <a href="https://wa.me/51945227780" className="text-purple-400 hover:text-purple-300">+51 945 227 780</a></p>
                            <p>TikTok: <a href="https://www.tiktok.com/@bdjremixeroficial" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">@bdjremixeroficial</a></p>
                        </div>
                    </section>

                    {/* Acceptance */}
                    <section className="border-t border-purple-500/30 pt-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">17. Aceptación Completa</h2>
                        <p className="leading-relaxed">
                            Estos Términos y Condiciones, junto con nuestra{' '}
                            <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                                Política de Privacidad
                            </Link>
                            , constituyen el acuerdo completo entre tú y BDJ Remixer con respecto al uso del servicio.
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
