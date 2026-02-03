import PricingTable from '@/components/PricingTable';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export const metadata = {
    title: 'Enterprise RAG Systems | Anchor Systems',
    description: 'Intelligent search and knowledge retrieval pipelines. Eliminate AI hallucinations with custom RAG solutions.',
};

const pricingTiers = [
    {
        name: 'Proof of Concept',
        price: '$3,000 - $5,000',
        description: 'Validate ROI with a pilot project.',
        cta: 'Start Pilot',
        features: [
            '1 Data Source (<1k docs)',
            'Basic Web Chat Interface',
            'Performance Benchmarks',
            'Documentation & Source Code',
            '2-3 Weeks Delivery',
        ],
    },
    {
        name: 'Production MVP',
        price: '$8,000 - $15,000',
        description: 'For department-level deployments.',
        cta: 'Build MVP',
        highlighted: true,
        features: [
            'Multi-source (3-5 sources)',
            'Advanced Hybrid Search',
            'Custom UI with Citations',
            'User Analytics Dashboard',
            'Cloud Deployment',
            '30 Days Support',
        ],
    },
    {
        name: 'Enterprise Solution',
        price: '$20,000+',
        description: 'Organization-wide knowledge management.',
        cta: 'Contact Sales',
        features: [
            'Multi-tenant Architecture',
            'SSO & Role-based Access',
            'Custom LLM Integration',
            'Load Testing (10k+ users)',
            'SLA Guarantees',
            '90 Days Premium Support',
        ],
    },
];

const faqs = [
    {
        question: 'What is RAG and why do I need it?',
        answer: 'Retrieval-Augmented Generation (RAG) combines LLMs with your private data. It allows AI to answer questions based on your internal documents (PDFs, Wikis, Databases) accurately and without hallucinating.',
    },
    {
        question: 'How do you prevent hallucinations?',
        answer: 'We engineer the system to strictly ground answers in retrieved context. If the answer isn\'t in your documents, the AI is trained to say "I don\'t know" rather than making things up. We also provide citations for every claim.',
    },
    {
        question: 'Can you integrate with our existing tools?',
        answer: 'Yes. We build data pipelines to ingest from SharePoint, Google Drive, Salesforce, Slack, SQL databases, and more. The system stays in sync with your data sources.',
    },
    {
        question: 'What about data privacy?',
        answer: 'Your data never trains public models. We can deploy the entire stack (Vector DB, LLM, API) within your private cloud (AWS/GCP/Azure) or on-premise for maximum security.',
    },
];

export default function RagSystemsPage() {
    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-orange-50/30 dark:from-indigo-950/30 dark:to-orange-950/20" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                        Eliminate Hallucinations with
                        <span className="block text-indigo-600 dark:text-indigo-400 mt-2">Enterprise RAG Systems</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
                        Ground your AI in truth. We build intelligent search pipelines that deliver accurate, cited answers from your proprietary data.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                        >
                            Discuss Your Use Case
                        </Link>
                    </div>
                </div>
            </div>

            {/* Architecture Diagram/Explanation */}
            <div className="py-16 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How It Works</h2>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">From raw data to accurate answers.</p>
                    </div>
                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                            <div className="p-6 bg-white dark:bg-slate-950 rounded-xl">
                                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-2">1. Ingest</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Connect to PDFs, Databases, APIs</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center text-slate-400 dark:text-slate-600">→</div>
                            <div className="p-6 bg-white dark:bg-slate-950 rounded-xl">
                                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-2">2. Index</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Vectorize and store in Vector DB</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center text-slate-400 dark:text-slate-600">→</div>
                            <div className="p-6 bg-white dark:bg-slate-950 rounded-xl">
                                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-2">3. Retrieve</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Semantic search for relevant context</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center text-slate-400 dark:text-slate-600">→</div>
                            <div className="p-6 bg-white dark:bg-slate-950 rounded-xl">
                                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-2">4. Generate</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">LLM answers with citations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Industry Applications</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Legal & Compliance</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Instantly search thousands of contracts and case files.
                            </p>
                            <ul className="text-sm text-slate-500 dark:text-slate-500 space-y-2">
                                <li>• Clause comparison</li>
                                <li>• Precedent search</li>
                                <li>• Regulatory Q&A</li>
                            </ul>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Healthcare</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Clinical decision support grounded in medical protocols.
                            </p>
                            <ul className="text-sm text-slate-500 dark:text-slate-500 space-y-2">
                                <li>• Protocol retrieval</li>
                                <li>• Drug interaction checks</li>
                                <li>• Patient history summary</li>
                            </ul>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Internal Knowledge</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Stop answering the same questions on Slack.
                            </p>
                            <ul className="text-sm text-slate-500 dark:text-slate-500 space-y-2">
                                <li>• HR Policy Q&A</li>
                                <li>• Technical Onboarding</li>
                                <li>• Project Documentation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <PricingTable tiers={pricingTiers} />
            <FAQ items={faqs} />

            <ContactForm serviceInterest="RAG Systems" />
        </div>
    );
}
