import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore";

import firebaseConfig from "./firebase.json";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const wordsCollection = collection(db, "words");

export async function getWords() {
  const wordsSnapshot = await getDocs(wordsCollection);
  const wordsList = wordsSnapshot.docs.map((doc) => doc.data());
  return wordsList;
}
