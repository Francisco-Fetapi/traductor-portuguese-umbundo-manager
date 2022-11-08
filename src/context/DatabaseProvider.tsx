import { createContext, useEffect, useState } from "react";
import { IConversation } from "../database/IConversation";
import { FromPTtoUM, IWord } from "../database/IWord";
import wordsJson from "../database/words.json";
import conversationsJson from "../database/conversations.json";
import { parseWords } from "../helpers/parseWords";
import { v4 } from "uuid";

export type IWords = IWord<FromPTtoUM[]>[];

interface IDatabaseContext {
  words: IWords;
  conversations: IConversation[];
}

export const DatabaseContext = createContext<Partial<IDatabaseContext>>({});

export interface DatabaseProviderProps {
  children: React.ReactNode;
}

export default function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [words, setWords] = useState<IWords>([]);
  const [conversations, setConversations] = useState<IConversation[]>([]);

  useEffect(() => {
    const wordsJsonWithId = wordsJson.map((word) => {
      return { ...word, id: v4() };
    });
    setWords(parseWords(wordsJsonWithId as IWords));
  }, []);
  useEffect(() => {
    setConversations(conversationsJson);
  }, []);

  return (
    <DatabaseContext.Provider value={{ words, conversations }}>
      {children}
    </DatabaseContext.Provider>
  );
}
