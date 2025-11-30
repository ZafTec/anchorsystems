import Image from "next/image";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureSection />

      {/* Why Choose Us Section - Simplified version for Home */}
      <div className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Why Choose Anchor Systems?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">Proven Expertise</h3>
              <p className="text-gray-400">
                2+ years building production AI systems that scale to thousands of users.
              </p>
            </div>
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">Technical Excellence</h3>
              <p className="text-gray-400">
                Full-stack capability from Python/FastAPI backends to React frontends.
              </p>
            </div>
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">Business Focus</h3>
              <p className="text-gray-400">
                We speak both technical and business language, focusing on ROI and real value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's build the future of your customer interactions together.
          </p>
          <a
            href="mailto:euaelmeko@gmail.com"
            className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </>
  );
}
