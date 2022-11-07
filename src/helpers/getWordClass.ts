import wordsClass from "../database/wordClasses.json";

export default function getWordClass(wordClass: keyof typeof wordsClass) {
  return wordsClass[wordClass];
}
