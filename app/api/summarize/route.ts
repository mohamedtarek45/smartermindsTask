import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "system", content: "You are an assistant summarizing GitHub profiles." },
        { role: "user", content: prompt },
      ],
    });

    return Response.json({ summary: completion.choices[0].message?.content ?? "" });
  } catch (error: unknown) {

    if (error instanceof Error) {
      return Response.json({ status: "error", message: error.message });
    }
  
    return Response.json({ status: "error", message: "Rate limit exceeded. Please try again later." });
  }
}
