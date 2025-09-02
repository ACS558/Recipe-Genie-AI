import { Mistral } from "@mistralai/mistralai";
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients 
that a user has and suggests a recipe they could 
make with some or all of those ingredients. 
You don't need to use every ingredient they 
mention in your recipe. The recipe can include additional 
ingredients they didn't mention, but try not to include 
too many extra ingredients. Format your response in markdown to
 make it easier to render to a web page.
`;
const client = new Mistral({
  apiKey: import.meta.env.VITE_MISTRAL_API_KEY,
});
export async function getRecipeFromMistral(ingredientsArr, recipeName = "") {
  const ingredientsString = ingredientsArr.join(", ");
  const userPrompt =
    recipeName && recipeName.trim() !== ""
      ? `I have ${ingredientsString}. Please give me a recipe named "${recipeName}" that I could make!`
      : `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;
  try {
    const response = await client.chat.complete({
      model: "mistral-small-2503",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_tokens: 1024,
    });
    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message?.content ?? "";
    }
    if (response.generated_text) {
      return response.generated_text;
    }
    console.warn("Unexpected response format:", response);
    return "Sorry, I couldn’t generate a recipe.";
  } catch (err) {
    console.error("Error from Mistral AI:", err);
    return "Oops, something went wrong.";
  }
}
