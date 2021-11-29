import { useContext } from "react";
import { SearchContext } from "../../context/search";

import styles from "./styles.module.scss";


export function Search() {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Busque por fotos"
      value={search}
      onChange={({ target }) => setSearch(target.value)}
    />
  );
}
