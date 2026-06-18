import { motion } from "motion/react";
import { Award, Compass, ArrowRight, Star, AlertTriangle, Cpu, TrendingUp } from "lucide-react";
import { Project } from "../types";

interface ProjectResultsProps {
  projects: Project[];
  isFallback: boolean;
  onSelectProject: (project: Project) => void;
  onSaveProject: (project: Project) => void;
  savedProjectIds: string[];
  onBackToInput: () => void;
  warning?: string;
}

export default function ProjectResults({
  projects,
  isFallback,
  onSelectProject,
  onSaveProject,
  savedProjectIds,
  onBackToInput,
  warning
}: ProjectResultsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-sans">
      {/* Fallback & API Status Banner */}
      {isFallback && (
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-semibold text-amber-200">Running in Local Mock Mode</h4>
            <p className="text-amber-400/80 mt-1">
              {warning || "The Gemini API key is missing. Using pre-modeled high-fidelity project plans."}
            </p>
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20">
            Mentoring Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight mt-2">
            Your Ranked Project Alignments
          </h2>
          <p className="text-[#8B949E] text-sm mt-1">
            Personalized concepts ranked by scientific depth, commercial merit, and open-source contribution fit.
          </p>
        </div>

        <button
          onClick={onBackToInput}
          id="btn-back-refine"
          className="px-4 py-2 bg-[#21262D] border border-[#30363D] hover:bg-[#30363D] text-slate-100 text-sm font-medium rounded-lg transition cursor-pointer"
        >
          ← Refine Configuration
        </button>
      </div>

      {/* List / Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column sidebar stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-[#8B949E]">
              Portfolio Health Index
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-[#8B949E] mb-1">
                  <span>Hiring Manager Appeal</span>
                  <span className="text-emerald-400 font-bold">96%</span>
                </div>
                <div className="w-full bg-[#30363D] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[96%]" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-[#8B949E] mb-1">
                  <span>Academic Value Gap</span>
                  <span className="text-sky-400 font-bold">88%</span>
                </div>
                <div className="w-full bg-[#30363D] h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#8B949E] mb-1">
                  <span>GSoC & CNCF Fit</span>
                  <span className="text-purple-400 font-bold">92%</span>
                </div>
                <div className="w-full bg-[#30363D] h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[92%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#161B22] to-transparent border border-[#30363D] rounded-xl p-5">
            <h4 className="text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-3 block">
              Market Acceleration Tips
            </h4>
            <div className="space-y-3.5">
              <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                  <TrendingUp className="w-3.5 h-3.5" /> High Demand Spot
                </div>
                <p className="text-xs text-[#8B949E] leading-relaxed">
                  RAG pipelines backed by custom metrics score top tier in recruiter tech vetting loops.
                </p>
              </div>
              
              <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold mb-1">
                  <Cpu className="w-3.5 h-3.5" /> Open Source Gap
                </div>
                <p className="text-xs text-[#8B949E] leading-relaxed">
                  Most student setups skip Docker compose. Provisioning a local Postgres and test harness ensures high-velocity ratings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: 5 Project Ideas list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8B949E] font-mono px-1">
            <span>SHOWING 5 TAILORED BLUEPRINTS</span>
            <span>SORTED BY RELEVANCE SCORE</span>
          </div>

          {projects.map((proj, index) => {
            const isSaved = savedProjectIds.includes(proj.id);
            return (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={proj.id}
                id={`project-card-${proj.id}`}
                className="bg-[#161B22] border border-[#30363D] hover:border-sky-500/50 rounded-xl p-5 transition group relative shadow-md"
              >
                {/* Ranking Tag */}
                <div className="absolute top-5 right-5 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-[#21262D] px-2 py-0.5 rounded border border-[#30363D]">
                    Rank #{index + 1}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveProject(proj);
                    }}
                    id={`btn-save-project-${proj.id}`}
                    type="button"
                    title={isSaved ? "Remove from Saved" : "Save project blueprint"}
                    className={`p-1.5 rounded-lg border transition ${
                      isSaved
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/40"
                        : "bg-[#21262D] border-[#30363D] text-[#8B949E] hover:text-[#C9D1D9]"
                    } cursor-pointer`}
                  >
                    <Star className="w-4 h-4 fill-current text-current" />
                  </button>
                </div>

                {/* Body Click triggers selection view */}
                <div
                  className="cursor-pointer"
                  onClick={() => onSelectProject(proj)}
                >
                  <div className="max-w-[80%]">
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition mb-2">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#8B949E] leading-relaxed mb-4 line-clamp-2">
                    {proj.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-t border-[#30363D] text-xs">
                    <div>
                      <span className="text-[#8B949E] block mb-0.5">Innovation</span>
                      <span className="font-semibold text-slate-200">{proj.innovationScore}/100</span>
                    </div>

                    <div>
                      <span className="text-[#8B949E] block mb-0.5">Difficulty</span>
                      <span className={`font-semibold ${
                        proj.difficulty === "Advanced" ? "text-rose-400" :
                        proj.difficulty === "Intermediate" ? "text-amber-400" : "text-emerald-400"
                      }`}>{proj.difficulty} ({proj.difficultyScore}/10)</span>
                    </div>

                    <div>
                      <span className="text-[#8B949E] block mb-0.5">GitHub Value</span>
                      <span className="font-semibold text-emerald-400">{proj.portfolioValue}/100</span>
                    </div>

                    <div>
                      <span className="text-[#8B949E] block mb-0.5">Academic Potential</span>
                      <span className="font-semibold text-sky-400">{proj.researchPotential}/100</span>
                    </div>
                  </div>

                  {/* Badges row & click to detail */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {proj.recommendedTechStack.slice(0, 3).map((tech, tIdx) => (
                        <span key={tIdx} className="bg-[#21262D] text-slate-300 text-[10px] px-2 py-0.5 rounded border border-[#30363D]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-sans text-sky-450 text-sky-400 hover:text-sky-350 flex items-center gap-1 font-semibold group-hover:translate-x-1 transition duration-200">
                      View Detailed Roadmap
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
