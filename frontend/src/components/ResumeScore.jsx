import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { clampScore } from "../utils/formatters";

const ResumeScore = ({ score = 0, breakdown = {} }) => {
  const safeScore = clampScore(score);
  const chartData = [{ name: "ATS", value: safeScore, fill: safeScore >= 75 ? "#06b6d4" : safeScore >= 55 ? "#f59e0b" : "#ef4444" }];
  const breakdownData = Object.entries({
    Skills: breakdown.skills,
    Projects: breakdown.projects,
    Experience: breakdown.experience,
    Education: breakdown.education,
    Formatting: breakdown.formatting
  }).map(([name, value]) => ({ name, value: clampScore(value) }));

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <div className="glass-panel rounded-xl p-5">
        <h3 className="text-base font-bold">ATS Score</h3>
        <div className="relative mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart innerRadius="72%" outerRadius="100%" data={chartData} startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" cornerRadius={18} background={{ fill: "#e2e8f0" }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-5xl font-extrabold">{safeScore}</p>
              <p className="text-sm text-slate-500">out of 100</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-5">
        <h3 className="text-base font-bold">Score Breakdown</h3>
        <div className="mt-5 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={breakdownData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResumeScore;
