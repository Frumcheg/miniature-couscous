import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Character, CharacterList, PagingArgs, PagingUrls } from "./types";

function parseLinkHeader(header: string): PagingUrls {
  function parseEntry(str: string) {
    const [match] = Array.from(str.matchAll(/<(.+)>; rel="(.+)"/gs));
    return [match[2], match[1]];
  }

  return Object.fromEntries(header.split(",").map(parseEntry));
}

function toLocalUrl(url: string): string {
  const match = url.match(/https:\/\/anapioficeandfire.com\/api(.+)/) ?? [];
  return match[1];
}

export const apiOfIceAndFire = createApi({
  reducerPath: "apiOfIceAndFire",
  baseQuery: fetchBaseQuery({ baseUrl: "https://anapioficeandfire.com/api/" }),
  tagTypes: ["Pages"],
  endpoints: (builder) => ({
    getCharacters: builder.query<{ apiResponse: CharacterList, pagingUrls: PagingUrls }, PagingArgs>({
      query: ({ page, pageSize }) => `/characters?page=${page}&pageSize=${pageSize}`,
      transformResponse(apiResponse: CharacterList, meta) {
        apiResponse.forEach(char => {
          char.localUrl = toLocalUrl(char.url);
        });
        return { apiResponse, pagingUrls: parseLinkHeader(meta?.response?.headers.get("link") ?? "") };
      },
      providesTags: ["Pages"]
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => `https://anapioficeandfire.com/api/characters/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = apiOfIceAndFire;