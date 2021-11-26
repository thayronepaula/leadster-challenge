import { useContext } from "react";
import { SearchContext } from "./context/search";

import { Header } from "./components/Header";
import { Album } from "../src/components/Album";
import { Footer } from "./components/Footer";

import styles from "./app.module.scss";

export function App() {
  const { search } = useContext(SearchContext);
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Album />
      </main>
      <Footer />
    </div>
  );
}
