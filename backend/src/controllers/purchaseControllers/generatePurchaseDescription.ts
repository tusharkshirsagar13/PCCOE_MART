import { Request, Response } from "express";
import axios from "axios";

export const generatePurchaseDescription = async (req: Request, res: Response) => {
  const { shortDescription } = req.body;

  if (!shortDescription || typeof shortDescription !== "string") {
    return res.status(400).json({ error: "Invalid or missing shortDescription." });
  }

  const messages = [
    {
      role: "system",
      content: `
You are an AI assistant for a college buy/sell app.

Your job is to:
- Generate a product description using only the user's input **if** it is a valid list of keywords (e.g., "black jacket medium size denim").
- If the input is NOT a list of 3–10 relevant product keywords, you MUST respond with this exact sentence and nothing else:

"The input is out of context. Please provide valid keywords."

Do NOT generate explanations.
Do NOT describe unrelated concepts.
Do NOT try to be helpful.
Do NOT add any assumptions.
Do NOT continue the conversation.
Just check the input and respond accordingly.
`.trim()
    },
    {
      role: "user",
      content: `Input: ${shortDescription}`
    }
  ];


  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiContent = response.data.choices[0]?.message?.content?.replace(/\s+/g, " ").trim();

    if (!aiContent) {
      return res.status(500).json({ error: "No response from AI." });
    }

    return res.status(200).json({ detailedDescription: aiContent });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Something went wrong" });
  }
};
