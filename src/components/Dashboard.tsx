import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, BookOpen, Clock, Target, Terminal, BrainCircuit } from "lucide-react";
import { UserProfile } from "../types";

interface DashboardProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const EXPERIENCES = ["Beginner (0-1 Years)", "Intermediate (1-3 Years)", "Advanced (3+ Years)"];
const TIMES = ["1 Month (Fast/Hackathon)", "3 Months (Standard/GSoC)", "6 Months+ (Thesis/Deep-Dive)"];
const GOALS = [
  "Research Internship / Academic Publication",
  "Elite Software Engineering Job (FAANG/SaaS)",
  "Google Summer of Code (GSoC) / Open Source Core",
  "High-Value Personal Portfolio & Recruiter Magnet",
  "Hackathon Winning Demo"
];

const PREFILLS = [
  {
    label: "Healthcare AI Academic",
    skills: "Python, PyTorch, pandas, FastAPI",
    interests: "Medical Image analysis, rare pediatric diseases, federated systems",
    technologies: "Convolutional Networks, DICOM files, Federated learning",
    experienceLevel: "Intermediate (1-3 Years)",
    availableTime: "3 Months (Standard/GSoC)",
    careerGoal: "Research Internship / Academic Publication"
  },
  {
    label: "Climate Metric Auditor",
    skills: "Python, SQL, Node.js",
    interests: "Fintech, global climate disclosures, greenwashing detection",
    technologies: "RAG frameworks, ChromaDB, Gemini LLM, Layout parsers",
    experienceLevel: "Intermediate (1-3 Years)",
    availableTime: "1 Month (Fast/Hackathon)",
    careerGoal: "Elite Software Engineering Job (FAANG/SaaS)"
  },
  {
    label: "Cloud Decentralized Db (Advance)",
    skills: "Go, Rust, Docker, Kubernetes",
    interests: "Realtime messaging, shared boards, decentralized authentication",
    technologies: "WebSockets, CRDT, SQLite distributed, Docker",
    experienceLevel: "Advanced (3+ Years)",
    availableTime: "6 Months+ (Thesis/Deep-Dive)",
    careerGoal: "Google Summer of Code (GSoC) / Open Source Core"
  }
];

export default function Dashboard({ onSubmit, isLoading }: DashboardProps) {
  const [profile, setProfile] = useState<UserProfile>({
    skills: "",
    interests: "",
    technologies: "",
    experienceLevel: "Intermediate (1-3 Years)",
    availableTime: "3 Months (Standard/GSoC)",
    careerGoal: "Research Internship / Academic Publication"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrefill = (pref: typeof PREFILLS[0]) => {
    setProfile({
      skills: pref.skills,
      interests: pref.interests,
      technologies: pref.technologies,
      experienceLevel: pref.experienceLevel,
      availableTime: pref.availableTime,
      careerGoal: pref.careerGoal
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.skills.trim() || !profile.interests.trim() || !profile.technologies.trim()) {
      return alert("Please fill in Core Skills, Interests, and desired Technologies!");
    }
    onSubmit(profile);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Title block */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-100 tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
          <BrainCircuit className="w-7 h-7 text-sky-400" />
          Configure Your Project Blueprint Profile
        </h2>
        <p className="text-slate-405 text-sm text-slate-400 mt-1 max-w-2xl">
          Enter your background, learning aspirations, and goals. Our server-side Gemini system will design optimal, publication-worthy project specs.
        </p>
      </div>

      {/* Prefill presets row */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 block">Prefill Example Profiles</h3>
        <div className="flex flex-wrap gap-2.5">
          {PREFILLS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              id={`preset-prefill-${idx}`}
              onClick={() => handlePrefill(p)}
              className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-sans text-xs rounded-full hover:text-white transition duration-200 cursor-pointer text-left"
            >
              🚀 {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/50 backdrop-blur-md border border-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Skills */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-200 font-sans font-semibold text-sm flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-sky-400" />
                Current Core Skills
              </label>
              <input
                type="text"
                name="skills"
                id="form-skills"
                value={profile.skills}
                onChange={handleInputChange}
                required
                placeholder="Python, Flask, JavaScript, SQLite (separated by commas)"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg text-slate-200 text-sm focus:outline-none transition font-sans"
              />
              <span className="text-xs text-slate-505 text-slate-505 text-slate-500 font-mono">Languages or libraries you are already confident in.</span>
            </div>

            {/* Technologies */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-200 font-sans font-semibold text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Technologies to Master
              </label>
              <input
                type="text"
                name="technologies"
                id="form-tech"
                value={profile.technologies}
                onChange={handleInputChange}
                required
                placeholder="RAG pipelines, Gemini API, Vector Databases, Docker"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg text-slate-200 text-sm focus:outline-none transition font-sans"
              />
              <span className="text-xs text-slate-500 font-mono">Frameworks, databases, or APIs you want to learn.</span>
            </div>

            {/* Experience Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-200 font-sans font-semibold text-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Experience Level
              </label>
              <select
                name="experienceLevel"
                id="form-experience"
                value={profile.experienceLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg text-slate-200 text-sm focus:outline-none cursor-pointer transition font-sans"
              >
                {EXPERIENCES.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Commitment */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-200 font-sans font-semibold text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                Time Commitment
              </label>
              <select
                name="availableTime"
                id="form-time"
                value={profile.availableTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg text-slate-200 text-sm focus:outline-none cursor-pointer transition font-sans"
              >
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interests */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-200 font-sans font-semibold text-sm flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-emerald-400" />
              Interests & Core Domains
            </label>
            <textarea
              name="interests"
              id="form-interests"
              value={profile.interests}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Healthcare dashboards, climate tax filings, greenwashing detection, social impact tools"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg text-slate-200 text-sm focus:outline-none transition font-sans resize-none"
            />
            <span className="text-xs text-slate-500 font-mono">The thematic areas, industries, or societal issues you care about deeply.</span>
          </div>

          {/* Career Goal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-200 font-sans font-semibold text-sm flex items-center gap-1.5">
              <Target className="w-4 h-4 text-rose-400" />
              Primary Career Objective
            </label>
            <select
              name="careerGoal"
              id="form-goal"
              value={profile.careerGoal}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg text-slate-200 text-sm focus:outline-none cursor-pointer transition font-sans"
            >
              {GOALS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-950 flex justify-end">
            <button
              type="submit"
              id="form-submit-btn"
              disabled={isLoading}
              className="px-8 py-3.5 bg-sky-505 bg-sky-500 hover:bg-sky-400 text-slate-950 font-sans font-semibold rounded-lg shadow-md hover:shadow-sky-500/10 flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Consulting Mentor AI..." : "Generate Personalized Projects"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
