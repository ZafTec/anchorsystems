import PricingTable from '@/components/PricingTable';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export const metadata = {
    title: 'LLM Chatbot Development | Anchor Systems',
    description: 'Custom AI assistants trained on your unique business context. Handle complex customer interactions with ease.',
};

const pricingTiers = [
    {
        name: 'Starter Chatbot',
        price: '$2,000 - $4,000',
        description: 'Perfect for early-stage startups validating AI ROI.',
        cta: 'Get Started',
        features: [
            'FAQ-based chatbot (up to 50 Q&A)',
            'Single integration (Web/Slack)',
            'Basic prompt engineering',
            'Training on up to 100 pages',
            'Admin dashboard',
            '2 weeks post-launch support',
        ],
    },
    {
        name: 'Professional Chatbot',
        price: '$5,000 - $12,000',
        description: 'For growth-stage companies scaling support.',
        cta: 'Scale Up',
        highlighted: true,
        features: [
            'Custom training on docs & tickets',
            'Multi-channel (3+ platforms)',
            'RAG system for real-time updates',
            'CRM/Helpdesk integration',
            'Sentiment analysis',
            '60 days premium support',
        ],
    },
    {
        name: 'Enterprise AI Agent',
        price: '$15,000+',
        description: 'Fully custom AI agent with workflow automation.',
        cta: 'Contact Sales',
        features: [
            'Fine-tuned LLM on proprietary data',
            'Fraud detection & risk scoring',
            'HIPAA-compliant architecture',
            'Voice integration option',
            'SLA guarantees',
            'Quarterly strategy reviews',
        ],
    },
];

const faqs = [
    {
        question: 'How is this different from generic chatbots?',
        answer: 'Generic bots often fail at context. We build custom AI agents trained specifically on your data (docs, tickets, FAQs), ensuring they understand your business nuances and brand voice.',
    },
    {
        question: 'What happens if the bot doesn\'t know the answer?',
        answer: 'We implement "graceful fallbacks." If confidence is low, the bot will politely admit it doesn\'t know and escalate the conversation to a human agent with full context.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Absolutely. We use enterprise-grade encryption and can deploy on your private cloud. We also ensure compliance with GDPR, HIPAA, and other regulations as needed.',
    },
    {
        question: 'How long does it take to build?',
        answer: 'A Starter Chatbot can be live in 3-4 weeks. More complex Enterprise agents typically take 8-12 weeks depending on integrations and requirements.',
    },
];

export default function LLMChatbotPage() {
    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-orange-50/30 dark:from-indigo-950/30 dark:to-orange-950/20" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                        Custom LLM Chatbots
                        <span className="block text-indigo-600 dark:text-indigo-400 mt-2">That Actually Understand You</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
                        Automate 60-80% of support tickets with AI agents trained on your unique business context.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                        >
                            Start Your Project
                        </Link>
                    </div>
                </div>
            </div>

            {/* Problem/Solution */}
            <div className="py-16 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Stop Losing Customers to Slow Support</h2>
                            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                                <li className="flex items-start">
                                    <span className="text-red-500 dark:text-red-400 mr-2">✗</span>
                                    40% of tickets are repetitive FAQs
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 dark:text-red-400 mr-2">✗</span>
                                    Generic bots frustrate users
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 dark:text-red-400 mr-2">✗</span>
                                    Slow response times lead to churn
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">The Anchor Systems Advantage</h2>
                            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                                <li className="flex items-start">
                                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                                    Trained on YOUR docs, tickets, and brand voice
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                                    Handles complex workflows
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                                    Seamless human handoff when needed
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">What We Build</h2>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">Not just a chatbot. A complete conversational AI system.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Context Awareness', desc: 'Remembers user details and conversation history for personalized interactions.' },
                            { title: 'Multi-Channel', desc: 'Deploy on Web, WhatsApp, Slack, Messenger, and more.' },
                            { title: 'Smart Routing', desc: 'Automatically routes complex issues to the right human agent.' },
                            { title: 'Analytics Dashboard', desc: 'Track resolution rates, sentiment, and common topics.' },
                            { title: 'Secure Integration', desc: 'Connects safely with your CRM, Helpdesk, and Database.' },
                            { title: 'Continuous Learning', desc: 'Improves over time based on user feedback and new data.' },
                        ].map((feature) => (
                            <div key={feature.title} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <PricingTable tiers={pricingTiers} />
            <FAQ items={faqs} />

            <ContactForm serviceInterest="LLM Chatbot" />
        </div>
    );
}
