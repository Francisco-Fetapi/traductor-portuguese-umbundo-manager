import type { IWordClasses } from "./IWordClasses";

interface FromPTtoUM {
  pt: string;
  um: string;
}

export interface IWord<T = string> extends FromPTtoUM {
  class: keyof IWordClasses;
  examples: T;
  author: string;
}
