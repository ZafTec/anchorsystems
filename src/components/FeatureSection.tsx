import Link from 'next/link';

const features = [
    {
        name: 'LLM-Powered Chatbots',
        description: 'Custom AI assistants trained on your unique business context. Handle complex customer interactions, from FAQs to fraud detection.',
        href: '/services/llm-chatbot',
        icon: (
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
    },
    {
        name: 'Enterprise RAG Systems',
        description: 'Intelligent search and knowledge retrieval pipelines. Ground AI responses in your proprietary data to eliminate hallucinations.',
        href: '/services/rag-systems',
        icon: (
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
    },
];

const FeatureSection = () => {
    return (
        <div className="py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-teal-600 dark:text-teal-400 font-semibold tracking-wide uppercase">Our Expertise</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Transforming Business with AI
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-600 dark:text-gray-400 mx-auto">
                        We deliver cutting-edge AI solutions tailored to your specific needs, ensuring scalability, security, and performance.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-r from-blue-300 to-teal-600 rounded-lg blur opacity-0 dark:opacity-25 group-hover:opacity-50 dark:group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative p-8 bg-slate-50 dark:bg-slate-950 ring-1 ring-slate-200 dark:ring-slate-800 rounded-lg leading-none flex items-top justify-start space-x-6 group-hover:ring-slate-300 dark:group-hover:ring-slate-700 transition-all">
                                    <div className="shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-linear-to-r from-blue-500 to-teal-500 text-white">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">{feature.name}</h3>
                                        <p className="text-slate-600 dark:text-gray-400 mb-4">{feature.description}</p>
                                        <Link href={feature.href} className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium inline-flex items-center transition-colors">
                                            Learn more
                                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
