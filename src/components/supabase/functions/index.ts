import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { type, resumeData, targetRole, targetIndustry, targetCompany, targetPosition } = await req.json();

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'suggestions') {
      systemPrompt = `You are an expert career coach and resume writer. Generate tailored suggestions to improve a resume based on the target role and industry. Be specific, actionable, and professional. Return JSON only.`;
      
      userPrompt = `Based on this resume data and target role, provide suggestions:

Resume Summary: ${resumeData?.personalInfo?.summary || 'None provided'}
Current Skills: ${resumeData?.skills?.map((s: any) => s.name).join(', ') || 'None'}
Experience: ${resumeData?.experiences?.map((e: any) => `${e.position} at ${e.company}`).join('; ') || 'None'}

Target Role: ${targetRole}
Target Industry: ${targetIndustry || 'General'}

Return a JSON object with:
- summary: A compelling 2-3 sentence professional summary tailored to the target role
- skills: Array of 5 relevant skills to add (that aren't already listed)
- achievements: Array of 3 achievement bullet points with metrics`;

    } else if (type === 'cover-letter') {
      systemPrompt = `You are an expert cover letter writer. Create professional, personalized cover letters that highlight relevant experience and show genuine interest in the company.`;
      
      userPrompt = `Write a professional cover letter for:

Applicant Name: ${resumeData?.personalInfo?.fullName || 'the applicant'}
Current Role: ${resumeData?.experiences?.[0]?.position || 'Professional'}
Key Skills: ${resumeData?.skills?.slice(0, 5).map((s: any) => s.name).join(', ') || 'Various professional skills'}
Summary: ${resumeData?.personalInfo?.summary || ''}

Target Company: ${targetCompany}
Target Position: ${targetPosition}

Write a compelling cover letter (3-4 paragraphs) that:
1. Opens with enthusiasm for the specific role
2. Highlights relevant experience and achievements
3. Shows knowledge/interest in the company
4. Closes with a call to action

Return only the cover letter text, properly formatted with paragraphs.`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error('AI gateway error');
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content || '';

    let result;
    if (type === 'suggestions') {
      try {
        // Try to parse JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch {
        // Fallback structure
        result = {
          summary: `Results-driven ${targetRole} with expertise in ${targetIndustry || 'the industry'}. Proven track record of delivering high-quality solutions and driving business outcomes.`,
          skills: ['Leadership', 'Strategic Planning', 'Problem Solving', 'Communication', 'Project Management'],
          achievements: [
            'Increased team productivity by 25% through process improvements',
            'Led cross-functional initiatives resulting in $500K+ cost savings',
            'Delivered projects 20% ahead of schedule while maintaining quality standards',
          ],
        };
      }
    } else if (type === 'cover-letter') {
      result = { content };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in ai-suggestions function:', error);
    const message = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
