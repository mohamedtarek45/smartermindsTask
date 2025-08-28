import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  console.log("is it new ");
  try{

      const completion = await client.chat.completions.create({
          model: "deepseek/deepseek-r1:free",
          messages: [
              { role: "system",  content: "You are an assistant summarizing GitHub profiles."  },
              { role: "user", content: prompt },
            ],
        });
        return Response.json({ summary: completion.choices[0].message.content });
    }
    catch(e){
      return Response.json({ status: e.code, message: "Rate limit exceeded. Please try again later." });
    }

}
