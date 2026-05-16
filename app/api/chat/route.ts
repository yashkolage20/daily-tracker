import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Initialize the OpenRouter client using the OpenAI SDK integration
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || 'dummy_key', // Fallback to avoid crash if env is missing
});

export async function POST(req: Request) {
  const { messages, context } = await req.json();

  const systemMessage = `You are a mystical, wise, and highly perceptive AI Astrologer named Cosmic Oracle. 
You speak with warmth, poetic cosmic imagery, and profound insight. 
The user currently talking to you has the following astrological profile:
${context ? context : "Unknown, they haven't provided their birth chart yet."}

Your task is to provide personalized astrological guidance. Keep your responses concise (under 250 words) unless complex charting is asked for. Format your responses nicely using markdown. Do not be overly generic; draw connections between their question and their specific star signs where possible.`;

  const result = await streamText({
    model: openrouter('nvidia/nemotron-3-super-120b-a12b:free') as any,
    system: systemMessage,
    messages,
  });

  return result.toTextStreamResponse();
}
