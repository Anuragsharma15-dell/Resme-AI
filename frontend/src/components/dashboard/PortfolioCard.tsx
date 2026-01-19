import { motion } from "framer-motion";
import { Eye, Share2, Download, MoreHorizontal, Edit2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ResumeCardProps {
  Resume: {
    id: number;
    name: string;
    template: string;
    views: number;
    score: number;
    lastEdited: string;
    status: "published" | "draft";
  };
  delay?: number;
}

const ResumeCard = ({ Resume, delay = 0 }: ResumeCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-accent";
    if (score >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card rounded-xl p-4 group hover:border-primary/30 transition-colors animated-border"
    >
      <div className="flex items-start gap-4">
        {/* Preview Thumbnail */}
        <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Preview</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold truncate">{Resume.name}</h3>
              <p className="text-sm text-muted-foreground">{Resume.template}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                Resume.status === "published" 
                  ? "bg-accent/20 text-accent" 
                  : "bg-yellow-500/20 text-yellow-500"
              }`}>
                {Resume.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {Resume.views.toLocaleString()}
            </span>
            <span className={`flex items-center gap-1 ${getScoreColor(Resume.score)}`}>
              Score: {Resume.score}
            </span>
            <span>Edited {Resume.lastEdited}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeCard;
