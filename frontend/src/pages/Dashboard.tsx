import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Plus, Eye, Share2, Download, MoreHorizontal, Settings,
  BarChart3, Clock, TrendingUp, FileText, Users, Globe,
  Sparkles, Bell, Search, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResumeCard from "@/components/dashboard/PortfolioCard";
import ScoreWidget from "@/components/dashboard/ScoreWidget";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";




const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const Resumes = [
    {
      id: 1,
      name: "Software Engineer Resume",
      template: "Modern Dark",
      views: 1234,
      score: 92,
      lastEdited: "2 hours ago",
      status: "published" as const,
    },
    {
      id: 2,
      name: "Product Manager Resume",
      template: "Clean Light",
      views: 567,
      score: 85,
      lastEdited: "1 day ago",
      status: "draft" as const,
    },
    {
      id: 3,
      name: "UX Designer Showcase",
      template: "Creative",
      views: 890,
      score: 88,
      lastEdited: "3 days ago",
      status: "published" as const,
    },
  ];

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Development Notice */}
        <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <p className="text-sm text-amber-600 dark:text-amber-400">
            <strong>⚡ Development Mode:</strong> Pages like Resumes, Settings, and Analytics are currently in development mode. They will be fully functional after some time.
          </p>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your Resumes and track performance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Resumes..."
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Link to="/create">
              <Button variant="gradient">
                <Plus className="w-4 h-4" />
                New Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Views", value: "12,543", change: "+12%", icon: Eye, color: "text-primary" },
            { label: "Resumes", value: "3", change: "+1", icon: FileText, color: "text-accent" },
            { label: "Avg. Score", value: "88", change: "+5", icon: TrendingUp, color: "text-orange-400" },
            { label: "Unique Visitors", value: "2,891", change: "+23%", icon: Users, color: "text-green-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-accent">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Resumes List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Resumes</h2>
              <Button variant="ghost" size="sm">
                View All
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            {Resumes.map((Resume, i) => (
              <ResumeCard key={Resume.id} Resume={Resume} delay={i * 0.1} />
            ))}
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <ScoreWidget score={88} />
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
