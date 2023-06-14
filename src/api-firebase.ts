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
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { IConversation } from "./database/IConversation";
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

export async function deleteWord(id: string) {
  // const wordsCollection = collection(db, "words");
  const docRef = doc(db, "words", id);
  try {
    await deleteDoc(docRef);
  } catch (e: any) {
    return new Error(
      "Erro ao apagar esta palavra. Ela pode já ter sido apagada antes, ou sua conexão com a internet falhou."
    );
  }
}
export async function updateWord(id: string, data: any) {
  // const wordsCollection = collection(db, "words");
  const docRef = doc(db, "words", id);
  console.log(docRef);
  try {
    delete data.id;
    console.log(data);
    await updateDoc(docRef, data);
  } catch (e: any) {
    return new Error(
      "Erro ao editar esta palavra. Ela pode já ter sido apagada antes, ou sua conexão com a internet falhou."
    );
  }
}

export async function getConversations() {
  const wordsSnapshot = await getDocs(collection(db, "conversations"));
  const wordsList = wordsSnapshot.docs.map((doc) => doc.data());
  return wordsList;
}

export async function setConversation(conversation: IConversation) {
  const conversationsCollection = collection(db, "conversations");

  const conversationsRef = doc(conversationsCollection);

  let getSameConversation = query(
    conversationsCollection,
    where("topic", "==", conversation.topic)
  );
  const querySnapshot = await getDocs(getSameConversation);

  if (querySnapshot.size == 0) {
    return await setDoc(conversationsRef, conversation);
  }
  const docRef = doc(db, "conversations", conversation.id!);
  // delete conversation.id;
  await updateDoc(docRef, conversation);
  console.log("updated");
  // throw new Error("A palavra que está tentando cadastrar já existe!");
}

export async function deleteConversation(id: string) {
  const docRef = doc(db, "conversations", id);
  try {
    await deleteDoc(docRef);
  } catch (e: any) {
    return new Error(
      "Erro ao apagar este tópico. Ele pode já ter sido apagada antes, ou sua conexão com a internet falhou."
    );
  }
}
