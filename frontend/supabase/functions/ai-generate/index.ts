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
    const { type, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "summary":
        systemPrompt = `You are an expert professional resume and Resume writer. You write compelling, concise, and impactful professional summaries that highlight key strengths and achievements. Write in first person, be confident but not arrogant, and focus on measurable impact.`;
        userPrompt = `Write a compelling professional summary (3-4 sentences) for someone with this profile:
Name: ${context.fullName || "Professional"}
Title: ${context.title || "Professional"}
Industry: ${context.industry || "Technology"}
Experience: ${context.yearsExperience || "Several"} years
Key skills: ${context.skills?.join(", ") || "Various professional skills"}

Make it impactful, specific, and tailored to their industry. Focus on value they bring.`;
        break;

      case "experience":
        systemPrompt = `You are an expert resume writer who excels at describing professional experience with impact. Use action verbs, quantify achievements where possible, and focus on results.`;
        userPrompt = `Write 3-4 bullet points describing achievements and responsibilities for this role:
Company: ${context.company || "Company"}
Role: ${context.role || "Professional Role"}
Industry: ${context.industry || "Technology"}
Duration: ${context.duration || "2+ years"}

Be specific, use metrics where appropriate, and highlight leadership and impact.`;
        break;

      case "project":
        systemPrompt = `You are an expert at describing technical and creative projects in a compelling way. Focus on the problem solved, technologies used, and impact achieved.`;
        userPrompt = `Write a compelling project description (2-3 sentences) for:
Project Name: ${context.projectName || "Project"}
Type: ${context.projectType || "Software project"}
Technologies: ${context.technologies?.join(", ") || "Modern technologies"}

Highlight the problem solved, approach taken, and results achieved.`;
        break;

      case "skills-enhance":
        systemPrompt = `You are an expert at articulating professional skills. Transform basic skill names into more impressive, industry-standard terminology.`;
        userPrompt = `Enhance these skills to sound more professional and impactful for a ${context.title || "professional"} role:
Skills: ${context.skills?.join(", ") || ""}

Return as a JSON array of enhanced skill names.`;
        break;

      default:
        throw new Error("Invalid generation type");
    }

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
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-generate:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
