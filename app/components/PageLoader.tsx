import { Flex, Spinner } from "@chakra-ui/react";

export function PageLoader() {
  return <Flex
    justifyContent="center"
    alignItems="center"
    height="300px"
  >
    <Spinner size="xl"/>
  </Flex>;
}