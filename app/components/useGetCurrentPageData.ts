import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetCharactersQuery } from "../apiService";

export function useGetCurrentPageData() {
  const { currentPage, pageSize } = useSelector((state: RootState) => state.pagination);
  const { data, error, isLoading } = useGetCharactersQuery({ page: currentPage, pageSize });
  return { data, error, isLoading, currentPage, pageSize };
}