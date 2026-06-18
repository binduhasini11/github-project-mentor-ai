import { motion } from "motion/react";
import { Star, GraduationCap, ArrowRight, Trash2, HelpCircle } from "lucide-react";
import { Project } from "../types";

interface SavedProjectsProps {
  savedProjects: Project[];
  onSelectProject: (project: Project) => void;
  onRemoveProject: (project: Project) => void;
  onGoToGenerator: () => void;
}

export default function SavedProjects({
  savedProjects,
  onSelectProject,
  onRemoveProject,
  onGoToGenerator
}: SavedProjectsProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 font-sans">
      
      {/* Title */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
          Your Favorite Blueprints
        </h2>
        <p className="text-[#8B949E] text-sm mt-1">
          Review and explore your saved project concepts. Synchronized securely in your student portfolio account.
        </p>
      </div>

      {savedProjects.length === 0 ? (
        <div className="text-center py-16 bg-[#161B22] border border-[#30363D] rounded-2xl max-w-2xl mx-auto">
          <Star className="w-12 h-12 text-[#30363D] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white">No custom blueprints saved yet</h3>
          <p className="text-[#8B949E] text-sm mt-2 max-w-sm mx-auto mb-6">
            Configure your technical profile and save high-innovation concepts to curate your private repository.
          </p>
          <button
            onClick={onGoToGenerator}
            id="empty-save-goto-gen"
            className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-sm transition cursor-pointer"
          >
            Launch Project Discovery Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedProjects.map((proj, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={proj.id}
              className="bg-[#161B22] border border-[#30363D] hover:border-sky-500/30 rounded-xl p-5 shadow-sm relative flex flex-col justify-between group"
            >
              
              {/* Top Row Title & Actions */}
              <div>
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-sky-400 transition">
                    {proj.title}
                  </h3>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveProject(proj);
                    }}
                    id={`btn-remove-saved-${proj.id}`}
                    type="button"
                    title="Remove from favorites"
                    className="p-1.5 bg-[#21262D] border border-[#30363D] hover:bg-rose-500/10 text-[#8B949E] hover:text-rose-400 rounded-lg transition shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-[#8B949E] line-clamp-3 mb-4 leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              {/* Bottom Specs and Detail redirection */}
              <div className="pt-4 border-t border-[#30363D] mt-auto">
                <div className="flex justify-between items-center text-[11px] mb-3">
                  <div className="flex gap-3">
                    <span className="text-[#8B949E]">
                      Innov: <strong className="text-white">{proj.innovationScore}</strong>
                    </span>
                    <span className="text-[#8B949E]">
                      Diff: <strong className="text-amber-400">{proj.difficulty}</strong>
                    </span>
                  </div>

                  <span className="font-mono text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    GitHub: {proj.portfolioValue}/100
                  </span>
                </div>

                <button
                  onClick={() => onSelectProject(proj)}
                  id={`btn-view-saved-detail-${proj.id}`}
                  className="w-full py-2 bg-[#21262D] hover:bg-[#30363D] text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  Explore Complete Roadmap
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
