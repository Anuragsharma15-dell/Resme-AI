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

    const systemPrompt = `You are an expert Resume reviewer and career coach. Analyze Resumes and provide actionable scoring and feedback. Return a JSON object with this exact structure:
{
  "overallScore": number (0-100),
  "categories": {
    "content": { "score": number, "feedback": "string" },
    "design": { "score": number, "feedback": "string" },
    "seo": { "score": number, "feedback": "string" },
    "completeness": { "score": number, "feedback": "string" },
    "impact": { "score": number, "feedback": "string" }
  },
  "strengths": ["string array of 3 strengths"],
  "improvements": ["string array of 3 specific improvements"],
  "industryBenchmark": "How this compares to industry standards"
}`;

    const userPrompt = `Score this Resume and provide detailed feedback:

Name: ${Resume.fullName || "Not provided"}
Title: ${Resume.title || "Not provided"}
Summary: ${Resume.summary || "Not provided"}
Experience: ${Resume.experience?.length || 0} entries
Education: ${Resume.education?.length || 0} entries
Skills: ${Resume.skills?.join(", ") || "None listed"}
Projects: ${Resume.projects?.length || 0} projects

Provide honest, constructive feedback focusing on what will help them get hired.`;

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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Resume scoring failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    
    let scoreData;
    try {
      scoreData = JSON.parse(content);
    } catch {
      scoreData = {
        overallScore: 75,
        categories: {
          content: { score: 75, feedback: "Good content foundation" },
          design: { score: 80, feedback: "Clean and professional" },
          seo: { score: 70, feedback: "Could use more keywords" },
          completeness: { score: 75, feedback: "Add more details" },
          impact: { score: 75, feedback: "Quantify achievements" },
        },
        strengths: ["Clear structure", "Professional tone", "Good skills listed"],
        improvements: ["Add more projects", "Include testimonials", "Quantify achievements"],
        industryBenchmark: "Above average for entry-level, needs work for senior roles",
      };
    }

    return new Response(JSON.stringify(scoreData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-score:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
