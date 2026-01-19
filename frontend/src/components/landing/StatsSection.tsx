import { motion } from "framer-motion";
import { Users, FileText, Briefcase, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "50,000+", label: "Active Users", color: "text-primary" },
  { icon: FileText, value: "120,000+", label: "Resumes Created", color: "text-accent" },
  { icon: Briefcase, value: "15,000+", label: "Jobs Landed", color: "text-orange-400" },
  { icon: TrendingUp, value: "94%", label: "Interview Rate", color: "text-green-400" },
];

const StatsSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
