import { useContext } from "react";
import { SearchContext } from "./context/search";

import { Header } from "./components/Header";

import styles from "./app.module.scss";

export function App() {
  const { search } = useContext(SearchContext);
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <h1>{search}</h1>
      </main>
    </div>
  );
}
