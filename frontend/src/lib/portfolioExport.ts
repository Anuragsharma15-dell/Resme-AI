import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface PortfolioData {
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

export interface ThemeSettings {
  themeColor: string;
  fontFamily: string;
  template: string;
}

const templateThemes: Record<string, { bg: string; text: string; accent: string; muted: string; card: string; border: string }> = {
  "modern-dark": {
    bg: "#0a0a0f",
    text: "#fafafa",
    accent: "#8B5CF6",
    muted: "#a1a1aa",
    card: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.1)",
  },
  "classic-bw": {
    bg: "#ffffff",
    text: "#1a1a1a",
    accent: "#1a1a1a",
    muted: "#6b7280",
    card: "#f9fafb",
    border: "#e5e7eb",
  },
  "clean-light": {
    bg: "#f9fafb",
    text: "#1a1a1a",
    accent: "#2563eb",
    muted: "#6b7280",
    card: "#ffffff",
    border: "#e5e7eb",
  },
  "creative-gradient": {
    bg: "linear-gradient(135deg, #581c87 0%, #312e81 50%, #831843 100%)",
    text: "#ffffff",
    accent: "#f472b6",
    muted: "#d1d5db",
    card: "rgba(255,255,255,0.1)",
    border: "rgba(255,255,255,0.2)",
  },
  "minimal-pro": {
    bg: "#fafaf9",
    text: "#1c1917",
    accent: "#1c1917",
    muted: "#78716c",
    card: "#ffffff",
    border: "#e7e5e4",
  },
  "developer-code": {
    bg: "#1e1e1e",
    text: "#d4d4d4",
    accent: "#4ade80",
    muted: "#9ca3af",
    card: "#252526",
    border: "#3e3e42",
  },
  "tech-stack": {
    bg: "#0f172a",
    text: "#f8fafc",
    accent: "#22d3ee",
    muted: "#94a3b8",
    card: "#1e293b",
    border: "#334155",
  },
  "executive": {
    bg: "#f5f5f4",
    text: "#1c1917",
    accent: "#d97706",
    muted: "#78716c",
    card: "#ffffff",
    border: "#e7e5e4",
  },
};

export const generateHTML = (data: PortfolioData, template: string = "modern-dark", theme?: ThemeSettings): string => {
  const activeTemplate = theme?.template || template;
  const themeColor = theme?.themeColor || "#8B5CF6";
  const fontFamily = theme?.fontFamily || "Inter";
  const colors = templateThemes[activeTemplate] || templateThemes["modern-dark"];
  
  const isGradientBg = colors.bg.includes("gradient");
  const bgStyle = isGradientBg ? `background: ${colors.bg};` : `background-color: ${colors.bg};`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${data.title} - ${data.fullName}'s Professional Portfolio">
  <title>${data.fullName} | ${data.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, "+")}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: '${fontFamily}', sans-serif; 
      line-height: 1.6; 
      ${bgStyle}
      color: ${colors.text};
      min-height: 100vh;
    }
    .portfolio-container { 
      max-width: 900px; 
      margin: 0 auto; 
      padding: 60px 40px; 
    }
    .header { 
      text-align: center; 
      margin-bottom: 48px; 
    }
    .avatar {
      width: 128px;
      height: 128px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid ${themeColor};
      margin: 0 auto 24px;
      display: block;
    }
    .avatar-placeholder {
      width: 128px;
      height: 128px;
      border-radius: 50%;
      background: ${colors.card};
      border: 4px solid ${themeColor};
      margin: 0 auto 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-placeholder svg {
      width: 64px;
      height: 64px;
      color: ${themeColor};
    }
    .name { 
      font-size: 2.5rem; 
      font-weight: 700; 
      margin-bottom: 8px; 
      color: ${themeColor};
    }
    .title { 
      font-size: 1.25rem; 
      color: ${colors.muted}; 
      margin-bottom: 20px; 
    }
    .contact-info { 
      display: flex; 
      gap: 20px; 
      justify-content: center; 
      flex-wrap: wrap; 
      margin-bottom: 16px; 
    }
    .contact-info span { 
      font-size: 0.9rem; 
      color: ${colors.muted};
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .social-links { 
      display: flex; 
      gap: 16px; 
      justify-content: center; 
    }
    .social-links a { 
      font-size: 0.9rem; 
      color: ${themeColor}; 
      text-decoration: none;
    }
    .social-links a:hover {
      opacity: 0.8;
    }
    .section { 
      margin-bottom: 40px; 
    }
    .section h2 { 
      font-size: 1.4rem; 
      font-weight: 600; 
      margin-bottom: 20px; 
      padding-bottom: 8px; 
      border-bottom: 2px solid ${themeColor}; 
      color: ${colors.text};
    }
    .summary { 
      font-size: 1rem; 
      color: ${colors.muted};
      line-height: 1.8;
    }
    .experience-item, .education-item { 
      margin-bottom: 24px; 
    }
    .exp-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      flex-wrap: wrap; 
      gap: 8px; 
      margin-bottom: 4px;
    }
    .exp-header h3 { 
      font-size: 1.1rem; 
      font-weight: 600; 
      color: ${colors.text};
    }
    .duration { 
      font-size: 0.9rem; 
      color: ${colors.muted}; 
    }
    .company { 
      font-weight: 500; 
      margin-bottom: 8px; 
      color: ${themeColor};
    }
    .description { 
      color: ${colors.muted}; 
      font-size: 0.95rem;
    }
    .education-item h3 { 
      font-size: 1.1rem; 
      font-weight: 600; 
      color: ${colors.text};
    }
    .education-item p {
      color: ${colors.muted};
      font-size: 0.95rem;
    }
    .skills-container { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 10px; 
    }
    .skill-tag { 
      padding: 8px 16px; 
      border-radius: 20px; 
      font-size: 0.9rem; 
      background: ${themeColor}20;
      color: ${themeColor};
      font-weight: 500;
    }
    .projects-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
      gap: 20px; 
    }
    .project-card { 
      padding: 24px; 
      border-radius: 12px; 
      background: ${colors.card};
      border: 1px solid ${colors.border};
    }
    .project-card h3 { 
      font-size: 1.1rem; 
      font-weight: 600; 
      margin-bottom: 8px; 
      color: ${colors.text};
    }
    .project-card p { 
      color: ${colors.muted}; 
      margin-bottom: 12px; 
      font-size: 0.95rem;
    }
    .project-card a { 
      font-weight: 500; 
      color: ${themeColor}; 
      text-decoration: none;
    }
    .project-card a:hover {
      opacity: 0.8;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .portfolio-container { padding: 40px 30px; }
    }
  </style>
</head>
<body>
  <div class="portfolio-container">
    <header class="header">
      ${data.avatarUrl ? `<img src="${data.avatarUrl}" alt="${data.fullName}" class="avatar" />` : `
      <div class="avatar-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      `}
      <h1 class="name">${data.fullName || "Your Name"}</h1>
      <p class="title">${data.title || "Your Professional Title"}</p>
      <div class="contact-info">
        ${data.email ? `<span>📧 ${data.email}</span>` : ""}
        ${data.phone ? `<span>📱 ${data.phone}</span>` : ""}
        ${data.location ? `<span>📍 ${data.location}</span>` : ""}
      </div>
      <div class="social-links">
        ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">LinkedIn</a>` : ""}
        ${data.github ? `<a href="${data.github}" target="_blank">GitHub</a>` : ""}
        ${data.website ? `<a href="${data.website}" target="_blank">Website</a>` : ""}
      </div>
    </header>

    ${data.summary ? `
    <section class="section">
      <h2>About</h2>
      <p class="summary">${data.summary}</p>
    </section>
    ` : ""}

    ${data.experience.length > 0 && data.experience[0].company ? `
    <section class="section">
      <h2>Experience</h2>
      ${data.experience.filter(exp => exp.company).map(exp => `
        <div class="experience-item">
          <div class="exp-header">
            <h3>${exp.role || "Role"}</h3>
            <span class="duration">${exp.duration}</span>
          </div>
          <p class="company">${exp.company}</p>
          ${exp.description ? `<p class="description">${exp.description}</p>` : ""}
        </div>
      `).join("")}
    </section>
    ` : ""}

    ${data.education.length > 0 && data.education[0].institution ? `
    <section class="section">
      <h2>Education</h2>
      ${data.education.filter(edu => edu.institution).map(edu => `
        <div class="education-item">
          <h3>${edu.degree || "Degree"}</h3>
          <p>${edu.institution} • ${edu.year}</p>
        </div>
      `).join("")}
    </section>
    ` : ""}

    ${data.skills.length > 0 ? `
    <section class="section">
      <h2>Skills</h2>
      <div class="skills-container">
        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join("")}
      </div>
    </section>
    ` : ""}

    ${data.projects.length > 0 && data.projects[0].name ? `
    <section class="section">
      <h2>Projects</h2>
      <div class="projects-grid">
        ${data.projects.filter(proj => proj.name).map(project => `
          <div class="project-card">
            <h3>${project.name}</h3>
            ${project.description ? `<p>${project.description}</p>` : ""}
            ${project.link ? `<a href="${project.link}" target="_blank">View Project →</a>` : ""}
          </div>
        `).join("")}
      </div>
    </section>
    ` : ""}
  </div>
</body>
</html>`;
};

export const exportToPDF = async (element: HTMLElement, filename: string = "portfolio.pdf", template: string = "modern-dark"): Promise<void> => {
  try {
    const colors = templateThemes[template] || templateThemes["modern-dark"];
    const isGradientBg = colors.bg.includes("gradient");
    const bgColor = isGradientBg ? "#0a0a0f" : colors.bg;
    
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.width = '800px';
    clone.style.height = 'auto';
    clone.style.overflow = 'visible';
    document.body.appendChild(clone);
    
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: bgColor,
      windowWidth: 800,
      height: clone.scrollHeight,
      scrollY: 0,
      scrollX: 0,
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
};

export const downloadHTML = (html: string, filename: string = "portfolio.html"): void => {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyShareableLink = async (portfolioId: string): Promise<string> => {
  const link = `${window.location.origin}/portfolio/${portfolioId}`;
  await navigator.clipboard.writeText(link);
  return link;
};
