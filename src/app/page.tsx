import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Dynamically import below-the-fold components for better performance
const FeatureSection = dynamic(() => import("@/components/FeatureSection"), {
  loading: () => <div className="h-96 bg-slate-950" />,
});

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => <div className="h-96 bg-slate-900" />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureSection />

      {/* Why Choose Us Section - Simplified version for Home */}
      <div className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Why Choose Anchor Systems?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Proven Expertise</h3>
              <p className="text-slate-600 dark:text-gray-400">
                2+ years building production AI systems that scale to thousands of users.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Technical Excellence</h3>
              <p className="text-slate-600 dark:text-gray-400">
                Full-stack capability from Python/FastAPI backends to React frontends.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Business Focus</h3>
              <p className="text-slate-600 dark:text-gray-400">
                We speak both technical and business language, focusing on ROI and real value.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContactForm />
    </>
  );
}
