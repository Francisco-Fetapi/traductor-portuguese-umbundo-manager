import { createContext, useEffect, useState } from "react";
import { FromPTtoUM, IWord } from "../database/IWord";
import wordsJson from "../database/words.json";

type IWords = IWord<FromPTtoUM[]>[];

interface IDatabaseContext {
  words: IWords;
}

export const DatabaseContext = createContext<Partial<IDatabaseContext>>({});

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export default function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [words, setWords] = useState<IWords>([]);

  useEffect(() => {
    setWords(wordsJson as IWords);
  }, []);

  return (
    <DatabaseContext.Provider value={{ words }}>
      {children}
    </DatabaseContext.Provider>
  );
}
