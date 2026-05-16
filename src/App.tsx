/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Plus, Trash2, LayoutDashboard, User, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ProjectStatus = "Not Started" | "In Progress" | "Done";

interface Project {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  createdAt: Date;
}

const statusOptions: ProjectStatus[] = ["Not Started", "In Progress", "Done"];

const getStatusIcon = (status: ProjectStatus) => {
  switch (status) {
    case "Not Started":
      return <PlayCircle className="w-4 h-4 text-slate-400" />;
    case "In Progress":
      return <Clock className="w-4 h-4 text-blue-500" />;
    case "Done":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  }
};

const getStatusStyles = (status: ProjectStatus) => {
  switch (status) {
    case "Not Started":
      return "bg-slate-100 text-slate-600 border-slate-200";
    case "In Progress":
      return "bg-blue-50 text-blue-700 border-blue-100";
    case "Done":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
  }
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Not Started");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !owner.trim()) return;

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: name.trim(),
      owner: owner.trim(),
      status,
      createdAt: new Date(),
    };

    setProjects((prev) => [newProject, ...prev]);
    setName("");
    setOwner("");
    setStatus("Not Started");
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Team Project Tracker</h1>
            <p className="text-slate-500 text-sm">Manage and monitor team progress effectively.</p>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-8">
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-white p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 items-end">
              <div className="flex-1 w-full space-y-2">
                <label htmlFor="projectName" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 px-1">
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g. Website Redesign"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <label htmlFor="owner" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 px-1">
                  Owner
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="owner"
                    type="text"
                    required
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="E.g. Sarah J."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="w-full md:w-56 space-y-2">
                <label htmlFor="status" className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-1">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                Add Project
              </button>
            </form>
          </motion.div>

          {/* Projects Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-white overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Project</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Owner</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {projects.length === 0 ? (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center gap-2">
                            <div className="bg-slate-50 p-4 rounded-full">
                              <LayoutDashboard className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm">No projects added yet. Start by filling the form above.</p>
                          </div>
                        </td>
                      </motion.tr>
                    ) : (
                      projects.map((project) => (
                        <motion.tr
                          key={project.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="group hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-slate-700">{project.name}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                                {project.owner.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-sm text-slate-600">{project.owner}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(project.status)}`}>
                              {getStatusIcon(project.status)}
                              {project.status}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
