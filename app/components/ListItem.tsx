import { HStack, Link, Text, Box } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  name: string;
  title: string;
  url: string;
  tvSeries: boolean;
}

export function ListItem({ name, title, url, tvSeries }: Props) {
  return (
    <HStack justify="space-between">
      <Box w="140px"><Text fontWeight={tvSeries ? "bold" : undefined}>{name}</Text></Box>
      <span>{title}</span>
      <NextLink
        href={url}
        passHref
      >
        <Link>Go to details</Link>
      </NextLink>
    </HStack>
  );
}