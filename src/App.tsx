import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Star, Layers, Menu, X, BrainCircuit, RefreshCw, 
  HelpCircle, ChevronRight, UserCheck, CheckCircle, LogOut
} from "lucide-react";
import { Project, UserProfile, AuthUser } from "./types";

// Import custom sub-components
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ProjectResults from "./components/ProjectResults";
import DetailedProjectView from "./components/DetailedProjectView";
import SavedProjects from "./components/SavedProjects";
import DevCenter from "./components/DevCenter";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"landing" | "generator" | "saved" | "dev_center">("landing");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  
  // Google OAuth Student Profile states
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync projects with server-side database helper
  const syncSavedProjectsFromServer = async (email: string) => {
    try {
      const res = await fetch(`/api/saved-projects?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.projects) {
          setSavedProjects(data.projects);
          localStorage.setItem("github_mentor_blueprints", JSON.stringify(data.projects));
        }
      }
    } catch (err) {
      console.warn("Server side project synchronization failed:", err);
    }
  };

  // Load Saved Projects and AuthUser from localStorage on startup
  useEffect(() => {
    const cachedAuth = localStorage.getItem("github_mentor_authUser");
    if (cachedAuth) {
      try {
        const parsed = JSON.parse(cachedAuth);
        if (parsed?.loggedIn) {
          setAuthUser(parsed);
          syncSavedProjectsFromServer(parsed.email);
        }
      } catch (err) {
        console.warn("Could not parse cached user account details:", err);
      }
    }

    const cached = localStorage.getItem("github_mentor_blueprints");
    if (cached && !cachedAuth) {
      try {
        setSavedProjects(JSON.parse(cached));
      } catch (err) {
        console.warn("Could not load cached favorites:", err);
      }
    }
  }, []);

  // Set up message event listener for popup based OAuth successful redirects
  useEffect(() => {
    const handleAuthMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith(".run.app") && !origin.includes("localhost")) {
        return;
      }

      if (event.data?.type === "OAUTH_AUTH_SUCCESS" && event.data?.user) {
        const loggedUser: AuthUser = {
          email: event.data.user.email,
          name: event.data.user.name,
          picture: event.data.user.picture,
          loggedIn: true
        };
        setAuthUser(loggedUser);
        localStorage.setItem("github_mentor_authUser", JSON.stringify(loggedUser));
        syncSavedProjectsFromServer(loggedUser.email);
      }
    };

    window.addEventListener("message", handleAuthMessage);
    return () => window.removeEventListener("message", handleAuthMessage);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("/api/auth/url");
      if (!response.ok) {
        throw new Error("Unable to obtain authorization endpoint.");
      }
      const { url } = await response.json();
      
      const width = 500;
      const height = 650;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const authWindow = window.open(
        url,
        "google_oauth_popup",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      if (!authWindow) {
        alert("Pop-up window was blocked. Please authorize pop-ups for this site to sign in securely.");
      }
    } catch (err) {
      console.error("Popup launch failed:", err);
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    setSavedProjects([]);
    localStorage.removeItem("github_mentor_authUser");
    localStorage.removeItem("github_mentor_blueprints");
    if (currentTab === "saved") {
      setCurrentTab("generator");
    }
    setSelectedProject(null);
  };

  const handleSaveToggle = async (proj: Project) => {
    const isSaved = savedProjects.some(p => p.id === proj.id);
    let updated: Project[];
    if (isSaved) {
      updated = savedProjects.filter(p => p.id !== proj.id);
    } else {
      updated = [...savedProjects, proj];
    }
    
    // Set immediate client side state
    setSavedProjects(updated);
    localStorage.setItem("github_mentor_blueprints", JSON.stringify(updated));

    if (authUser?.loggedIn) {
      try {
        await fetch("/api/saved-projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: authUser.email,
            project: proj,
            action: isSaved ? "remove" : "save"
          })
        });
      } catch (err) {
        console.warn("Failed to synchronize save action to server database:", err);
      }
    }
  };

  const handleRemoveSaved = async (proj: Project) => {
    const updated = savedProjects.filter(p => p.id !== proj.id);
    
    // Set immediate client side state
    setSavedProjects(updated);
    localStorage.setItem("github_mentor_blueprints", JSON.stringify(updated));

    if (authUser?.loggedIn) {
      try {
        await fetch("/api/saved-projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: authUser.email,
            project: proj,
            action: "remove"
          })
        });
      } catch (err) {
        console.warn("Failed to synchronize remove action to server database:", err);
      }
    }
  };

  // Profile parameter submitting
  const handleProfileSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    setWarningMessage("");
    setIsFallback(false);
    setUserProfile(profile);

    try {
      const res = await fetch("/api/generate-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      if (!res.ok) {
        throw new Error(`Server returned error status ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.projects) {
        setProjectsList(data.projects);
        setIsFallback(!!data.isFallback);
        if (data.warning) {
          setWarningMessage(data.warning);
        }
      } else {
        throw new Error(data.error || "Blueprint generation failed.");
      }
    } catch (err: any) {
      console.warn("Fetch failed, calling local simulation backup...", err.message);
      // Trigger a clean API state alert
      setIsFallback(true);
      setWarningMessage(err.message || "Establishing clean backup container session.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset core profile and start fresh
  const handleResetProfile = () => {
    setUserProfile(null);
    setProjectsList([]);
    setSelectedProject(null);
    setCurrentTab("generator");
  };

  const handleSelectProjectDirect = (proj: Project) => {
    setSelectedProject(proj);
  };

  // Redirect to discovery from empty favorites state
  const handleGoToDiscovery = () => {
    setSelectedProject(null);
    setCurrentTab("generator");
  };

  return (
    <div className="w-full min-h-screen bg-[#0D1117] text-[#C9D1D9] font-sans flex flex-col md:flex-row overflow-x-hidden">
      
      {/* LANDING PAGE - Fullscreen Mode without Sidebar Clutter */}
      {currentTab === "landing" ? (
        <div className="w-full min-h-screen flex flex-col justify-between">
          {/* Subtle top header logo line */}
          <header className="h-16 border-b border-[#30363D] bg-[#161B22]/40 backdrop-blur px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-[#fafafa] text-sm">
                M
              </div>
              <span className="font-bold text-base text-white tracking-tight">Mentor.AI</span>
            </div>
            
            <button
              onClick={() => setCurrentTab("dev_center")}
              id="landing-btn-docs"
              className="text-xs font-mono font-bold text-[#8B949E] hover:text-[#C9D1D9] cursor-pointer"
            >
              System Specs
            </button>
          </header>

          <LandingPage
            onStart={() => setCurrentTab("generator")}
            onGoToDevCenter={() => setCurrentTab("dev_center")}
          />
        </div>
      ) : (
        <>
          {/* COLLAPSIBLE MOBILE HEADER */}
          <div className="md:hidden w-full h-16 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between px-6 z-30 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                M
              </div>
              <span className="font-bold text-base text-white tracking-tight">Mentor.AI</span>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 text-[#C9D1D9] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* SIDEBAR NAVIGATION */}
          <aside className={`
            fixed md:relative inset-y-0 left-0 w-64 border-r border-[#30363D] bg-[#161B22] flex flex-col justify-between z-40 transition-transform duration-300 md:translate-x-0 shrink-0
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}>
            <div>
              {/* Brand Header */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5 text-slate-950 font-bold" />
                  </div>
                  <span className="font-bold text-base text-white tracking-tight">Mentor.AI</span>
                </div>
                
                {/* Mobile close indicator */}
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="md:hidden p-1 text-[#8B949E] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="px-3 space-y-1">
                <div className="p-2 text-[10px] font-mono font-bold text-[#8B949E] uppercase tracking-wider">
                  Menu Links
                </div>

                <button
                  onClick={() => {
                    setCurrentTab("generator");
                    setSelectedProject(null);
                    setMobileMenuOpen(false);
                  }}
                  id="sidebar-nav-generator"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition cursor-pointer ${
                    currentTab === "generator"
                      ? "bg-[#1F6FEB]/10 text-sky-400 border border-[#1F6FEB]/30"
                      : "text-[#8B949E] hover:text-white hover:bg-[#21262D]"
                  }`}
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>Discover Projects</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab("saved");
                    setSelectedProject(null);
                    setMobileMenuOpen(false);
                  }}
                  id="sidebar-nav-saved"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition cursor-pointer ${
                    currentTab === "saved"
                      ? "bg-[#1F6FEB]/10 text-sky-400 border border-[#1F6FEB]/30"
                      : "text-[#8B949E] hover:text-white hover:bg-[#21262D]"
                  }`}
                >
                  <Star className="w-4 h-4 shrink-0" />
                  <span>Saved Blueprints</span>
                  {savedProjects.length > 0 && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.2 bg-[#1F6FEB] text-white rounded-full">
                      {savedProjects.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setCurrentTab("dev_center");
                    setSelectedProject(null);
                    setMobileMenuOpen(false);
                  }}
                  id="sidebar-nav-docs"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition cursor-pointer ${
                    currentTab === "dev_center"
                      ? "bg-[#1F6FEB]/10 text-sky-400 border border-[#1F6FEB]/30"
                      : "text-[#8B949E] hover:text-white hover:bg-[#21262D]"
                  }`}
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>System Architecture</span>
                </button>
              </nav>
            </div>

            {/* User Account Session Context */}
            <div className="p-4 border-t border-[#30363D] bg-[#0D1117]/50">
              {authUser?.loggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {authUser.picture ? (
                      <img src={authUser.picture} alt={authUser.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-sky-500/20" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-[#30363D] text-xs text-white uppercase font-bold">
                        {authUser.name.charAt(0)}
                      </div>
                    )}
                    <div className="text-xs min-w-0">
                      <p className="font-semibold text-white truncate max-w-[130px]">{authUser.name}</p>
                      <p className="text-[10px] text-[#8B949E] truncate max-w-[130px]">{authUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-1.5 bg-[#21262D] border border-red-950/10 hover:bg-rose-950/20 text-rose-400 hover:border-rose-900/30 rounded-md text-[10px] font-bold tracking-wider uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3 h-3 text-rose-400 hover:text-rose-300" />
                    Log Out Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 text-center font-medium">Connect your account safely to backup bookmarks.</p>
                  <button
                    onClick={handleGoogleLogin}
                    id="sidebar-btn-login"
                    className="w-full py-2 bg-[#21262D] border border-[#30363D] hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400 text-[#C9D1D9] rounded-md text-[11px] font-bold tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" opacity="0.9"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" opacity="0.8"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 12-4.53z" opacity="0.9"/>
                    </svg>
                    Google Student Sign In
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* MAIN CONTAINER */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#0D1117]">
            
            {/* STICKY TOP HEADER BAR */}
            <header className="h-16 border-b border-[#30363D] bg-[#0D1117]/80 backdrop-blur flex items-center justify-between px-6 sm:px-8 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <h1 className="text-base sm:text-lg font-sans font-bold text-white tracking-tight uppercase">
                  {selectedProject ? "Blueprint Core Detailed Analysis" : 
                   currentTab === "generator" ? "Personalized Project Innovation Discovery" :
                   currentTab === "saved" ? "Your Stored Blueprints Library" :
                   "Technical Spec Deliverables"}
                </h1>
                
                {selectedProject && (
                  <span className="hidden sm:inline-block text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded">
                    {selectedProject.title}
                  </span>
                )}
              </div>

              {/* Action Buttons to navigate quickly */}
              <div className="flex gap-2.5">
                {userProfile && (
                  <button
                    onClick={handleResetProfile}
                    id="header-btn-new-discovery"
                    className="px-3.5 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold rounded-md transition cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    New Discovery
                  </button>
                )}
                
                <button
                  onClick={() => setCurrentTab("landing")}
                  id="header-btn-home"
                  className="px-3 py-1.5 bg-[#21262D] border border-[#30363D] text-[#C9D1D9] hover:bg-[#30363D] rounded-md text-xs font-semibold transition cursor-pointer"
                >
                  Exit Home
                </button>
              </div>
            </header>

            {/* DYNAMIC SCENARIO LOADING VIEWS */}
            <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
              
              {isLoading ? (
                /* Sleek Terminal Loading Loop */
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin" />
                    <BrainCircuit className="w-6 h-6 text-sky-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white select-none">Consulting server-side Mentor AI...</h3>
                  <p className="text-xs text-[#8B949E] mt-2 max-w-sm">
                    Analyzing experience levels, extracting relevant dataset libraries, mapping technical architectures, and formulating custom resume metrics.
                  </p>
                </div>
              ) : selectedProject ? (
                /* 1. DETAILED ROADMAP VIEW */
                <DetailedProjectView
                  project={selectedProject}
                  onBack={() => {
                    setSelectedProject(null);
                    // Make sure they're routed properly
                    if (currentTab === "generator" && projectsList.length === 0) {
                      setCurrentTab("generator");
                    }
                  }}
                  onSave={handleSaveToggle}
                  isSaved={savedProjects.some(p => p.id === selectedProject.id)}
                  userEmail={authUser?.email || undefined}
                />
              ) : currentTab === "generator" ? (
                /* 2. FINDER FLOW */
                projectsList.length > 0 ? (
                  /* Results list is active */
                  <ProjectResults
                    projects={projectsList}
                    isFallback={isFallback}
                    onSelectProject={handleSelectProjectDirect}
                    onSaveProject={handleSaveToggle}
                    savedProjectIds={savedProjects.map(p => p.id)}
                    onBackToInput={() => {
                      setProjectsList([]);
                      setSelectedProject(null);
                    }}
                    warning={warningMessage}
                  />
                ) : (
                  /* Configuration dashboard inputs */
                  <Dashboard
                    onSubmit={handleProfileSubmit}
                    isLoading={isLoading}
                  />
                )
              ) : currentTab === "saved" ? (
                /* 3. BOOKMARKED CODE ROADMAPS */
                <SavedProjects
                  savedProjects={savedProjects}
                  onSelectProject={handleSelectProjectDirect}
                  onRemoveProject={handleRemoveSaved}
                  onGoToGenerator={handleGoToDiscovery}
                />
              ) : (
                /* 4. EXPLANATORY DOCUMENT Blueprints */
                <DevCenter />
              )}

            </div>

            {/* MINIMAL BOTTOM STATUS BAR ACCORDING TO DESIGN */}
            <footer className="h-10 border-t border-[#30363D] bg-[#0D1117] flex items-center justify-between px-6 sm:px-8 text-[10px] text-[#8B949E] font-mono shrink-0">
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Server: Gemini 3.5 Flash Active
                </span>
                <span className="hidden sm:inline">Context: Structured JSON Parser</span>
              </div>
              <div className="flex gap-4">
                <span>Stack: FastAPI + PostgreSQL</span>
                <span className="hidden sm:inline">Standard: GSoC Blueprinting 2026</span>
              </div>
            </footer>

          </main>
        </>
      )}

    </div>
  );
}
