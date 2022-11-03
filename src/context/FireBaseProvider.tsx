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

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default function FireBaseProvider({ children }: DatabaseProviderProps) {
  const [words, setWords] = useState<IWords>([]);
  const [conversations, setConversations] = useState([]);
  const [fWords, fwordsLoading, fwordsError] = useCollection(
    collection(db, "words"),
    {}
  );

  useEffect(() => {
    if (!fwordsLoading && fWords) {
      const newWords = fWords.docs.map((doc) => {
        return { ...doc.data() };
      });
      console.log(newWords);
      setWords(newWords as IWords);
    }
  }, [fWords]);

  return (
    <DatabaseContext.Provider value={{ words, conversations }}>
      {children}
    </DatabaseContext.Provider>
  );
}
