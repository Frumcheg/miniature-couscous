import { ListItem } from "./ListItem";
import { Pagination } from "./Pagination";
import { PageLoader } from "./PageLoader";
import { useGetCurrentPageData } from "./useGetCurrentPageData";
import { Box, VStack } from "@chakra-ui/react";

export function ListWithDetails() {
  const { data, error, isLoading } = useGetCurrentPageData();
  if (error) return <>Oh no, there was an error</>;
  if (isLoading) return <PageLoader/>;
  if (!data) return null;
  return (
    <Box my={4}>
      <>
        {data.apiResponse.map((char, i) => (<ListItem
          key={i + char.name}
          name={char.name || "No Name"}
          title={char.name ? `${char.culture}` : ""}
          url={char.localUrl}
          tvSeries={char.tvSeries.some(str => str.length > 0)}
        />))}
      </>
      <Pagination/>
    </Box>
  );
}