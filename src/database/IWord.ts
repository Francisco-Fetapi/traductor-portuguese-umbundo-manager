import type { IWordClasses } from "./IWordClasses";

export interface FromPTtoUM {
  pt: string;
  um: string;
}

export interface IWord<T = string> extends FromPTtoUM {
  id?: string;
  class: keyof IWordClasses;
  examples: T;
  author: string;
  date: string;
}
