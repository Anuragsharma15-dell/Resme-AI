import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScoreWidgetProps {
  score: number;
}

const ScoreWidget = ({ score }: ScoreWidgetProps) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-green-400", message: "Excellent!" };
    if (score >= 80) return { grade: "A", color: "text-accent", message: "Great job!" };
    if (score >= 70) return { grade: "B", color: "text-yellow-400", message: "Good progress" };
    return { grade: "C", color: "text-orange-400", message: "Needs work" };
  };

  const { grade, color, message } = getScoreGrade(score);

  const tips = [
    { icon: CheckCircle, text: "Strong professional summary", positive: true },
    { icon: CheckCircle, text: "Good project descriptions", positive: true },
    { icon: AlertCircle, text: "Add more skills", positive: false },
    { icon: AlertCircle, text: "Include testimonials", positive: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Resume Score</h3>
      
      {/* Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-white/5"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: "stroke-dashoffset 1s ease-out",
              }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{score}</span>
            <span className={`text-sm font-medium ${color}`}>{grade}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-muted-foreground mb-4">{message}</p>

      {/* Tips */}
      <div className="space-y-2 mb-4">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <tip.icon className={`w-4 h-4 ${tip.positive ? "text-accent" : "text-orange-400"}`} />
            <span className="text-muted-foreground">{tip.text}</span>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <TrendingUp className="w-4 h-4" />
        Improve Score
      </Button>
    </motion.div>
  );
};

export default ScoreWidget;
