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
    const { title, industry, personality } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert UX designer and brand strategist. Recommend visual styles for professional Resumes based on industry and role. Return a JSON object with this structure:
{
  "recommended": {
    "name": "Style name",
    "description": "Why this works for them",
    "primaryColor": "hex color",
    "accentColor": "hex color",
    "backgroundColor": "hex color",
    "fontPrimary": "font name",
    "fontSecondary": "font name",
    "style": "minimal" | "bold" | "creative" | "corporate" | "elegant"
  },
  "alternatives": [
    { same structure as recommended }
  ],
  "tips": ["3 styling tips specific to their industry"]
}`;

    const userPrompt = `Recommend visual styling for a ${title || "professional"} Resume in the ${industry || "technology"} industry.
Personality preference: ${personality || "professional and modern"}

Consider:
1. Industry expectations and norms
2. Current design trends for Resumes
3. Readability and accessibility
4. What will appeal to hiring managers in their field`;

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
      throw new Error("Style recommendation failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    
    let styleData;
    try {
      styleData = JSON.parse(content);
    } catch {
      styleData = {
        recommended: {
          name: "Modern Professional",
          description: "Clean, sophisticated design that conveys competence",
          primaryColor: "#8B5CF6",
          accentColor: "#06B6D4",
          backgroundColor: "#0F0F0F",
          fontPrimary: "Inter",
          fontSecondary: "JetBrains Mono",
          style: "minimal",
        },
        alternatives: [
          {
            name: "Bold Creative",
            description: "Stand out with confident color choices",
            primaryColor: "#F97316",
            accentColor: "#EC4899",
            backgroundColor: "#18181B",
            fontPrimary: "Space Grotesk",
            fontSecondary: "Inter",
            style: "bold",
          },
        ],
        tips: [
          "Use whitespace generously to improve readability",
          "Limit your color palette to 2-3 colors max",
          "Choose fonts that work well at different sizes",
        ],
      };
    }

    return new Response(JSON.stringify(styleData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-style:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
