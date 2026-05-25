import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

const Footer = () => (
  <footer className="border-t bg-white dark:bg-slate-950">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
      <div>
        <Logo />
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
          A professional AI dashboard for resume scoring, interview preparation, skill gap analysis, and career recommendations.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-bold">Product</h3>
        <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-400">
          <a href="/dashboard">Dashboard</a>
          <a href="/upload">Upload</a>
          <a href="/history">History</a>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold">Connect</h3>
        <div className="mt-4 flex gap-3 text-xl text-slate-600 dark:text-slate-400">
          <FaGithub />
          <FaLinkedin />
          <FaXTwitter />
        </div>
      </div>
    </div>
    <div className="border-t px-4 py-4 text-center text-xs text-slate-500">
      Copyright {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
    </div>
  </footer>
);

export default Footer;
