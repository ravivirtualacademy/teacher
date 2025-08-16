
import { GoogleGenAI, Type } from "@google/genai";
import type { ResearchPaper } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const researchPaperSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'A concise and informative title for the paper.' },
    abstract: { type: Type.STRING, description: "A brief summary of the paper's purpose, methods, key findings, and conclusions (around 150-250 words)." },
    introduction: { type: Type.STRING, description: 'Background information, problem statement, research questions, and the significance of the study.' },
    literatureReview: { type: Type.STRING, description: 'A summary and synthesis of existing research relevant to the topic.' },
    methodology: { type: Type.STRING, description: 'A plausible, detailed description of the research methods, data collection, and analysis techniques that would be used for such a study.' },
    results: { type: Type.STRING, description: 'A presentation of the key findings. This should include plausible data or findings that logically follow from the proposed methodology.' },
    discussion: { type: Type.STRING, description: 'An interpretation of the results, their implications, limitations of the study, and suggestions for future research.' },
    conclusion: { type: Type.STRING, description: 'A summary of the main points and the final thoughts on the topic.' },
    references: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of 5-10 credible, relevant, and properly formatted academic references. These can be fictional but must appear realistic.'
    }
  },
  required: ['title', 'abstract', 'introduction', 'literatureReview', 'methodology', 'results', 'discussion', 'conclusion', 'references']
};

export async function generateResearchPaper(topic: string): Promise<ResearchPaper> {
  const prompt = `
    You are an expert academic researcher and writer. Your task is to generate a comprehensive, well-structured research paper on the following topic: "${topic}".

    The paper must be written in a formal, academic tone and must include all the sections defined in the provided JSON schema.
    
    The content for each section should be detailed, coherent, and logically structured. For the methodology and results, generate plausible information as if this were a real study. The references should be formatted consistently (e.g., APA style) and look realistic, even if fictional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: researchPaperSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as ResearchPaper;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to parse or receive valid data from the AI model.");
  }
}
