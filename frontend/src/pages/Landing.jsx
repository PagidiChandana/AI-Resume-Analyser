import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChartPie, FaFileShield, FaRobot, FaWandMagicSparkles } from "react-icons/fa6";

const features = [
  { icon: FaRobot, title: "AI Review", text: "Gemini-powered resume feedback with clear, actionable insights." },
  { icon: FaChartPie, title: "ATS Scoring", text: "Score breakdown for skills, projects, experience, education, and formatting." },
  { icon: FaFileShield, title: "Report History", text: "Track every analysis and compare improvement across attempts." },
  { icon: FaWandMagicSparkles, title: "Career Tools", text: "Generate interviews, skill gaps, and job matches from one dashboard." }
];

const Landing = () => (
  <div>
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.28),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.20),transparent_32%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 px-3 py-1 text-sm text-cyan-100">AI-powered resume intelligence</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">AI Resume Analyzer</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Upload a resume, get a professional ATS score, pinpoint gaps, generate interview questions, and export a clean career report.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary bg-cyan-400 text-slate-950 hover:bg-cyan-300" to="/register">
              Start Analysis
            </Link>
            <Link className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15" to="/login">
              Login
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
          <div className="rounded-xl bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="font-bold">Resume Intelligence</span>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">Live</span>
            </div>
            <div className="mt-6 grid gap-4">
              {["ATS Compatibility", "Skill Density", "Project Impact", "Formatting"].map((item, index) => (
                <div key={item}>
                  <div className="mb-2 flex justify-between text-sm text-slate-300">
                    <span>{item}</span>
                    <span>{86 - index * 7}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${86 - index * 7}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass-panel rounded-xl p-5">
            <Icon className="text-2xl text-cyan-500" />
            <h3 className="mt-4 font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="border-y bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold">Built for final-year project quality</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            The interface combines upload workflows, AI analysis, charts, history, report export, admin analytics, and career preparation in one polished MERN experience.
          </p>
        </div>
        <div className="grid gap-4">
          {["Clean dashboard UX", "PDF export ready", "Dark and light modes"].map((item) => (
            <div key={item} className="rounded-xl border bg-slate-50 p-4 font-semibold dark:bg-slate-900">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold">Testimonials</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {["The ATS score made my resume much sharper.", "Interview questions helped me prepare fast.", "The dashboard feels like a real SaaS product."].map((quote, index) => (
          <div key={quote} className="glass-panel rounded-xl p-5">
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">"{quote}"</p>
            <p className="mt-4 font-bold">Student {index + 1}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Landing;
