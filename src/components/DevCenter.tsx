import { useState } from "react";
import { 
  FolderTree, Database, Terminal, GitBranch, Shield, 
  Settings, Server, Cpu, Navigation, Compass, Layers, Milestone, Copy 
} from "lucide-react";

const DELIVERABLES_MENU = [
  { id: "folders", label: "1. Folder Structure", icon: FolderTree },
  { id: "database", label: "2. Database Schema", icon: Database },
  { id: "api", label: "3. API Design", icon: Terminal },
  { id: "react", label: "4. React Components", icon: GitBranch },
  { id: "fastapi", label: "5. FastAPI Architecture", icon: Server },
  { id: "gemini", label: "6. Gemini Prompt Engineering", icon: Cpu },
  { id: "env", label: "7. Environment Variables", icon: Settings },
  { id: "auth", label: "8. Authentication Flow", icon: Shield },
  { id: "deploy", label: "9. Deployment & Docker", icon: Layers },
  { id: "roadmap", label: "10. MVP Development Roadmap", icon: Milestone }
];

export default function DevCenter() {
  const [activeTab, setActiveTab] = useState("folders");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentTab = DELIVERABLES_MENU.find(m => m.id === activeTab);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-sans">
      
      {/* Title block */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
          <Layers className="w-7 h-7 text-indigo-400" />
          Technical Blueprint & Architecture Reference
        </h2>
        <p className="text-[#8B949E] text-sm mt-1 max-w-3xl">
          Complete end-to-end technical system definitions required to write and deploy a professional, production-level student career portfolio or academic project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* Left Side menu Tabs */}
        <div className="md:col-span-1 space-y-1 bg-[#161B22] border border-[#30363D] p-3 rounded-xl shadow-sm">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2 py-1 block mb-2">
            Deliverable Categories
          </span>
          {DELIVERABLES_MENU.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                id={`dev-tab-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-left transition cursor-pointer ${
                  isActive
                    ? "bg-[#1F6FEB]/10 text-[#1F6FEB] border border-[#1F6FEB]/25"
                    : "text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D]"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#1F6FEB]" : ""}`} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right content view */}
        <div className="md:col-span-3 bg-[#161B22] border border-[#30363D] rounded-xl p-6 sm:p-8 min-h-[480px]">
          
          {/* FOLDERS */}
          {activeTab === "folders" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">1. Production Folder Structure</h3>
                <button
                  onClick={() => handleCopyCode("folders-code", FOLDER_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "folders-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed">
                Recommended professional monolithic setup for your production application. Includes isolated container modules for clear service boundary mapping.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-mono text-[#C9D1D9] overflow-x-auto whitespace-pre">
                {FOLDER_TEXT}
              </pre>
            </div>
          )}

          {/* DATABASE SCHEMA */}
          {activeTab === "database" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">2. PostgreSQL Relational Database Schema</h3>
                <button
                  onClick={() => handleCopyCode("db-code", DATABASE_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "db-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed font-sans">
                Highly optimized relational tables designed to support user profiles, dynamically generated recommendations, bookmarks, and detailed step-by-step roadmaps.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-mono text-[#C9D1D9] overflow-x-auto whitespace-pre">
                {DATABASE_TEXT}
              </pre>
            </div>
          )}

          {/* API DESIGN */}
          {activeTab === "api" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">3. API Entrypoint Design (FastAPI)</h3>
                <button
                  onClick={() => handleCopyCode("api-code", API_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "api-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed">
                Well-structured, REST-compliant paths configured with complete input type verification and JSON format validations.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-mono text-[#C9D1D9] overflow-x-auto">
                {API_TEXT}
              </pre>
            </div>
          )}

          {/* REACT COMPONENT WORK */}
          {activeTab === "react" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">4. React Component Architecture</h3>
                <button
                  onClick={() => handleCopyCode("react-code", REACT_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "react-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed text-sans">
                A state-driven component topology mapped with clear properties, callback parameters, and reactive motion handlers.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-mono text-[#C9D1D9] overflow-x-auto font-mono">
                {REACT_TEXT}
              </pre>
            </div>
          )}

          {/* FASTAPI ARCHITECTURE */}
          {activeTab === "fastapi" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">5. FastAPI Backend Engine Architecture</h3>
                <button
                  onClick={() => handleCopyCode("fastapi-code", FASTAPI_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "fastapi-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed">
                Utilize FastAPI's dependency injection mechanisms to isolate the PostgreSQL session pool and structured LLM generator instances.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-sans text-[#C9D1D9] overflow-x-auto font-mono">
                {FASTAPI_TEXT}
              </pre>
            </div>
          )}

          {/* PROMPT ENGINEERING */}
          {activeTab === "gemini" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">6. Gemini Structured Generation Strategy</h3>
                <button
                  onClick={() => handleCopyCode("gemini-code", PROMPT_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "gemini-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed">
                Advanced prompt mapping that leverages strict JSON-schema modeling constraints, ensuring 100% deterministic outputs for deep UI integration.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-mono text-[#C9D1D9] overflow-x-auto">
                {PROMPT_TEXT}
              </pre>
            </div>
          )}

          {/* ENVIRONMENT VARIABLES */}
          {activeTab === "env" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">7. Production .env Variable Protocol</h3>
                <button
                  onClick={() => handleCopyCode("env-code", ENV_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "env-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed">
                Secrets separation checklist containing critical API keys, database connection URIs, and OAuth URLs required for secure operations.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-mono text-[#C9D1D9] overflow-x-auto">
                {ENV_TEXT}
              </pre>
            </div>
          )}

          {/* OAUTH FLOW */}
          {activeTab === "auth" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">8. Google Authentication / OAuth 2.0 Loop</h3>
                <button
                  onClick={() => handleCopyCode("auth-code", AUTH_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "auth-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed text-sans">
                State transition pattern to securely verify incoming student emails, manage secure HTTP-only cookies, and issue session contexts.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-mono text-[#C9D1D9] overflow-x-auto">
                {AUTH_TEXT}
              </pre>
            </div>
          )}

          {/* DOCKER DEPLOY */}
          {activeTab === "deploy" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">9. Production Deployment & Dockerization</h3>
                <button
                  onClick={() => handleCopyCode("deploy-code", DOCKER_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "deploy-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed">
                Multi-stage optimization blueprints designed to generate ultra-small, lightning-fast static assets and production web runtime parameters.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-sans text-[#C9D1D9] overflow-x-auto font-mono">
                {DOCKER_TEXT}
              </pre>
            </div>
          )}

          {/* MVP ROADMAP */}
          {activeTab === "roadmap" && (
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-[#30363D] mb-5">
                <h3 className="font-bold text-base text-white font-mono">10. 4-Week MVP Strategy & Milestones</h3>
                <button
                  onClick={() => handleCopyCode("roadmap-code", ROADMAP_TEXT)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === "roadmap-code" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-[#8B949E] mb-4 leading-relaxed">
                Strategic phase sequencing designed to minimize integration risk, complete database testing early, and secure highly robust user flows.
              </p>
              <pre className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-sans text-[#C9D1D9] overflow-x-auto font-mono">
                {ROADMAP_TEXT}
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// DOCUMENTATION TEXT ASSETS
// ----------------------------------------------------

const FOLDER_TEXT = `
github-project-mentor/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                # FastAPI entry and middleware router
│   │   ├── database.py            # PostgreSQL SQLAlchemy/SQLModel connections
│   │   ├── models.py              # SQL tables Definitions 
│   │   ├── schemas.py             # Pydantic schema validation structures
│   │   ├── config.py              # Configuration manager 
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── gemini.py          # Structured generative client wraps
│   │   │   └── extraction.py      # PDF parsing and metadata layers
│   │   └── api/
│   │       ├── __init__.py
│   │       ├── auth.py            # OAuth redirects and Session tokens
│   │       ├── projects.py        # Core generation routes
│   │       └── saved.py           # Saved concept trackers
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ProjectResults.tsx
│   │   │   ├── DetailedProjectView.tsx
│   │   │   └── DevCenter.tsx
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
`;

const DATABASE_TEXT = `sql
-- Standard database definition for PostgreSQL
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skills TEXT NOT NULL,
    interests TEXT NOT NULL,
    technologies TEXT NOT NULL,
    experience_level VARCHAR(50) NOT NULL,
    available_time VARCHAR(50) NOT NULL,
    career_goal TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    innovation_score INT NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    difficulty_score INT NOT NULL,
    portfolio_value INT NOT NULL,
    research_potential INT NOT NULL,
    open_source_potential INT NOT NULL,
    github_readiness_score INT NOT NULL,
    research_gap TEXT,
    problem_statement TEXT,
    target_users JSONB,
    system_architecture TEXT,
    arch_components JSONB,
    recommended_tech_stack JSONB,
    dataset_suggestions JSONB,
    research_papers JSONB,
    development_roadmap JSONB,
    publication_opportunities JSONB,
    future_extensions JSONB,
    patent_potential TEXT,
    gsoc_relevance TEXT,
    resume_impact JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_blueprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, project_id)
);
`;

const API_TEXT = `python
# FastAPI Pydantic definitions & router routes
from pydantic import BaseModel, Field
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException

class ProfileRequest(BaseModel):
    skills: str = Field(..., example="Python, Pandas, FastAPI")
    interests: str = Field(..., example="Climate risk, greenwashing audit")
    technologies: str = Field(..., example="RAG databases, Docker, PyTorch")
    experienceLevel: str = Field(..., example="Intermediate (1-3 Years)")
    availableTime: str = Field(..., example="3 Months (Standard/GSoC)")
    careerGoal: str = Field(..., example="Research Internship")

router = APIRouter()

@router.post("/api/generate-projects")
async def generate_blueprints(payload: ProfileRequest, current_user = Depends(get_current_user)):
    """
    Parses incoming parameters, invokes the server-side Gemini architecture 
    to obtain a structured JSON model, and persists metadata in Postgres before delivery.
    """
    try:
        raw_concepts = await gemini_service.build_concept_matrix(payload)
        saved_records = await db_service.persist_profile_recommendations(
            user_id=current_user.id, 
            profile=payload, 
            projects=raw_concepts
        )
        return {"success": True, "projects": saved_records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
`;

const REACT_TEXT = `typescript
// React Component topology representation
interface DetailedProjectViewProps {
  project: ProjectData;
  isSaved: boolean;
  onBack: () => void;
  onSaveToggle: (id: string) => void;
  onDownloadMarkdown: () => void;
}

export default function DetailedProjectView({
  project,
  isSaved,
  onBack,
  onSaveToggle,
  onDownloadMarkdown
}: DetailedProjectViewProps) {
  return (
    <div className="project-detail-layout px-6 py-4">
      {/* Structural layout representing tabs, download triggers and data grids */}
    </div>
  );
}
`;

const FASTAPI_TEXT = `python
# FastAPI backend dependency architecture
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, projects, saved
from app.database import engine, Base

# Set up PostgreSQL metadata migrations
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GitHub Project Mentor AI Backend",
    description="Server-Side FastAPI engine coordinating Gemini API and PostgreSQL states",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["Authentication"])
app.include_router(projects.router, tags=["Mentorship API"])
app.include_router(saved.router, tags=["Bookmarks Storage"])
`;

const PROMPT_TEXT = `typescript
// Structured API Generation configuration utilizing the Google GenAI SDK
const prompt = "You are a world-class Mentor... Return exactly 5 projects parsed into strict structural schemas."

const response = await ai.models.generateContent({
  model: 'gemini-3.5-flash',
  contents: prompt,
  config: {
    responseMimeType: 'application/json',
    responseSchema: projectSchemaOutline, // Forces perfect JSON formatting with zero hallucinated spaces
    temperature: 0.85
  }
});
`;

const ENV_TEXT = `bash
# Production Secret Configuration Checklist
PORT=8000
DATABASE_URL=postgresql://user:password@cloud-pgsql-host:5432/dbname
GEMINI_API_KEY=AIzaSyD-YourActualGeminiKeyWithPermission
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-oauth-secret
FRONTEND_APP_URL=https://your-frontend-deployment-url.run.app
JWT_SECRET_KEY=highly-secure-jwt-secret-for-server-signed-sessions
`;

const AUTH_TEXT = `python
# Google OAuth 2.0 Auth Loop representation
@auth_router.get("/api/auth/login")
def login_redirect():
    # Direct users to google secure endpoints requesting OAuth scopes: openid, email
    pass

@auth_router.get("/api/auth/callback")
def oauth_callback(code: str, db: Session = Depends(get_db)):
    # Exchange callback code for access token & fetch User Email profile
    # If student exists, sign a secure JWT cookie representation
    # Redirect user back to local client application frontend
    pass
`;

const DOCKER_TEXT = `dockerfile
# Multi-stage optimized Docker architecture
# --- STAGE 1: Backend FastAPI Builder ---
FROM python:3.11-slim as backend
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# --- STAGE 2: Frontend Vite static bundle ---
FROM node:18-alpine as frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
`;

const ROADMAP_TEXT = `
[WEEK 1: Database & Foundation]
  - DB Schema provisioning in Postgres.
  - Setup authentication endpoints and security layers.
  - Test localized mock generator fallback values.

[WEEK 2: Gemini Integration]
  - Code Schema rules parsing of gemini outcomes.
  - Add vector models and research study link pipelines.
  - Test token throughput limits.

[WEEK 3: Responsive UI Layer]
  - Render the single profile dashboard configuration.
  - Dynamic score panels & card components integration.
  - Clean markdown copy buttons and exporters.

[WEEK 4: Deployment & Verification]
  - Package dependencies via multi-stage Dockerfiles.
  - Complete integration testing and publish to production.
`;
