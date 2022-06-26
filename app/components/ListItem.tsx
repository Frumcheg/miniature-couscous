import { HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  name?: string;
}

export function ListItem({ name }: Props) {
  return (
    <HStack>
      <span>{name ?? "Unknown name"}</span>
      <NextLink
        href={`/character/${name}`}
        passHref
      >
        <Link>Details</Link>
      </NextLink>
    </HStack>
  );
}