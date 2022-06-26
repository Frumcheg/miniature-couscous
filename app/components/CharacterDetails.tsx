import { useRouter } from "next/router";
import { useGetCharacterQuery } from "../apiService";
import { Heading, Box } from "@chakra-ui/react";
import { PageLoader } from "./PageLoader";

function OptionalValue({ label, value }: { value: string | undefined, label: string }) {
  if (!value) return null;
  return <Box>
    {label}: {value}
  </Box>;
}

function formatList(list: string[]) {
  return list.some(str => str.length > 0) ? list.join(", ") : undefined;
}

export function CharacterDetails() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, error, isLoading } = useGetCharacterQuery(id);
  if (error) return <>Oh no, there was an error</>;
  if (isLoading) return <PageLoader/>;
  if (!data) return null;
  return (
    <>
      <Heading my={4}>
        {data.name}
      </Heading>
      <OptionalValue
        label="gender"
        value={data.gender}
      />
      <OptionalValue
        label="culture"
        value={data.culture}
      />
      <OptionalValue
        label="born"
        value={data.born}
      />
      <OptionalValue
        label="died"
        value={data.died}
      />
      <OptionalValue
        label="titles"
        value={formatList(data.titles)}
      />
      <OptionalValue
        label="aliases"
        value={formatList(data.aliases)}
      />
      <OptionalValue
        label="playedBy"
        value={formatList(data.playedBy)}
      />
    </>
  );
}