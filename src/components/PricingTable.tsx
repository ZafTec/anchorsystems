import Link from 'next/link';

interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    highlighted?: boolean;
}

interface PricingTableProps {
    tiers: PricingTier[];
}

const PricingTable = ({ tiers }: PricingTableProps) => {
    return (
        <div className="py-24 bg-slate-100 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="mt-4 text-xl text-slate-600 dark:text-gray-400">
                        Choose the plan that fits your business needs.
                    </p>
                </div>
                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
                    {tiers.map((tier) => (
                        <div key={tier.name} className={`rounded-lg shadow-lg divide-y divide-slate-200 dark:divide-slate-800 ${tier.highlighted ? 'border-2 border-teal-500 relative' : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
                            {tier.highlighted && (
                                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-32 h-32 overflow-hidden">
                                    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-32 h-32 overflow-hidden">
                                        <span className="absolute top-0 right-0 bg-teal-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-bl-lg">Popular</span>
                                    </div>
                                </div>
                            )}
                            <div className="p-6">
                                <h2 className="text-2xl leading-6 font-semibold text-slate-900 dark:text-white">{tier.name}</h2>
                                <p className="mt-4 text-sm text-slate-600 dark:text-gray-400">{tier.description}</p>
                                <p className="mt-8">
                                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{tier.price}</span>
                                </p>
                                <Link
                                    href="#contact"
                                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${tier.highlighted ? 'bg-teal-500 text-slate-900 hover:bg-teal-600' : 'bg-slate-200 dark:bg-slate-800 text-teal-600 dark:text-teal-400 hover:bg-slate-300 dark:hover:bg-slate-700'} transition-colors`}
                                >
                                    {tier.cta}
                                </Link>
                            </div>
                            <div className="pt-6 pb-8 px-6">
                                <h3 className="text-xs font-medium text-slate-900 dark:text-white tracking-wide uppercase">What&apos;s included</h3>
                                <ul className="mt-6 space-y-4">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex space-x-3">
                                            <svg className="flex-shrink-0 h-5 w-5 text-teal-600 dark:text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-slate-600 dark:text-gray-400">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingTable;
