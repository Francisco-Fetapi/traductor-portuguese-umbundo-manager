import words from "../database/words.json";
import { IWord } from "../database/IWord";

export function all() {
  return words as unknown as IWord[];
}

export function alreadyExists(word: string) {
  return words.some((w) => w.pt.toLowerCase() === word.toLowerCase());
}
