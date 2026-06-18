import { motion } from "motion/react";
import { Compass, GitMerge, GraduationCap, Award, ArrowUpRight } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
  onGoToDevCenter: () => void;
}

export default function LandingPage({ onStart, onGoToDevCenter }: LandingPageProps) {
  return (
    <div className="relative text-gray-100 min-h-screen bg-slate-950 flex flex-col justify-between overflow-hidden">
      {/* Background Decorative Gradients - Minimal and Soft */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Hero Section */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-4xl text-center z-10">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-400/20 rounded-full text-xs font-mono text-sky-400 tracking-wide mb-6"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            Empowering the Next Generation of Tech Pioneers
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-sans font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none mb-6"
          >
            GitHub Project Mentor AI
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-xl text-slate-400 font-sans max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Stop building trivial task managers. Discover high-innovation, open-source friendly, 
            and publication-worthy project blueprints custom-designed for your skills, career goals, and available time limit.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <button
              onClick={onStart}
              id="cta-start"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-sans font-semibold rounded-lg shadow-lg hover:shadow-sky-500/20 transition duration-300 transform active:scale-[0.98] cursor-pointer"
            >
              Generate Your Project Blueprints
            </button>
            <button
              onClick={onGoToDevCenter}
              id="cta-docs"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 font-sans font-medium rounded-lg hover:text-white transition duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              View System Architecture
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </button>
          </motion.div>

          {/* Core Value Proposition Cards - 3 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left max-w-5xl mx-auto"
          >
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-900 p-6 rounded-xl hover:border-slate-800 transition">
              <div className="p-3 bg-sky-500/10 rounded-lg w-max mb-4">
                <GitMerge className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-slate-200 mb-2">GitHub Portfolio Value</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Receive production-ready directory architectures, database schema proposals, and modern code patterns designed to impress senior engineering managers.
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-900 p-6 rounded-xl hover:border-slate-800 transition">
              <div className="p-3 bg-emerald-500/10 rounded-lg w-max mb-4">
                <GraduationCap className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-slate-200 mb-2">Academic & GSoC Merits</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Discover unstudied academic gaps and publication journals, together with integration roadmaps with Google Summer of Code organizations.
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-900 p-6 rounded-xl hover:border-slate-800 transition">
              <div className="p-3 bg-amber-500/10 rounded-lg w-max mb-4">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-slate-200 mb-2">Real-Time Data suggestions</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Leverage targeted open data suggestions linked with curated academic paper recommendations to bootstrap secure system drafts quickly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Humble, Professional Footer */}
      <div className="w-full py-6 border-t border-slate-900 px-6 flex flex-col md:flex-row justify-between items-center bg-slate-950 text-xs font-mono text-slate-500">
        <div>© 2026 GitHub Project Mentor AI. Serving world-class, server-side Gemini intelligence.</div>
        <div className="mt-2 md:mt-0 flex gap-4">
          <span className="hover:text-slate-400 cursor-pointer" onClick={onGoToDevCenter}>Developer Docs</span>
          <span>•</span>
          <span>FastAPI + Postgres Blueprints</span>
        </div>
      </div>
    </div>
  );
}
