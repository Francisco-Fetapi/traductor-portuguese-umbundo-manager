import { FromPTtoUM, IWord } from "../database/IWord";

export function parseWords(words: IWord<FromPTtoUM[]>[]) {
  let parsed = words.map((word) => {
    word.um = word.um.replace(/;/g, ",");
    return word;
  });

  parsed = parsed.map((word) => {
    const currentDate = new Date(word.date);

    if (currentDate.getFullYear() <= 2023 || currentDate.getMonth() <= 6)
      return { ...word, date: new Date(2023, 9, 28).toString() };

    return word;
  });

  return parsed;
}
