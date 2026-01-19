import { motion } from "framer-motion";
import { Eye, Download, Share2, Edit2 } from "lucide-react";

const ActivityFeed = () => {
  const activities = [
    { icon: Eye, text: "Someone viewed your Resume", time: "2 min ago", color: "text-primary" },
    { icon: Download, text: "Resume exported as PDF", time: "1 hour ago", color: "text-accent" },
    { icon: Share2, text: "Link shared to LinkedIn", time: "3 hours ago", color: "text-blue-400" },
    { icon: Edit2, text: "Updated work experience", time: "Yesterday", color: "text-orange-400" },
    { icon: Eye, text: "5 new profile views", time: "Yesterday", color: "text-primary" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
