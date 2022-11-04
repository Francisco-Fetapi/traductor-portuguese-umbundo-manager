import { useContext } from "react";
import { DatabaseContext } from "../context/DatabaseProvider";
import wordClasses from "../database/wordClasses.json";

export default function useDatabase() {
  const { words } = useContext(DatabaseContext);
  const wordsLength = words?.length ?? 0;

  type IWords = typeof words;

  function getWordsByAuthor(author: string) {
    const wordsByAuthor = words?.filter((word) => word.author === author);
    if (!wordsByAuthor) {
      return null;
    }
    return wordsByAuthor;
  }

  const data = {
    words,
    getClass(wordClass: keyof typeof wordClasses) {
      return wordClasses[wordClass];
    },
    getAuthors() {
      const authors: string[] = [];
      data.orderByDate(words)?.forEach((word) => {
        if (!authors.includes(word.author)) {
          authors.push(word.author);
        }
      });

      return authors;
    },
    getLastUpdateByAuthor(author: string) {
      const wordsByAuthor = getWordsByAuthor(author);
      if (!wordsByAuthor || words?.length === 0) {
        return null;
      }

      const wordsWithDate = data.orderByDate(wordsByAuthor);
      return wordsWithDate[0].date.toLocaleString();
    },
    orderByDate(listWords: IWords) {
      const wordsWithDate = listWords?.map((word) => {
        return { ...word, date: new Date(word.date) };
      });
      wordsWithDate?.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });

      return wordsWithDate!;
    },
    orderByWord(listWords: IWords) {
      const orderedWords = listWords?.sort((a, b) => {
        if (a.pt < b.pt) return -1;
        if (a.pt > b.pt) return 1;
        return 0;
      });

      return orderedWords;
    },
    getWordsAddedByAuthor(author: string) {
      const wordsByAuthor = getWordsByAuthor(author);
      return wordsByAuthor?.length ?? 0;
    },
    getAuthorPercentByWordsAdded(author: string) {
      const percent = (data.getWordsAddedByAuthor(author) / wordsLength) * 100;
      return {
        positive: Math.round(percent),
        negative: Math.round(100 - percent),
      };
    },
  };

  return data;
}
