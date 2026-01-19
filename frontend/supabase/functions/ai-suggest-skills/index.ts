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
    const { title, currentSkills, industry } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert career advisor who knows the most in-demand skills across industries. Suggest relevant, trending skills that will help someone get hired. Return a JSON object with this structure:
{
  "suggested": ["array of 8-10 highly relevant skills"],
  "trending": ["array of 3-4 emerging/trending skills in the field"],
  "categories": {
    "technical": ["technical skills"],
    "soft": ["soft skills"],
    "tools": ["tools and platforms"]
  }
}`;

    const userPrompt = `Suggest skills for a ${title || "professional"} in the ${industry || "technology"} industry.
Current skills: ${currentSkills?.join(", ") || "None listed yet"}

Focus on skills that:
1. Are highly valued by employers in 2024-2025
2. Complement their existing skills
3. Are specific and searchable (not vague terms)`;

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
      throw new Error("Skill suggestion failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    
    let skillsData;
    try {
      skillsData = JSON.parse(content);
    } catch {
      skillsData = {
        suggested: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL"],
        trending: ["AI/ML", "LLM Integration", "Cloud Architecture"],
        categories: {
          technical: ["JavaScript", "Python", "SQL"],
          soft: ["Leadership", "Communication", "Problem Solving"],
          tools: ["Git", "Jira", "Figma"],
        },
      };
    }

    return new Response(JSON.stringify(skillsData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-suggest-skills:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
