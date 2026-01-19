import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, Code, Terminal, Server, Database } from "lucide-react";

interface TemplatePreviewProps {
  template: string;
  data?: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    summary: string;
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
      techStack?: string[];
    }>;
  };
}

const sampleData = {
  fullName: "Alex Morgan",
  title: "Senior Software Engineer",
  email: "alex@example.com",
  phone: "+1 555-123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexmorgan",
  github: "github.com/alexmorgan",
  website: "alexmorgan.dev",
  summary: "Passionate developer with 8+ years of experience building scalable applications.",
  experience: [
    { company: "TechCorp", role: "Senior Engineer", duration: "2020 - Present", description: "Led team of 5 engineers" },
  ],
  education: [
    { institution: "Stanford University", degree: "BS Computer Science", year: "2016" },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
  projects: [
    { name: "Project Alpha", description: "A full-stack web application", link: "#", techStack: ["React", "Node.js"] },
  ],
};

// Modern Dark Template
const ModernDarkTemplate = ({ data = sampleData }: { data?: typeof sampleData }) => (
  <div className="bg-[#0a0a0f] text-white p-6 h-full font-sans">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        {data.fullName}
      </h1>
      <p className="text-sm text-gray-400 mt-1">{data.title}</p>
      <div className="flex justify-center gap-3 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{data.email}</span>
      </div>
    </div>
    <div className="space-y-4">
      <div>
        <h2 className="text-xs font-semibold text-violet-400 mb-2 border-b border-violet-400/30 pb-1">ABOUT</h2>
        <p className="text-xs text-gray-300 leading-relaxed">{data.summary}</p>
      </div>
      <div>
        <h2 className="text-xs font-semibold text-violet-400 mb-2 border-b border-violet-400/30 pb-1">SKILLS</h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.map(skill => (
            <span key={skill} className="px-2 py-0.5 bg-violet-400/20 text-violet-300 text-[10px] rounded-full">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Classic Black & White Resume
const ClassicBWTemplate = ({ data = sampleData }: { data?: typeof sampleData }) => (
  <div className="bg-white text-gray-900 p-6 h-full font-serif">
    <div className="text-center border-b-2 border-gray-900 pb-4 mb-4">
      <h1 className="text-2xl font-bold uppercase tracking-wider">{data.fullName}</h1>
      <p className="text-sm text-gray-600 mt-1">{data.title}</p>
      <div className="flex justify-center gap-4 mt-2 text-xs text-gray-600">
        <span>{data.email}</span>
        <span>|</span>
        <span>{data.phone}</span>
        <span>|</span>
        <span>{data.location}</span>
      </div>
    </div>
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">Summary</h2>
        <p className="text-xs text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between">
              <span className="text-xs font-semibold">{exp.role}</span>
              <span className="text-xs text-gray-500">{exp.duration}</span>
            </div>
            <span className="text-xs text-gray-600">{exp.company}</span>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="text-xs">
            <span className="font-semibold">{edu.degree}</span> - {edu.institution}, {edu.year}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Minimal Pro Template
const MinimalProTemplate = ({ data = sampleData }: { data?: typeof sampleData }) => (
  <div className="bg-gray-50 text-gray-800 p-6 h-full font-sans">
    <div className="mb-6">
      <h1 className="text-2xl font-light">{data.fullName}</h1>
      <p className="text-sm text-gray-500">{data.title}</p>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        <div>
          <h2 className="text-xs font-medium uppercase text-gray-400 mb-2">About</h2>
          <p className="text-xs text-gray-600">{data.summary}</p>
        </div>
        <div>
          <h2 className="text-xs font-medium uppercase text-gray-400 mb-2">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="text-xs font-medium">{exp.role} at {exp.company}</p>
              <p className="text-[10px] text-gray-500">{exp.duration}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="text-xs font-medium uppercase text-gray-400 mb-2">Contact</h2>
          <div className="text-xs text-gray-600 space-y-1">
            <p>{data.email}</p>
            <p>{data.location}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-medium uppercase text-gray-400 mb-2">Skills</h2>
          <div className="text-xs text-gray-600 space-y-0.5">
            {data.skills.slice(0, 5).map(skill => <p key={skill}>{skill}</p>)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Creative Gradient Template
const CreativeTemplate = ({ data = sampleData }: { data?: typeof sampleData }) => (
  <div className="bg-gradient-to-br from-pink-50 to-purple-50 text-gray-800 p-6 h-full font-sans">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        {data.fullName}
      </h1>
      <p className="text-sm text-gray-600">{data.title}</p>
    </div>
    <div className="bg-white/60 backdrop-blur rounded-xl p-4 shadow-sm">
      <p className="text-xs text-gray-600 text-center italic">{data.summary}</p>
    </div>
    <div className="mt-4 flex flex-wrap gap-1 justify-center">
      {data.skills.map(skill => (
        <span key={skill} className="px-2 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-600 text-[10px] rounded-full font-medium">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

// Developer Portfolio Template
const DeveloperTemplate = ({ data = sampleData }: { data?: typeof sampleData }) => (
  <div className="bg-[#1e1e2e] text-gray-200 p-6 h-full font-mono">
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-1">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
      </div>
      <span className="text-xs text-gray-500">portfolio.tsx</span>
    </div>
    <div className="space-y-2 text-xs">
      <p><span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> = {"{"}</p>
      <p className="pl-4"><span className="text-pink-400">name</span>: <span className="text-green-400">"{data.fullName}"</span>,</p>
      <p className="pl-4"><span className="text-pink-400">role</span>: <span className="text-green-400">"{data.title}"</span>,</p>
      <p className="pl-4"><span className="text-pink-400">skills</span>: [</p>
      <p className="pl-8">
        {data.skills.slice(0, 4).map((skill, i) => (
          <span key={skill}><span className="text-green-400">"{skill}"</span>{i < 3 ? ", " : ""}</span>
        ))}
      </p>
      <p className="pl-4">],</p>
      <p className="pl-4"><span className="text-pink-400">status</span>: <span className="text-yellow-400">"Open to work"</span></p>
      <p>{"}"};</p>
    </div>
    <div className="mt-4 flex gap-2">
      <Terminal className="w-4 h-4 text-green-400" />
      <Code className="w-4 h-4 text-cyan-400" />
      <Database className="w-4 h-4 text-purple-400" />
    </div>
  </div>
);

// Tech Stack Template
const TechStackTemplate = ({ data = sampleData }: { data?: typeof sampleData }) => (
  <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-6 h-full font-sans">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
        <Server className="w-5 h-5 text-emerald-400" />
      </div>
      <div>
        <h1 className="text-lg font-bold">{data.fullName}</h1>
        <p className="text-xs text-emerald-300">{data.title}</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="bg-black/20 rounded-lg p-3">
        <h2 className="text-[10px] font-semibold text-emerald-400 uppercase mb-2">Tech Stack</h2>
        <div className="grid grid-cols-3 gap-1">
          {data.skills.map(skill => (
            <span key={skill} className="text-[9px] px-1.5 py-0.5 bg-emerald-400/10 rounded text-center text-emerald-200">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-black/20 rounded-lg p-3">
        <h2 className="text-[10px] font-semibold text-emerald-400 uppercase mb-1">Contact</h2>
        <div className="text-xs text-gray-300 space-y-0.5">
          <p className="flex items-center gap-1"><Github className="w-3 h-3" /> {data.github}</p>
          <p className="flex items-center gap-1"><Globe className="w-3 h-3" /> {data.website}</p>
        </div>
      </div>
    </div>
  </div>
);

// Executive Template
const ExecutiveTemplate = ({ data = sampleData }: { data?: typeof sampleData }) => (
  <div className="bg-slate-900 text-white p-6 h-full font-sans">
    <div className="border-l-4 border-amber-500 pl-4 mb-6">
      <h1 className="text-xl font-bold">{data.fullName}</h1>
      <p className="text-sm text-amber-400">{data.title}</p>
    </div>
    <div className="space-y-4">
      <p className="text-xs text-gray-400 leading-relaxed">{data.summary}</p>
      <div className="border-t border-slate-700 pt-3">
        <h2 className="text-xs font-semibold text-amber-400 mb-2">Key Expertise</h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.map(skill => (
            <span key={skill} className="px-2 py-0.5 bg-amber-500/10 text-amber-300 text-[10px] rounded border border-amber-500/20">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Clean Light Template  
const CleanLightTemplate = ({ data = sampleData }: { data?: typeof sampleData }) => (
  <div className="bg-white text-gray-800 p-6 h-full font-sans">
    <div className="text-center mb-4">
      <h1 className="text-xl font-semibold text-blue-600">{data.fullName}</h1>
      <p className="text-sm text-gray-500">{data.title}</p>
      <div className="flex justify-center gap-2 mt-2 text-xs text-gray-400">
        <span>{data.email}</span>
        <span>•</span>
        <span>{data.location}</span>
      </div>
    </div>
    <div className="border-t border-gray-200 pt-3">
      <h2 className="text-xs font-medium text-blue-600 mb-2">About</h2>
      <p className="text-xs text-gray-600">{data.summary}</p>
    </div>
    <div className="mt-3">
      <h2 className="text-xs font-medium text-blue-600 mb-2">Skills</h2>
      <div className="flex flex-wrap gap-1">
        {data.skills.map(skill => (
          <span key={skill} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full">{skill}</span>
        ))}
      </div>
    </div>
  </div>
);

export const templateComponents: Record<string, React.FC<{ data?: typeof sampleData }>> = {
  "modern-dark": ModernDarkTemplate,
  "classic-bw": ClassicBWTemplate,
  "minimal-pro": MinimalProTemplate,
  "creative": CreativeTemplate,
  "developer": DeveloperTemplate,
  "tech-stack": TechStackTemplate,
  "executive": ExecutiveTemplate,
  "clean-light": CleanLightTemplate,
};

const TemplatePreview = ({ template, data }: TemplatePreviewProps) => {
  const TemplateComponent = templateComponents[template] || ModernDarkTemplate;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full rounded-lg overflow-hidden shadow-lg"
    >
      <TemplateComponent data={data as typeof sampleData} />
    </motion.div>
  );
};

export default TemplatePreview;
