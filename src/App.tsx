import { useContext } from "react";
import { SearchContext } from "./context/search";

export function App() {
  const { search } = useContext(SearchContext);
  return (
    <main>
      <h1>{search}</h1>
    </main>
  );
}
