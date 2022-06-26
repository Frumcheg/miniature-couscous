export interface Character {
  url: string,
  localUrl: string,
  name: string,
  gender: string,
  culture: string,
  born: string,
  died: string,
  titles: string[],
  aliases: string[],
  father: string,
  mother: string,
  spouse: string,
  allegiances: string[],
  books: string[],
  povBooks: string[],
  tvSeries: string[],
  playedBy: string[]
}

export type CharacterList = Character[]

export interface PagingArgs {
  page: number;
  pageSize: number;
}

export interface PagingUrls {
  next?: string;
  prev?: string;
  first: string;
  last: string;
}