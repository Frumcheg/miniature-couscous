import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Character, CharacterList, PagingArgs, PagingUrls } from "./types";

function parseLinkHeader(header: string): PagingUrls {
  function parseEntry(str: string) {
    const [match] = Array.from(str.matchAll(/<(.+)>; rel="(.+)"/gs));
    return [match[2], match[1]];
  }

  return Object.fromEntries(header.split(",").map(parseEntry));
}

export const apiOfIceAndFire = createApi({
  reducerPath: "apiOfIceAndFire",
  baseQuery: fetchBaseQuery({ baseUrl: "https://anapioficeandfire.com/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query<{ apiResponse: CharacterList, pagingUrls: PagingUrls }, PagingArgs>({
      query: ({ page, pageSize }) => `/characters?page=${page}&pageSize=${pageSize}`,
      transformResponse(apiResponse: CharacterList, meta) {
        return { apiResponse, pagingUrls: parseLinkHeader(meta?.response?.headers.get("link") ?? "") };
      }
    }),
    getCharacter: builder.query<Character, string>({
      query: (url) => url,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = apiOfIceAndFire;