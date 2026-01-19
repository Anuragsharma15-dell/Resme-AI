import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink, User } from "lucide-react";

interface PortfolioData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  avatarUrl?: string;
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

interface LivePreviewProps {
  data: PortfolioData;
  template?: string;
  theme?: ThemeSettings;
}

const templateStyles: Record<string, { bg: string; card: string; accent: string; border: string }> = {
  "modern-dark": {
    bg: "bg-[#0a0a0f]",
    card: "bg-white/5",
    accent: "border-primary/30",
    border: "border-white/10",
  },
  "classic-bw": {
    bg: "bg-white",
    card: "bg-gray-50",
    accent: "border-gray-900",
    border: "border-gray-200",
  },
  "clean-light": {
    bg: "bg-gray-50",
    card: "bg-white",
    accent: "border-blue-500",
    border: "border-gray-200",
  },
  "creative-gradient": {
    bg: "bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900",
    card: "bg-white/10 backdrop-blur",
    accent: "border-pink-400",
    border: "border-white/20",
  },
  "minimal-pro": {
    bg: "bg-neutral-50",
    card: "bg-white shadow-sm",
    accent: "border-neutral-900",
    border: "border-neutral-200",
  },
  "developer-code": {
    bg: "bg-[#1e1e1e]",
    card: "bg-[#252526]",
    accent: "border-green-500",
    border: "border-[#3e3e42]",
  },
  "tech-stack": {
    bg: "bg-slate-900",
    card: "bg-slate-800",
    accent: "border-cyan-500",
    border: "border-slate-700",
  },
  "executive": {
    bg: "bg-stone-100",
    card: "bg-white",
    accent: "border-amber-600",
    border: "border-stone-200",
  },
};

const fontFamilies: Record<string, string> = {
  "Inter": "font-sans",
  "Playfair Display": "font-serif",
  "Space Mono": "font-mono",
  "Poppins": "font-sans",
  "Roboto": "font-sans",
  "Montserrat": "font-sans",
};

const LivePreview = ({ data, template = "modern-dark", theme }: LivePreviewProps) => {
  const hasContent = data.fullName || data.title || data.summary || data.skills.length > 0;
  
  const activeTemplate = theme?.template || template;
  const styles = templateStyles[activeTemplate] || templateStyles["modern-dark"];
  const fontClass = fontFamilies[theme?.fontFamily || "Inter"] || "font-sans";
  const themeColor = theme?.themeColor || "#8B5CF6";
  
  const isDark = ["modern-dark", "creative-gradient", "developer-code", "tech-stack"].includes(activeTemplate);
  const textColor = isDark ? "text-white" : "text-gray-900";
  const mutedColor = isDark ? "text-gray-400" : "text-gray-600";

  if (!hasContent) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg mb-2">Your portfolio preview will appear here</p>
          <p className="text-sm">Start adding your information to see the live preview</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`portfolio-preview h-full overflow-auto ${styles.bg} ${textColor} p-8 rounded-lg ${fontClass}`}
      style={{ "--theme-color": themeColor } as React.CSSProperties}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        {/* Avatar */}
        {data.avatarUrl && (
          <div className="mb-6 flex justify-center">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden border-4"
              style={{ borderColor: themeColor }}
            >
              <img 
                src={data.avatarUrl} 
                alt={data.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        {!data.avatarUrl && (
          <div className="mb-6 flex justify-center">
            <div 
              className={`w-32 h-32 rounded-full flex items-center justify-center ${styles.card} border-4`}
              style={{ borderColor: themeColor }}
            >
              <User className="w-16 h-16" style={{ color: themeColor }} />
            </div>
          </div>
        )}
        
        <h1 
          className="text-4xl font-bold mb-2"
          style={{ color: activeTemplate === "classic-bw" ? "#000" : themeColor }}
        >
          {data.fullName || "Your Name"}
        </h1>
        <p className={`text-xl ${mutedColor} mb-4`}>
          {data.title || "Your Professional Title"}
        </p>
        
        {/* Contact Info */}
        <div className={`flex items-center justify-center gap-4 flex-wrap text-sm ${mutedColor} mb-4`}>
          {data.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.email}
            </span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {data.phone}
            </span>
          )}
          {data.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.location}
            </span>
          )}
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          {data.linkedin && (
            <a 
              href={data.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: themeColor }}
              className="hover:opacity-80"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {data.github && (
            <a 
              href={data.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: themeColor }}
              className="hover:opacity-80"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {data.website && (
            <a 
              href={data.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: themeColor }}
              className="hover:opacity-80"
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      </motion.header>

      {/* Summary */}
      {data.summary && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: themeColor }}
          >
            About
          </h2>
          <p className={`${mutedColor} leading-relaxed`}>{data.summary}</p>
        </motion.section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience[0].company && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: themeColor }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.filter(exp => exp.company).map((exp, i) => (
              <div key={i}>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold">{exp.role || "Role"}</h3>
                  <span className={`text-sm ${mutedColor}`}>{exp.duration}</span>
                </div>
                <p style={{ color: themeColor }} className="mb-2">{exp.company}</p>
                {exp.description && (
                  <p className={`text-sm ${mutedColor}`}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Education */}
      {data.education.length > 0 && data.education[0].institution && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h2 
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: themeColor }}
          >
            Education
          </h2>
          <div className="space-y-4">
            {data.education.filter(edu => edu.institution).map((edu, i) => (
              <div key={i}>
                <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
                <p className={`text-sm ${mutedColor}`}>
                  {edu.institution} • {edu.year}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: themeColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-full"
                style={{ 
                  backgroundColor: `${themeColor}20`, 
                  color: themeColor 
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && data.projects[0].name && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 
            className="text-xl font-semibold mb-4 pb-2 border-b"
            style={{ borderColor: themeColor }}
          >
            Projects
          </h2>
          <div className="grid gap-4">
            {data.projects.filter(proj => proj.name).map((project, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg ${styles.card} border ${styles.border}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: themeColor }}
                      className="hover:opacity-80"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className={`text-sm ${mutedColor}`}>{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default LivePreview;
