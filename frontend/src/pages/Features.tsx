import { motion } from "framer-motion";
import { 
  Brain, Palette, Target, Layout, BarChart3, Share2,
  Wand2, Image, FileText, Code, Globe, Shield,
  Sparkles, ArrowRight, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const features = [
  {
    icon: Brain,
    title: "AI Content Writer",
    description: "Generate compelling professional summaries, project descriptions, and skill highlights tailored to your industry. Our AI understands context and writes like a human.",
    benefits: ["Save hours of writing", "Industry-optimized content", "Multiple tone options", "One-click regeneration"],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Palette,
    title: "AI Style Matcher",
    description: "Our AI analyzes your industry, role, and personal preferences to recommend the perfect color schemes, fonts, and layouts that make you stand out.",
    benefits: ["Personalized recommendations", "Industry-specific palettes", "Automatic dark/light modes", "Brand color extraction"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Target,
    title: "Resume Scoring",
    description: "Get a real-time score with actionable insights. Our AI evaluates your Resume across multiple dimensions and provides specific improvement suggestions.",
    benefits: ["Real-time scoring", "Actionable insights", "Industry benchmarks", "Progress tracking"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Layout,
    title: "50+ Smart Templates",
    description: "Choose from professionally designed templates that automatically adapt to your content. Each template is optimized for different industries and roles.",
    benefits: ["Responsive designs", "Auto content fitting", "Easy customization", "Regular updates"],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "SEO Optimization",
    description: "Automatically optimize your Resume for search engines. Increase your visibility and get discovered by recruiters searching for your skills.",
    benefits: ["Meta tag generation", "Keyword optimization", "Sitemap creation", "Performance scoring"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Share2,
    title: "Multi-Export Options",
    description: "Export your Resume as shareable links, downloadable PDFs, embed-ready HTML, or even as a standalone website with one click.",
    benefits: ["Shareable links", "PDF download", "HTML export", "Custom domains"],
    gradient: "from-indigo-500 to-violet-500",
  },
];

const additionalFeatures = [
  { icon: Wand2, title: "One-Click AI Generation", description: "Generate complete sections with a single click" },
  { icon: Image, title: "Smart Image Optimization", description: "Auto-crop, resize, and enhance your photos" },
  { icon: FileText, title: "ATS-Friendly Format", description: "Ensure compatibility with applicant tracking systems" },
  { icon: Code, title: "Developer-Friendly", description: "Export clean, semantic HTML and CSS code" },
  { icon: Globe, title: "Multi-Language Support", description: "Create Resumes in 20+ languages" },
  { icon: Shield, title: "Privacy Controls", description: "Control who sees your Resume with password protection" },
];

const Features = () => {
  return (
    <div className="min-h-screen noise-overlay">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Powered by Advanced AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Features That <span className="gradient-text">Set You Apart</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to maximize your professional impact and help you land your dream job.
            </p>
          </motion.div>

          {/* Main Features */}
          <div className="space-y-24 mb-24">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-3 mb-6">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/create">
                    <Button variant="gradient">
                      Try It Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className={`glass-card-elevated rounded-2xl p-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className={`aspect-video rounded-xl bg-gradient-to-br ${feature.gradient} opacity-20`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              And <span className="gradient-text-accent">Many More</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-6"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-elevated rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience These Features?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Start building your AI-powered Resume today. No credit card required.
              </p>
              <Link to="/login">
                <Button variant="gradient" size="xl">
                  <Wand2 className="w-5 h-5" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
