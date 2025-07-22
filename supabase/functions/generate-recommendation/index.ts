import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Recommendation function called:', req.method);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Request body:', body);
    
    const { mealType, answers, baseRecommendation } = body;

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create a prompt based on the user's answers and meal type
    const answersText = Object.entries(answers)
      .filter(([key, value]) => key !== 'mealType')
      .map(([key, value]) => value)
      .join(', ');

    const prompt = `Based on a user's food preferences quiz, provide a specific food recommendation.

User chose: ${mealType}
User's preferences: ${answersText}
Base category: ${baseRecommendation.category}

Provide a specific, detailed food recommendation that matches their preferences. For example:
- If ice cream: specify flavor combinations, toppings, or style (e.g., "Salted Caramel Gelato with Dark Chocolate Chunks")
- If full meal: specify cuisine and dish (e.g., "Korean BBQ Bulgogi with Kimchi")
- If breakfast: specify dish and style (e.g., "Fluffy Buttermilk Pancakes with Fresh Berries")

Return ONLY a JSON object with this structure:
{
  "title": "Specific Food Name",
  "description": "Brief description of why this matches their preferences",
  "searchTerm": "Simple search term for maps/delivery apps"
}`;

    console.log('Making OpenAI request for recommendation');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a food expert who provides specific, personalized food recommendations based on user preferences. Always return valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    console.log('OpenAI response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      return new Response(JSON.stringify({ error: 'OpenAI API error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('OpenAI response data:', data);
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error('No content in OpenAI response');
      return new Response(JSON.stringify({ error: 'No content from OpenAI' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('Returning recommendation:', content);
    return new Response(JSON.stringify({ 
      recommendation: content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-recommendation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});