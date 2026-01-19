import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { Resume } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an SEO expert specializing in personal branding and Resume optimization. Analyze Resumes and provide SEO recommendations. Return a JSON object with this structure:
{
  "score": number (0-100),
  "title": "Optimized page title under 60 chars",
  "metaDescription": "Compelling meta description under 160 chars",
  "keywords": ["array of 10 relevant keywords"],
  "headings": {
    "h1": "Main heading suggestion",
    "h2s": ["3 subheading suggestions"]
  },
  "recommendations": [
    { "priority": "high" | "medium" | "low", "issue": "string", "fix": "string" }
  ],
  "schemaMarkup": {
    "type": "Person",
    "suggestedFields": ["fields to include"]
  }
}`;

    const userPrompt = `Optimize SEO for this Resume:

Name: ${Resume.fullName || "Professional"}
Title: ${Resume.title || "Professional"}
Industry: ${Resume.industry || "Technology"}
Location: ${Resume.location || ""}
Summary: ${Resume.summary || ""}
Skills: ${Resume.skills?.join(", ") || ""}

Provide actionable SEO improvements to help them rank for relevant searches and get discovered by recruiters.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      throw new Error("SEO optimization failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    
    let seoData;
    try {
      seoData = JSON.parse(content);
    } catch {
      const name = Resume.fullName || "Professional";
      const title = Resume.title || "Professional";
      seoData = {
        score: 70,
        title: `${name} | ${title} Resume`,
        metaDescription: `${name} is a ${title} with expertise in modern technologies. View Resume and get in touch.`,
        keywords: ["Resume", title.toLowerCase(), "hire", name.split(" ")[0].toLowerCase()],
        headings: {
          h1: `${name} - ${title}`,
          h2s: ["About Me", "Experience", "Projects"],
        },
        recommendations: [
          { priority: "high", issue: "Missing meta description", fix: "Add the suggested meta description" },
          { priority: "medium", issue: "Lacking keywords", fix: "Include industry-specific terms" },
        ],
        schemaMarkup: {
          type: "Person",
          suggestedFields: ["name", "jobTitle", "url", "sameAs"],
        },
      };
    }

    return new Response(JSON.stringify(seoData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-seo:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
