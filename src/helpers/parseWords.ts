import { FromPTtoUM, IWord } from "../database/IWord";

export function parseWords(words: IWord<FromPTtoUM[]>[]) {
  let parsed = words.map((word) => {
    word.um = word.um.replaceAll(";", ",");

    return word;
  });

  return parsed;
}
