import type { IWordClasses } from "./IWordClasses";

interface FromPTtoUM {
  pt: string;
  um: string;
}

export interface IWord extends FromPTtoUM {
  class: keyof IWordClasses;
  examples: FromPTtoUM[];
  author: string;
}
