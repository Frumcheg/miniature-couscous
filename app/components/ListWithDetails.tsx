import { Container, Spinner } from "@chakra-ui/react";
import { useGetCharactersQuery } from "../apiService";
import { ListItem } from "./ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Pagination } from "./Pagination";

export function ListWithDetails() {
  const { currentPage, pageSize } = useSelector((state: RootState) => state.pagination);
  const { data, error, isLoading } = useGetCharactersQuery({ page: currentPage, pageSize });
  if (error) return <>Oh no, there was an error</>;
  if (isLoading) return <Spinner size="xl"/>;
  if (!data) return null;
  return (
    <Container>
      {data.apiResponse.map((char, i) => (<ListItem
        key={i + char.name}
        name={char.name || "No Name"}
        title={char.name ? `${char.culture}` : ""}
        url={char.localUrl}
        tvSeries={char.tvSeries.some(str => str.length > 0)}
      />))}
      <Pagination/>
    </Container>
  );
}