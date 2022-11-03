import { useContext } from "react";
import { DatabaseContext } from "../context/DatabaseProvider";

export default function useDatabase() {
  const { words } = useContext(DatabaseContext);

  return {
    test() {
      console.log(words);
    },
  };
}
