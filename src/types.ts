export interface UserProfile {
  skills: string;
  interests: string;
  technologies: string;
  experienceLevel: string;
  availableTime: string;
  careerGoal: string;
}

export interface ComponentItem {
  title: string;
  desc: string;
}

export interface DatasetSuggestion {
  name: string;
  description: string;
  urlPlaceholder: string;
}

export interface ResearchPaper {
  title: string;
  link: string;
  significance: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  tasks: string[];
}

export interface PublicationOpt {
  venue: string;
  researchDirection: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  innovationScore: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  difficultyScore: number; // 1-10
  portfolioValue: number; // 0-100
  researchPotential: number; // 0-100
  openSourcePotential: number; // 0-100
  githubReadinessScore: number; // 0-100
  researchGap: string;
  problemStatement: string;
  targetUsers: string[];
  systemArchitecture: string;
  archComponents: ComponentItem[];
  recommendedTechStack: string[];
  datasetSuggestions: DatasetSuggestion[];
  researchPapers: ResearchPaper[];
  developmentRoadmap: RoadmapPhase[];
  publicationOpportunities: PublicationOpt[];
  futureExtensions: string[];
  patentPotential: string;
  gsocRelevance: string;
  resumeImpact: string[];
}

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
  loggedIn: boolean;
}

export interface ProjectFeedback {
  rating: number;
  comment?: string;
  timestamp: string;
}

