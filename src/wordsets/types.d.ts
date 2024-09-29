export type Wordset = {
  name: string;
  sourceLanguage: string;
  targetLanguage: string;
  tests: Test[];
};

export type Test = {
  phrase: string;
  translations: string[];
};
