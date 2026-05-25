const Loader = ({ label = "Loading..." }) => (
  <div className="flex min-h-40 items-center justify-center">
    <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      {label}
    </div>
  </div>
);

export default Loader;
