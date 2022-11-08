import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import firebaseConfig from "../firebase.json";

import {
  DatabaseContext,
  DatabaseProviderProps,
  IWords,
} from "./DatabaseProvider";
import { parseWords } from "../helpers/parseWords";
import { IConversation } from "../database/IConversation";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default function FireBaseProvider({ children }: DatabaseProviderProps) {
  const [words, setWords] = useState<IWords>([]);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [fWords, fwordsLoading, fwordsError] = useCollection(
    collection(db, "words"),
    {}
  );

  useEffect(() => {
    if (!fwordsLoading && fWords) {
      const newWords = fWords.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(newWords);
      // setWords(newWords as IWords);
      setWords(parseWords(newWords as IWords));
    }
  }, [fWords]);

  return (
    <DatabaseContext.Provider value={{ words, conversations }}>
      {children}
    </DatabaseContext.Provider>
  );
}
