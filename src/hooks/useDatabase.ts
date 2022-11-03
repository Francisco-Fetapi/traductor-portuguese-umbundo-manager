import { useContext } from "react";
import { DatabaseContext } from "../context/DatabaseProvider";

export default function useDatabase() {
  const { words } = useContext(DatabaseContext);
  const wordsLength = words?.length ?? 0;

  function getWordsByAuthor(author: string) {
    const wordsByAuthor = words?.filter((word) => word.author === author);
    if (!wordsByAuthor) {
      return null;
    }
    return wordsByAuthor;
  }

  const data = {
    words,
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
    orderByDate(listWords: typeof words) {
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
