import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-gray-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                            Anchor Systems
                        </Link>
                        <p className="mb-4 max-w-sm">
                            Building the next generation of AI-powered solutions. We specialize in custom LLM chatbots and enterprise-grade RAG systems.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social icons would go here */}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/services/llm-chatbot" className="hover:text-blue-400 transition-colors">
                                    LLM Chatbots
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/rag-systems" className="hover:text-blue-400 transition-colors">
                                    RAG Systems
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#about" className="hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="hover:text-blue-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-900 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} Anchor Systems. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
