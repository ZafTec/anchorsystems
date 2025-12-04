import Link from 'next/link';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-20 sm:py-32">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                        <span className="block">Intelligent AI Solutions</span>
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-teal-400">
                            for Modern Enterprises
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-gray-400">
                        We build custom LLM chatbots and enterprise-grade RAG systems that transform your data into actionable intelligence.
                    </p>
                    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                        <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                            <Link
                                href="/services/llm-chatbot"
                                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-teal-400 hover:bg-teal-500 md:py-4 md:text-lg md:px-10 transition-colors"
                            >
                                Explore Chatbots
                            </Link>
                            <Link
                                href="/services/rag-systems"
                                className="flex items-center justify-center px-8 py-3 border border-teal-400 text-base font-medium rounded-md text-teal-600 dark:text-teal-400 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 md:py-4 md:text-lg md:px-10 transition-colors"
                            >
                                Discover RAG
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
