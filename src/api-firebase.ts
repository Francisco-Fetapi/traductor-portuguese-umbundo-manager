import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { FromPTtoUM, IWord } from "./database/IWord";

import firebaseConfig from "./firebase.json";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getWords() {
  const wordsSnapshot = await getDocs(collection(db, "words"));
  const wordsList = wordsSnapshot.docs.map((doc) => doc.data());
  return wordsList;
}

export async function setWord(word: IWord<FromPTtoUM[]>) {
  const wordsCollection = collection(db, "words");

  const wordsRef = doc(wordsCollection);

  let getSameWord = query(wordsCollection, where("pt", "==", word.pt));
  const querySnapshot = await getDocs(getSameWord);

  if (querySnapshot.size == 0) {
    return await setDoc(wordsRef, word);
  }

  throw new Error("A palavra que está tentando cadastrar já existe!");
}
