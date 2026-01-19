import { easeIn, easeInOut, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Zap, Target, Palette, Code, Download, Share2, BarChart3, Brain, Wand2, Layout, FileText, ArrowRight, Star, Users, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import FeatureCard from "@/components/landing/FeatureCard";
import TestimonialCard from "@/components/landing/TestimonialCard";
import StatsSection from "@/components/landing/StatsSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen noise-overlay">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">The Future of Resume Building</span>
              <span className="px-2 py-0.5 bg-primary/20 rounded-full text-xs text-primary font-semibold">AI Powered</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              <motion.span
              initial={{
                opacity:0,
                
              x:-10
              
                
              }}
              animate={{
                opacity:1,
                
                x:0,
                transform:"easeInOut",
              
              }}
              
              
              className="block text-foreground">Build Resumes</motion.span>
              <motion.span className="block gradient-text">That Get You Hired</motion.span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 text-balance">
              Create stunning, AI-optimized Resumes in minutes. Our intelligent platform writes your content, designs your layout, and maximizes your professional impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/login">
                <Button variant="gradient" size="xl" className="group">
                  <Wand2 className="w-5 h-5" />
                  Start Building Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="glass" size="xl">
                  <Layout className="w-5 h-5" />
                  View Templates
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
                  ))}
                </div>
                <span className="text-sm">50,000+ creators</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm">Enterprise ready</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="glass-card-elevated rounded-2xl p-2 overflow-hidden">
              <div className="relative aspect-[16/9] rounded-xl bg-gradient-to-br from-secondary to-background overflow-hidden">
                {/* Mock Dashboard Preview */}
                <div className="absolute inset-0 p-6">
                  <div className="grid grid-cols-12 gap-4 h-full">
                    {/* Sidebar */}
                    <div className="col-span-2 glass-card rounded-xl p-4 space-y-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent" />
                      <div className="space-y-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-8 rounded-lg bg-white/5" />
                        ))}
                      </div>
                    </div>
                    {/* Main Content */}
                    <div className="col-span-7 space-y-4">
                      <div className="glass-card rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <Brain className="w-5 h-5 text-primary" />
                          <span className="font-medium">AI Content Writer</span>
                          <span className="ml-auto px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Generating...</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-white/10 rounded w-full" />
                          <div className="h-3 bg-white/10 rounded w-4/5" />
                          <div className="h-3 bg-white/10 rounded w-3/5" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card rounded-xl p-4">
                          <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mb-3" />
                          <div className="h-3 bg-white/10 rounded w-3/4" />
                        </div>
                        <div className="glass-card rounded-xl p-4">
                          <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-accent/20 to-pink-500/20 mb-3" />
                          <div className="h-3 bg-white/10 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                    {/* Right Panel */}
                    <div className="col-span-3 glass-card rounded-xl p-4 space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">Resume Score</div>
                        <div className="text-4xl font-bold gradient-text">92</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">SEO</span>
                          <span className="text-accent">Excellent</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Design</span>
                          <span className="text-primary">Great</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Content</span>
                          <span className="text-accent">Perfect</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 glass-card rounded-lg p-3 animate-float">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Features That <span className="gradient-text">Win Jobs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to maximize your professional impact and get you noticed by recruiters.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Brain}
              title="AI Content Writer"
              description="Generate compelling professional summaries, project descriptions, and skill highlights tailored to your industry."
              gradient="from-primary to-pink-500"
              delay={0}
            />
            <FeatureCard
              icon={Palette}
              title="AI Style Matcher"
              description="Our AI analyzes your industry and role to recommend the perfect color schemes, fonts, and layouts."
              gradient="from-accent to-blue-500"
              delay={0.1}
            />
            <FeatureCard
              icon={Target}
              title="Resume Scoring"
              description="Get a real-time score with actionable insights to improve your Resume's effectiveness."
              gradient="from-orange-500 to-yellow-500"
              delay={0.2}
            />
            <FeatureCard
              icon={Layout}
              title="Smart Templates"
              description="Choose from 50+ professionally designed templates that adapt to your content automatically."
              gradient="from-pink-500 to-rose-500"
              delay={0.3}
            />
            <FeatureCard
              icon={BarChart3}
              title="SEO Optimization"
              description="Automatically optimize your Resume for search engines to increase your visibility."
              gradient="from-green-500 to-emerald-500"
              delay={0.4}
            />
            <FeatureCard
              icon={Share2}
              title="Multi-Export"
              description="Export as shareable links, downloadable PDFs, or embed-ready HTML with one click."
              gradient="from-violet-500 to-purple-500"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              From Zero to <span className="gradient-text-accent">Hired</span> in Minutes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI handles the heavy lifting so you can focus on landing your dream job.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Input Your Info", description: "Share your experience, skills, and career goals. Our AI understands context.", icon: FileText },
              { step: "02", title: "AI Creates Magic", description: "Watch as AI generates content, selects templates, and optimizes everything.", icon: Wand2 },
              { step: "03", title: "Share & Get Hired", description: "Publish your Resume and start receiving opportunities immediately.", icon: Zap },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:border-primary/30 animated-border">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text">50,000+</span> Professionals
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the creators who landed their dream jobs with ResumeAI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Chen"
              role="UX Designer at Google"
              content="ResumeAI helped me land my dream job at Google. The AI suggestions were spot-on and the templates are stunning."
              avatar="SC"
              delay={0}
            />
            <TestimonialCard
              name="Marcus Johnson"
              role="Software Engineer at Meta"
              content="I went from no Resume to multiple interview calls in just a week. The AI content writer saved me hours of work."
              avatar="MJ"
              delay={0.1}
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="Product Manager at Stripe"
              content="The Resume scoring feature is a game-changer. It helped me identify exactly what I needed to improve."
              avatar="ER"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-elevated rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 animate-float">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Build Your <span className="gradient-text">Perfect Resume?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've transformed their careers with AI-powered Resumes.
              </p>
              <Link to="/login">
                <Button variant="gradient" size="xl" className="group">
                  <Wand2 className="w-5 h-5" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">No credit card required • Free forever plan available</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
