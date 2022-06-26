import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store";
import { ListWithDetails } from "./components/ListWithDetails";

export function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ListWithDetails/>
      </ChakraProvider>
    </Provider>
  );
}