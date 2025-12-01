import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | Anchor Systems',
    description: 'Privacy Policy for Anchor Systems - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-950 text-gray-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="text-teal-400 hover:text-teal-300 transition-colors mb-4 inline-block"
                    >
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4 mb-4">Privacy Policy</h1>
                    <p className="text-gray-400">
                        <strong>Last Updated:</strong> December 1, 2025
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none">

                    {/* Introduction */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Anchor Systems (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                            you visit our website <a href="https://anchorsystems.ai" className="text-teal-400 hover:text-teal-300">anchorsystems.ai</a>
                            {' '}and use our services.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            By using our website and services, you agree to the collection and use of information in
                            accordance with this policy. If you do not agree with the terms of this Privacy Policy,
                            please do not access our website or use our services.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-semibold text-white mb-3">2.1 Information You Provide to Us</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We collect information that you voluntarily provide when you:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                            <li><strong>Contact Form Submissions:</strong> Name, email address, company name, phone number, message content, and service interest</li>
                            <li><strong>Project Communications:</strong> Any additional information shared during consultations, project discovery, or implementation</li>
                            <li><strong>Service Usage:</strong> Information related to custom AI solutions we develop for you</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">2.2 Information Collected Automatically</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            When you visit our website, we may automatically collect certain information about your device and usage:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                            <li><strong>Log Data:</strong> IP address, browser type, operating system, pages visited, time spent on pages, and referring website</li>
                            <li><strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience (see Section 6)</li>
                            <li><strong>Analytics Data:</strong> Aggregated usage statistics to improve our website and services</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">2.3 Client Project Data</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            When we develop AI solutions for clients, we may process:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            <li><strong>Training Data:</strong> Documents, FAQs, support tickets, or other content you provide for chatbot or RAG system training</li>
                            <li><strong>Integration Data:</strong> Information necessary to integrate with your existing systems (CRM, databases, APIs)</li>
                            <li><strong>Technical Data:</strong> System logs, performance metrics, and error reports from deployed solutions</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed bg-slate-900 border border-slate-800 rounded-lg p-4">
                            <strong className="text-teal-400">Important:</strong> Client project data remains your property.
                            We process this data solely to deliver contracted services and never use it to train public AI models or share it with third parties.
                        </p>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We use the information we collect for the following purposes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            <li><strong>Service Delivery:</strong> To respond to inquiries, provide consultations, and deliver contracted AI solutions</li>
                            <li><strong>Communication:</strong> To send you project updates, technical support, and important service announcements</li>
                            <li><strong>Improvement:</strong> To analyze website usage and improve our services, user experience, and technical offerings</li>
                            <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, or security threats</li>
                            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                            <li><strong>Marketing:</strong> To send promotional materials about our services (you can opt-out anytime)</li>
                        </ul>
                    </section>

                    {/* How We Share Your Information */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">4. How We Share Your Information</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">4.1 Service Providers</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We may share information with trusted third-party service providers who assist us in operating our business:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                            <li><strong>Cloud Hosting:</strong> Google Cloud Platform (GCP), AWS, or Azure for website and database hosting</li>
                            <li><strong>Email Services:</strong> Email providers for sending communications</li>
                            <li><strong>Analytics:</strong> Web analytics tools to understand website usage patterns</li>
                            <li><strong>Payment Processing:</strong> Payment processors for invoicing and transactions (when applicable)</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            All service providers are contractually obligated to protect your data and use it only for the purposes we specify.
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">4.2 LLM Providers (For Client Projects)</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            When building AI solutions, we may use Large Language Model (LLM) providers such as:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            <li>OpenAI (GPT-4, GPT-4o, GPT-4o-mini)</li>
                            <li>Anthropic (Claude)</li>
                            <li>Google (Gemini)</li>
                            <li>Open-source models (hosted on your infrastructure)</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6">
                            <strong className="text-teal-400">Data Protection Guarantee:</strong> We configure all LLM integrations
                            to prevent your data from being used for model training. Most providers offer enterprise agreements with
                            zero data retention policies. For maximum privacy, we can deploy open-source models entirely within your infrastructure.
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">4.3 Legal Requirements</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            We may disclose your information if required by law or in response to valid legal requests
                            (e.g., court orders, subpoenas, government investigations).
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">4.4 Business Transfers</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            In the event of a merger, acquisition, or sale of assets, your information may be transferred
                            to the acquiring entity. We will notify you before your information is transferred and becomes
                            subject to a different privacy policy.
                        </p>
                    </section>

                    {/* Data Security */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We implement industry-standard security measures to protect your information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            <li><strong>Encryption:</strong> Data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                            <li><strong>Access Controls:</strong> Strict role-based access controls limit who can view or process your data</li>
                            <li><strong>Secure Infrastructure:</strong> We use enterprise-grade cloud platforms with SOC 2 compliance</li>
                            <li><strong>Regular Audits:</strong> We conduct security reviews and vulnerability assessments</li>
                            <li><strong>Data Minimization:</strong> We collect only the data necessary for service delivery</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed bg-slate-900 border border-slate-800 rounded-lg p-4">
                            <strong className="text-yellow-400">Note:</strong> While we use commercially reasonable security measures,
                            no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee
                            absolute security.
                        </p>
                    </section>

                    {/* Cookies and Tracking */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We use cookies and similar tracking technologies to improve your experience on our website:
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">6.1 Types of Cookies We Use</h3>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                            <li><strong>Essential Cookies:</strong> Required for website functionality (e.g., form submissions, session management)</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (e.g., pages visited, time spent)</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences for future visits</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">6.2 Managing Cookies</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            You can control cookies through your browser settings. Note that disabling cookies may affect
                            website functionality. Most browsers allow you to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            <li>View and delete existing cookies</li>
                            <li>Block third-party cookies</li>
                            <li>Block all cookies (may limit site functionality)</li>
                            <li>Clear cookies when closing your browser</li>
                        </ul>
                    </section>

                    {/* Data Retention */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            We retain your information only as long as necessary for the purposes outlined in this policy:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            <li><strong>Contact Form Data:</strong> Retained for up to 2 years for business development and customer service purposes</li>
                            <li><strong>Client Project Data:</strong> Retained for the duration of the project plus 1 year for support purposes, unless otherwise agreed</li>
                            <li><strong>Website Analytics:</strong> Aggregated data retained indefinitely; identifiable data deleted after 26 months</li>
                            <li><strong>Legal Obligations:</strong> Some data may be retained longer to comply with legal or regulatory requirements</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed">
                            You may request deletion of your data at any time (see Section 9).
                        </p>
                    </section>

                    {/* International Data Transfers */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Anchor Systems operates from Ethiopia and serves clients globally. Your information may be
                            transferred to and processed in countries other than your own. We ensure that:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            <li>Data transfers comply with applicable data protection laws (GDPR, CCPA, etc.)</li>
                            <li>Appropriate safeguards are in place (e.g., Standard Contractual Clauses)</li>
                            <li>Cloud infrastructure is deployed in your preferred region when required</li>
                            <li>Enterprise clients can request on-premises or private cloud deployments</li>
                        </ul>
                    </section>

                    {/* Your Privacy Rights */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">9. Your Privacy Rights</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Depending on your location, you may have the following rights regarding your personal information:
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">9.1 General Rights</h3>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                            <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                            <li><strong>Object:</strong> Object to certain types of data processing</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">9.2 GDPR Rights (EU/EEA Residents)</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            If you are in the European Union or European Economic Area, you have additional rights under GDPR:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                            <li>Right to restrict processing</li>
                            <li>Right to withdraw consent at any time</li>
                            <li>Right to lodge a complaint with your local data protection authority</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">9.3 CCPA Rights (California Residents)</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                            <li>Right to know what personal information is collected, used, and shared</li>
                            <li>Right to delete personal information</li>
                            <li>Right to opt-out of the sale of personal information (we do not sell your data)</li>
                            <li>Right to non-discrimination for exercising your privacy rights</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">9.4 How to Exercise Your Rights</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            To exercise any of these rights, please contact us at{' '}
                            <a href="mailto:contact@anchorsystems.ai" className="text-teal-400 hover:text-teal-300">
                                contact@anchorsystems.ai
                            </a>
                            . We will respond to your request within 30 days.
                        </p>
                    </section>

                    {/* Third-Party Links */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Links</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Our website may contain links to third-party websites (e.g., LinkedIn, GitHub, social media).
                            We are not responsible for the privacy practices of these external sites. We encourage you to
                            review their privacy policies before providing any personal information.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">11. Children&apos;s Privacy</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Our services are not directed to individuals under the age of 18. We do not knowingly collect
                            personal information from children. If we become aware that we have collected information from
                            a child without parental consent, we will take steps to delete that information promptly.
                        </p>
                    </section>

                    {/* Changes to This Policy */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            We may update this Privacy Policy from time to time to reflect changes in our practices,
                            technology, legal requirements, or other factors. We will notify you of any material changes by:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            <li>Posting the updated policy on this page with a new &quot;Last Updated&quot; date</li>
                            <li>Sending an email notification to registered users (for significant changes)</li>
                            <li>Displaying a prominent notice on our website</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed">
                            Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                            please contact us:
                        </p>
                        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                            <p className="text-gray-300 mb-2">
                                <strong className="text-white">Anchor Systems</strong>
                            </p>
                            <p className="text-gray-300 mb-2">
                                <strong>Email:</strong>{' '}
                                <a href="mailto:contact@anchorsystems.ai" className="text-teal-400 hover:text-teal-300">
                                    contact@anchorsystems.ai
                                </a>
                            </p>
                            <p className="text-gray-300 mb-2">
                                <strong>Website:</strong>{' '}
                                <a href="https://anchorsystems.ai" className="text-teal-400 hover:text-teal-300">
                                    anchorsystems.ai
                                </a>
                            </p>
                            <p className="text-gray-300">
                                <strong>Location:</strong> Addis Ababa, Ethiopia
                            </p>
                        </div>
                    </section>

                    {/* Consent */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">14. Consent</h2>
                        <p className="text-gray-300 leading-relaxed">
                            By using our website and services, you consent to this Privacy Policy and agree to its terms.
                            If you do not agree with this policy, please discontinue use of our services immediately.
                        </p>
                    </section>

                    {/* Summary Box */}
                    <div className="bg-teal-900/20 border-2 border-teal-500/50 rounded-xl p-6 mt-12">
                        <h3 className="text-xl font-bold text-white mb-3">Privacy at a Glance</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>✓ We never sell your personal data</li>
                            <li>✓ Your project data remains your property</li>
                            <li>✓ Enterprise-grade security (encryption, access controls)</li>
                            <li>✓ GDPR and CCPA compliant data practices</li>
                            <li>✓ You can request data deletion at any time</li>
                            <li>✓ LLM providers configured for zero data retention</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
