import {useState} from "react";
import { GoogleGenAI } from "@google/genai";
import { googleAiApiKey } from "src/config-global";

export const useGoogleAi = () => {
  const [aiWait, setAiWait] = useState(false);
  const [aiError, setAiError] = useState('');
  const ai = new GoogleGenAI({apiKey: googleAiApiKey});

  const generateDescription = async (input) => {
    if (input !== '') {
      setAiWait(true);
      try {
        const response = await ai.models.generateContent({
                                                           model: "gemini-2.5-flash",
                                                           contents: `Write short about ${input} in a few words`,
                                                         });
        setAiWait(false);
        return(response.text);
      } catch(er) {
        setAiError('Error while Generating')
        setAiWait(false);
      }
    }

  };

  return{
    generateDescription,
    aiWait,
    aiError
  }
};
