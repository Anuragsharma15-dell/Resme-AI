import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Wand2, ArrowRight, ArrowLeft, User, Briefcase, Code, 
  GraduationCap, Link2, Sparkles, Loader2,
  Plus, Trash2, CheckCircle, Eye, EyeOff, Download,
  FileText, Globe, Target, Palette, Search, Share2, Copy, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import LivePreview from "@/components/portfolio/LivePreview";
import ImageUpload from "@/components/portfolio/ImageUpload";
import ThemeCustomizer from "@/components/portfolio/ThemeCustomizer";
import { useAI } from "@/hooks/useAI";
import { generateHTML, downloadHTML, exportToPDF } from "@/lib/portfolioExport";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  avatarUrl: string;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    link: string;
  }>;
}

interface ThemeSettings {
  themeColor: string;
  fontFamily: string;
  template: string;
}

const steps = [
  { id: 1, label: "Basic Info", icon: User },
  { id: 2, label: "Experience", icon: Briefcase },
  { id: 3, label: "Education", icon: GraduationCap },
  { id: 4, label: "Skills", icon: Code },
  { id: 5, label: "Projects", icon: Link2 },
  { id: 6, label: "Preview & Export", icon: Sparkles },
];

const CreateResume = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(true);
  const [generatingField, setGeneratingField] = useState<string | null>(null);
  const [portfolioScore, setPortfolioScore] = useState<any>(null);
  const [skillSuggestions, setSkillSuggestions] = useState<any>(null);
  const [seoData, setSeoData] = useState<any>(null);
  const [styleData, setStyleData] = useState<any>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const { isLoading, generateContent, scorePortfolio, suggestSkills, optimizeSEO, getStyleRecommendation } = useAI();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
    avatarUrl: "",
    experience: [{ company: "", role: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "" }],
    skills: [],
    projects: [{ name: "", description: "", link: "" }],
  });
  const [skillInput, setSkillInput] = useState("");
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    themeColor: "#8B5CF6",
    fontFamily: "Inter",
    template: "modern-dark",
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", duration: "", description: "" }],
    }));
  };

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", year: "" }],
    }));
  };

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", link: "" }],
    }));
  };

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateProject = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  // AI Generation Functions
  const handleGenerateSummary = async () => {
    setGeneratingField("summary");
    const content = await generateContent("summary", {
      fullName: formData.fullName,
      title: formData.title,
      skills: formData.skills,
    });
    if (content) {
      updateField("summary", content);
      toast.success("Summary generated!");
    }
    setGeneratingField(null);
  };

  const handleGenerateExperienceDescription = async (index: number) => {
    setGeneratingField(`experience-${index}`);
    const exp = formData.experience[index];
    const content = await generateContent("experience", {
      company: exp.company,
      role: exp.role,
      duration: exp.duration,
    });
    if (content) {
      updateExperience(index, "description", content);
      toast.success("Description generated!");
    }
    setGeneratingField(null);
  };

  const handleGenerateProjectDescription = async (index: number) => {
    setGeneratingField(`project-${index}`);
    const project = formData.projects[index];
    const content = await generateContent("project", {
      projectName: project.name,
    });
    if (content) {
      updateProject(index, "description", content);
      toast.success("Project description generated!");
    }
    setGeneratingField(null);
  };

  const handleGetSkillSuggestions = async () => {
    const suggestions = await suggestSkills(formData.title, formData.skills, "technology");
    if (suggestions) {
      setSkillSuggestions(suggestions);
      toast.success("Skill suggestions loaded!");
    }
  };

  const handleScorePortfolio = async () => {
    const score = await scorePortfolio(formData);
    if (score) {
      setPortfolioScore(score);
      toast.success("Portfolio scored!");
    }
  };

  const handleOptimizeSEO = async () => {
    const seo = await optimizeSEO(formData);
    if (seo) {
      setSeoData(seo);
      toast.success("SEO analysis complete!");
    }
  };

  const handleGetStyleRecommendation = async () => {
    const style = await getStyleRecommendation(formData.title, "technology", "professional");
    if (style) {
      setStyleData(style);
      toast.success("Style recommendations loaded!");
    }
  };

  const handleExportHTML = () => {
    const html = generateHTML(formData, themeSettings.template, themeSettings);
    downloadHTML(html, `${formData.fullName.toLowerCase().replace(/\s+/g, "-")}-portfolio.html`);
    toast.success("HTML exported!");
  };

  const handleExportPDF = async () => {
    if (previewRef.current) {
      try {
        // Get the inner preview content for better capture
        const previewContent = previewRef.current.querySelector('.portfolio-preview') as HTMLElement;
        const targetElement = previewContent || previewRef.current;
        await exportToPDF(targetElement, `${formData.fullName.toLowerCase().replace(/\s+/g, "-")}-portfolio.pdf`, themeSettings.template);
        toast.success("PDF exported!");
      } catch (error) {
        toast.error("Failed to export PDF");
      }
    }
  };

  const handleCopyLink = async () => {
    const portfolioId = btoa(JSON.stringify(formData)).slice(0, 20);
    const link = `${window.location.origin}/portfolio/preview`;
    await navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen noise-overlay">
      <Navbar />
      
      <div className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Create Your <span className="gradient-text">AI Portfolio</span>
            </h1>
            <p className="text-muted-foreground">
              Let AI help you build a stunning portfolio that gets you hired
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <motion.button
                    onClick={() => setCurrentStep(step.id)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                      currentStep === step.id
                        ? "bg-gradient-to-br from-primary to-accent text-white"
                        : currentStep > step.id
                        ? "bg-accent/20 text-accent"
                        : "bg-white/5 text-muted-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </motion.button>
                  {i < steps.length - 1 && (
                    <div className={`hidden sm:block w-6 md:w-12 h-0.5 mx-1 ${
                      currentStep > step.id ? "bg-accent" : "bg-white/10"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-6 max-h-[70vh] overflow-y-auto"
            >
              <div className="p-3 mb-4 rounded-lg bg-accent/5 border border-accent/10 text-sm text-muted-foreground">
                You can customize theme, text-font, color, background-color, text-color — everything on the last page  for your resume in live preview , so don't worry here.
              </div>
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                  </div>
                  
                  {/* Profile Photo Upload */}
                  <div className="flex justify-center mb-4">
                    <ImageUpload
                      currentImage={formData.avatarUrl}
                      onImageChange={(url) => updateField("avatarUrl", url || "")}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Professional Title</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="Senior Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <Input
                        value={formData.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Website</label>
                      <Input
                        value={formData.website}
                        onChange={(e) => updateField("website", e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">LinkedIn</label>
                      <Input
                        value={formData.linkedin}
                        onChange={(e) => updateField("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">GitHub</label>
                      <Input
                        value={formData.github}
                        onChange={(e) => updateField("github", e.target.value)}
                        placeholder="https://github.com/johndoe"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium">Professional Summary</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerateSummary}
                        disabled={generatingField === "summary"}
                      >
                        {generatingField === "summary" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Wand2 className="w-4 h-4" />
                        )}
                        AI Generate
                      </Button>
                    </div>
                    <textarea
                      value={formData.summary}
                      onChange={(e) => updateField("summary", e.target.value)}
                      className="w-full h-28 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Write a compelling summary about yourself..."
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Experience */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                    <Button variant="outline" size="sm" onClick={addExperience}>
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                  {formData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Experience {index + 1}
                        </span>
                        {formData.experience.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(index)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-2">
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          placeholder="Company"
                        />
                        <Input
                          value={exp.role}
                          onChange={(e) => updateExperience(index, "role", e.target.value)}
                          placeholder="Role"
                        />
                      </div>
                      <Input
                        value={exp.duration}
                        onChange={(e) => updateExperience(index, "duration", e.target.value)}
                        placeholder="Duration (e.g., Jan 2020 - Present)"
                      />
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs text-muted-foreground">Description</label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGenerateExperienceDescription(index)}
                            disabled={generatingField === `experience-${index}`}
                            className="h-6 text-xs"
                          >
                            {generatingField === `experience-${index}` ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Wand2 className="w-3 h-3" />
                            )}
                            AI
                          </Button>
                        </div>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(index, "description", e.target.value)}
                          className="w-full h-20 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Describe your responsibilities..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Education */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <Button variant="outline" size="sm" onClick={addEducation}>
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                  {formData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Education {index + 1}
                        </span>
                        {formData.education.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(index)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        placeholder="Institution"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="Degree"
                        />
                        <Input
                          value={edu.year}
                          onChange={(e) => updateEducation(index, "year", e.target.value)}
                          placeholder="Year"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Skills */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <Button variant="outline" size="sm" onClick={handleGetSkillSuggestions} disabled={isLoading}>
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                      AI Suggest
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      placeholder="Type a skill and press Enter"
                    />
                    <Button onClick={addSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-sm font-medium flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-destructive transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  {/* AI Skill Suggestions */}
                  {skillSuggestions && (
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">AI Suggestions</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Recommended</p>
                          <div className="flex flex-wrap gap-1">
                            {skillSuggestions.suggested?.slice(0, 8).map((skill: string) => (
                              <button
                                key={skill}
                                onClick={() => {
                                  if (!formData.skills.includes(skill)) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      skills: [...prev.skills, skill],
                                    }));
                                  }
                                }}
                                className="px-2 py-1 rounded bg-white/5 text-xs hover:bg-white/10 transition-colors"
                              >
                                + {skill}
                              </button>
                            ))}
                          </div>
                        </div>
                        {skillSuggestions.trending && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Trending</p>
                            <div className="flex flex-wrap gap-1">
                              {skillSuggestions.trending.map((skill: string) => (
                                <button
                                  key={skill}
                                  onClick={() => {
                                    if (!formData.skills.includes(skill)) {
                                      setFormData((prev) => ({
                                        ...prev,
                                        skills: [...prev.skills, skill],
                                      }));
                                    }
                                  }}
                                  className="px-2 py-1 rounded bg-accent/20 text-accent text-xs hover:bg-accent/30 transition-colors"
                                >
                                  🔥 {skill}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Projects */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Projects</h2>
                    <Button variant="outline" size="sm" onClick={addProject}>
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                  {formData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Project {index + 1}
                        </span>
                        {formData.projects.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(index)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={project.name}
                        onChange={(e) => updateProject(index, "name", e.target.value)}
                        placeholder="Project Name"
                      />
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs text-muted-foreground">Description</label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGenerateProjectDescription(index)}
                            disabled={generatingField === `project-${index}`}
                            className="h-6 text-xs"
                          >
                            {generatingField === `project-${index}` ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Wand2 className="w-3 h-3" />
                            )}
                            AI
                          </Button>
                        </div>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, "description", e.target.value)}
                          className="w-full h-16 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Describe your project..."
                        />
                      </div>
                      <Input
                        value={project.link}
                        onChange={(e) => updateProject(index, "link", e.target.value)}
                        placeholder="Project URL"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Step 6: Preview & Export */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Customize & Export</h2>
                  
                  {/* Theme Customizer */}
                  <div className="mb-6">
                    <ThemeCustomizer
                      themeColor={themeSettings.themeColor}
                      fontFamily={themeSettings.fontFamily}
                      template={themeSettings.template}
                      onThemeColorChange={(color) => setThemeSettings(prev => ({ ...prev, themeColor: color }))}
                      onFontFamilyChange={(font) => setThemeSettings(prev => ({ ...prev, fontFamily: font }))}
                      onTemplateChange={(template) => setThemeSettings(prev => ({ ...prev, template }))}
                    />
                  </div>
                  
                  {/* AI Features Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={handleScorePortfolio}
                      disabled={isLoading}
                      className="h-auto py-3 flex flex-col items-center gap-1"
                    >
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-xs">Score Portfolio</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleOptimizeSEO}
                      disabled={isLoading}
                      className="h-auto py-3 flex flex-col items-center gap-1"
                    >
                      <Search className="w-5 h-5 text-accent" />
                      <span className="text-xs">SEO Optimize</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleGetStyleRecommendation}
                      disabled={isLoading}
                      className="h-auto py-3 flex flex-col items-center gap-1"
                    >
                      <Palette className="w-5 h-5 text-pink-400" />
                      <span className="text-xs">Style Match</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCopyLink}
                      className="h-auto py-3 flex flex-col items-center gap-1"
                    >
                      <Share2 className="w-5 h-5 text-orange-400" />
                      <span className="text-xs">Share Link</span>
                    </Button>
                  </div>

                  {/* Score Display */}
                  {portfolioScore && (
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Portfolio Score</span>
                        <span className="text-3xl font-bold gradient-text">{portfolioScore.overallScore}</span>
                      </div>
                      <div className="space-y-2">
                        {portfolioScore.strengths?.slice(0, 2).map((s: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-accent">
                            <CheckCircle className="w-4 h-4" />
                            {s}
                          </div>
                        ))}
                        {portfolioScore.improvements?.slice(0, 2).map((s: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-orange-400">
                            <ArrowRight className="w-4 h-4" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SEO Display */}
                  {seoData && (
                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">SEO Score</span>
                        <span className="text-2xl font-bold text-accent">{seoData.score}/100</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          <strong>Title:</strong> {seoData.title}
                        </p>
                        <p className="text-muted-foreground">
                          <strong>Meta:</strong> {seoData.metaDescription}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Export Buttons */}
                  <div className="space-y-2">
                    <Button variant="gradient" onClick={handleExportPDF} className="w-full">
                      <Download className="w-4 h-4" />
                      Export as PDF
                    </Button>
                    <Button variant="outline" onClick={handleExportHTML} className="w-full">
                      <FileText className="w-4 h-4" />
                      Export as HTML
                    </Button>
                    <Button variant="outline" onClick={handleCopyLink} className="w-full">
                      <Copy className="w-4 h-4" />
                      Copy Shareable Link
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                {currentStep < 6 ? (
                  <Button variant="gradient" onClick={nextStep}>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Link to="/dashboard">
                    <Button variant="gradient">
                      <Sparkles className="w-4 h-4" />
                      Save Portfolio
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Live Preview Section */}
            <div className="lg:block">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Live Preview</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {showPreview && (
                <div ref={previewRef} className="glass-card rounded-2xl h-[70vh] overflow-hidden">
                  <LivePreview data={formData} theme={themeSettings} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
