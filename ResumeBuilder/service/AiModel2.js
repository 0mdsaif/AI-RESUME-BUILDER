import OpenAI from "openai";

const openAI = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-291fd1962f4b47908a8fd341fc61dd5e',
    dangerouslyAllowBrowser: true,
  });

const generationConfig = {
    responseMimeType: "application/json",
  };

export const AIchatSession = await openAI.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
    generationConfig,
      history: [
      ],
  });

  console.log(completion.choices[0].message.content);