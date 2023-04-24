import { NextApiResponse, NextApiRequest } from "next";
import { OpenAI } from "langchain/llms/openai";
import {
  PromptTemplate,
  LengthBasedExampleSelector,
  FewShotPromptTemplate,
} from "langchain/prompts";
import { examples } from "./examples";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    if (req.method !== "POST") {
      res.status(405).send("");
      return;
    }

    const llm = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.0,
    });

    // --- --- ---

    const formatted_template = `
    Can you return an array of objects as a JSON formatted string that are geographically relevant to an arbitrary query?
    REQUIREMENTS:
    - Each object in the array should contain 3 keys
    - lon is the longitude of the coords for each match to the query
    - lat is the latitude of the coords for each match to the query
    - blurb is the 1-3 sentence answer to the query along with information about the environmental concerns of the city or region in which the coords exist
    - The array should be max length 3
    - the overall length of the answer should be maximum 500 characters and a fully parsable JSON string
    - if you cannot provide accurate information then please provide your best guess along with a disclaimer
    
    The arbitrary query is below\n {query}\n{answer}\n
    `;

    const prompt_tmplt = new PromptTemplate({
      inputVariables: ["query", "answer"],
      template: formatted_template,
    });

    // --- --- ---

    const prompt_selector = new LengthBasedExampleSelector({
      examplePrompt: prompt_tmplt,
    });

    prompt_selector.addExample({
      query: "What cities in the world flood the most?",
      answer:
        '[{{"lon":90.4074,"lat":23.7104,"blurb":"Dhaka, Bangladesh is one of the most flood-prone cities in the world. Situated in the delta region of the Ganges-Brahmaputra-Meghna river system, the city is highly susceptible to flooding due to heavy monsoon rains and rising sea levels. Climate change has exacerbated this problem, leading to more intense rainfall and higher flood risks for the city\'s inhabitants."}}]',
    });

    prompt_selector.addExample({
      query: "What is the hottest place on Earth?",
      answer:
        '[{{"lon":30.482,"lat":15.775,"blurb":"Lut Desert, Iran, holds the record for the highest temperature ever recorded on Earth. The surface temperature reached a staggering 159.3°F (70.7°C) in 2005. The region is characterized by a lack of vegetation, extreme aridity, and harsh living conditions. The primary environmental concern in the Lut Desert is desertification, which exacerbates water scarcity and threatens the fragile ecosystems."}}]',
    });

    // --- --- ---

    const dynamic_prompt = new FewShotPromptTemplate({
      examplePrompt: prompt_tmplt,
      exampleSelector: prompt_selector,
      prefix: "Answer each query",
      suffix: "Query: {input}\n",
      inputVariables: ["input"],
      exampleSeparator: "\n\n",
    });

    const prompt = await dynamic_prompt.format({ input: req.body.prompt });
    const resp = await llm.call(prompt);
    res.status(200).send(resp);
  } catch (e) {
    res.status(500).send("ERROR");
  }
}
