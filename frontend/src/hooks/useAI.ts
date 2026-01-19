import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GenerateContext {
  fullName?: string;
  title?: string;
  industry?: string;
  yearsExperience?: string;
  skills?: string[];
  company?: string;
  role?: string;
  duration?: string;
  projectName?: string;
  projectType?: string;
  technologies?: string[];
}

interface ResumeData {
  fullName?: string;
  title?: string;
  summary?: string;
  location?: string;
  industry?: string;
  experience?: Array<{ company: string; role: string; duration: string; description: string }>;
  education?: Array<{ institution: string; degree: string; year: string }>;
  skills?: string[];
  projects?: Array<{ name: string; description: string; link: string }>;
}

interface ScoreResult {
  overallScore: number;
  categories: {
    content: { score: number; feedback: string };
    design: { score: number; feedback: string };
    seo: { score: number; feedback: string };
    completeness: { score: number; feedback: string };
    impact: { score: number; feedback: string };
  };
  strengths: string[];
  improvements: string[];
  industryBenchmark: string;
}

interface SkillSuggestions {
  suggested: string[];
  trending: string[];
  categories: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
}

interface StyleRecommendation {
  recommended: {
    name: string;
    description: string;
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    fontPrimary: string;
    fontSecondary: string;
    style: string;
  };
  alternatives: Array<{
    name: string;
    description: string;
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    fontPrimary: string;
    fontSecondary: string;
    style: string;
  }>;
  tips: string[];
}

interface SEOResult {
  score: number;
  title: string;
  metaDescription: string;
  keywords: string[];
  headings: {
    h1: string;
    h2s: string[];
  };
  recommendations: Array<{
    priority: string;
    issue: string;
    fix: string;
  }>;
}

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async (type: string, context: GenerateContext): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-generate", {
        body: { type, context },
      });

      if (error) throw error;
      return data?.content || null;
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate content. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const scoreResume = async (Resume: ResumeData): Promise<ScoreResult | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-score", {
        body: { Resume },
      });

      if (error) throw error;
      return data as ScoreResult;
    } catch (error) {
      console.error("Resume scoring error:", error);
      toast.error("Failed to score Resume. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const suggestSkills = async (
    title: string,
    currentSkills: string[],
    industry: string
  ): Promise<SkillSuggestions | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-suggest-skills", {
        body: { title, currentSkills, industry },
      });

      if (error) throw error;
      return data as SkillSuggestions;
    } catch (error) {
      console.error("Skill suggestion error:", error);
      toast.error("Failed to get skill suggestions. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getStyleRecommendation = async (
    title: string,
    industry: string,
    personality: string
  ): Promise<StyleRecommendation | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-style", {
        body: { title, industry, personality },
      });

      if (error) throw error;
      return data as StyleRecommendation;
    } catch (error) {
      console.error("Style recommendation error:", error);
      toast.error("Failed to get style recommendations. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const optimizeSEO = async (Resume: ResumeData): Promise<SEOResult | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-seo", {
        body: { Resume },
      });

      if (error) throw error;
      return data as SEOResult;
    } catch (error) {
      console.error("SEO optimization error:", error);
      toast.error("Failed to optimize SEO. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateContent,
    scoreResume,
    suggestSkills,
    getStyleRecommendation,
    optimizeSEO,
  };
};

export type { GenerateContext, ResumeData, ScoreResult, SkillSuggestions, StyleRecommendation, SEOResult };
