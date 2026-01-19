import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Sparkles, Search, ArrowRight, Star, Users, Code, Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TemplatePreview from "@/components/portfolio/LivePreview";

const templates = [
  { id: "modern-dark", name: "Modern Dark", category: "Developer", popular: true, uses: 12500, rating: 4.9 },
  { id: "classic-bw", name: "Classic B&W", category: "Professional", popular: true, uses: 15200, rating: 4.9 },
  { id: "clean-light", name: "Clean Light", category: "Designer", popular: true, uses: 9800, rating: 4.8 },
  { id: "creative", name: "Creative Gradient", category: "Creative", popular: false, uses: 7200, rating: 4.7 },
  { id: "minimal-pro", name: "Minimal Pro", category: "Professional", popular: true, uses: 8500, rating: 4.9 },
  { id: "developer", name: "Developer Code", category: "Developer", popular: true, uses: 11200, rating: 4.8 },
  { id: "tech-stack", name: "Tech Stack", category: "Developer", popular: false, uses: 6400, rating: 4.7 },
  { id: "executive", name: "Executive", category: "Professional", popular: false, uses: 5400, rating: 4.6 },
];

const categories = ["All", "Developer", "Designer", "Creative", "Professional"];

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen noise-overlay">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="gradient-text">Template</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              8 professionally designed templates with real previews
            </p>
          </motion.div>

          {/* Developer Portfolio Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="glass-card rounded-xl p-6 mb-8 flex items-center gap-4 border border-accent/30">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1 flex items-center gap-2">
                Developer Portfolio <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">NEW</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Build a code-based portfolio with real React components, Monaco editor, and AI code generation.
              </p>
            </div>
            <Link to="/developer-portfolio">
              <Button variant="gradient">
                <Code className="w-4 h-4" /> Try Developer Mode
              </Button>
            </Link>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search templates..." className="pl-10 w-64" />
            </div>
          </div>

          {/* AI Recommendation */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-6 mb-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Not sure which template to choose?</h3>
              <p className="text-sm text-muted-foreground">Let our AI analyze your profile and recommend the perfect template.</p>
            </div>
            <Button variant="gradient">Get AI Recommendation <ArrowRight className="w-4 h-4" /></Button>
          </motion.div>

          {/* Templates Grid with Real Previews */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template, i) => (
              <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`group cursor-pointer ${selectedTemplate === template.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedTemplate(template.id)}>
                <div className="glass-card rounded-xl overflow-hidden animated-border">
                  <div className="aspect-[3/4] relative">
                    {template.popular && (
                      <span className="absolute top-3 left-3 z-10 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Popular
                      </span>
                    )}
                    <TemplatePreview template={template.id} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{template.name}</h3>
                      <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-muted-foreground">{template.category}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{(template.uses / 1000).toFixed(1)}k</span>
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />{template.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedTemplate && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
              <div className="glass-card rounded-xl p-4 flex items-center gap-4 shadow-2xl">
                <span className="text-sm">Selected: <strong>{templates.find(t => t.id === selectedTemplate)?.name}</strong></span>
                <Link to="/create"><Button variant="gradient">Use This Template <ArrowRight className="w-4 h-4" /></Button></Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Templates;
