import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Tooltip, Text, Select
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setCurrentPage, setPageSize } from "./paginationSlice";
import { useMemo } from "react";
import { useGetCurrentPageData } from "./useGetCurrentPageData";

function parseQuery(url: string, key: string) {
  const [, query] = url.match(/.+\?(.+)/s) ?? []
  const params = new URLSearchParams(query)
  return params.get(key)
}

export function Pagination() {
  const { data, pageSize, currentPage } = useGetCurrentPageData();
  const dispatch = useDispatch();
  const lastPageNumber = useMemo(() => {
    if (!data) return;
    const page = parseQuery(data.pagingUrls.last, "page") ?? undefined;
    return page ? Number(page) : undefined;
  }, [data?.pagingUrls.last]);
  return useMemo(() => {
    if (!data) return null;
    return <Flex
      justifyContent="space-between"
      m={4}
      alignItems="center"
    >
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            onClick={() => dispatch(setCurrentPage(1))}
            isDisabled={!data.pagingUrls.prev}
            icon={<ArrowLeftIcon
              h={3}
              w={3}
            />}
            mr={4}
            aria-label="First Page"
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            isDisabled={!data.pagingUrls.prev}
            icon={<ChevronLeftIcon
              h={6}
              w={6}
            />}
            aria-label="Previous Page"
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text
          flexShrink="0"
          mr={8}
        >
          Page{" "}
          <Text
            fontWeight="bold"
            as="span"
          >
            {currentPage}
          </Text>
        </Text>
        <Select
          w={32}
          value={pageSize}
          onChange={(e) => {
            dispatch(setPageSize(Number(e.target.value)));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
            >
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            isDisabled={!data.pagingUrls.next}
            icon={<ChevronRightIcon
              h={6}
              w={6}
            />}
            aria-label="Previous Page"
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => lastPageNumber && dispatch(setCurrentPage(lastPageNumber))}
            isDisabled={!data.pagingUrls.next}
            icon={<ArrowRightIcon
              h={3}
              w={3}
            />}
            ml={4}
            aria-label="Last Page"
          />
        </Tooltip>
      </Flex>
    </Flex>;
  }, [currentPage, pageSize]);
}