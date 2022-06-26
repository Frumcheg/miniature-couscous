import { Input, FormControl, FormLabel, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useGetCurrentPageData } from "./useGetCurrentPageData";
import { ChangeEvent, useEffect, useRef } from "react";
import { useAppDispatch } from "../store";
import { apiOfIceAndFire } from "../apiService";
import { CharacterList } from "../types";


export function LocalFilter() {
  const { data, currentPage, pageSize } = useGetCurrentPageData();
  const dispatch = useAppDispatch();
  const calledRef = useRef(false);
  useEffect(() => {
    return () => {
      if (!calledRef.current) {
        dispatch(apiOfIceAndFire.util.invalidateTags(["Pages"]))
        calledRef.current = true
      }
    }
  }, []);
  const localList = useRef<CharacterList>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const undoRef = useRef<Array<() => void>>([]);

  function onFocus() {
    localList.current = data?.apiResponse ?? [];
  }

  function onClear() {
    inputRef.current && (inputRef.current.value = "");
    undoRef.current.forEach(undo => undo());
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const { undo } = dispatch(apiOfIceAndFire.util.updateQueryData("getCharacters", {
      page: currentPage,
      pageSize
    }, (draft) => {
      draft.apiResponse = localList.current.filter(char => char.name.toLowerCase().includes(value.toLowerCase()));
    }));
    undoRef.current.unshift(undo);
  }

  if (!data) return null;
  return (
    <FormControl my={4}>
      <FormLabel htmlFor="filter">Filter by character name</FormLabel>
      <HStack>
        <Input
          id="filter"
          size="lg"
          onChange={onChange}
          onFocus={onFocus}
          ref={inputRef}
        />
        <Tooltip label="Reset filter">
          <IconButton
            onClick={onClear}
            aria-label="Reset filter"
            icon={<CloseIcon/>}
          />
        </Tooltip>
      </HStack>
    </FormControl>
  );
}