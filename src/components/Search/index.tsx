import { useContext } from "react";
import { SearchContext } from "../../context/search";

import styles from "./styles.module.scss";

import SearchIcon from "../../assets/search_icon.svg";
export function Search() {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search by photo"
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <img src={SearchIcon} alt="search icon" />
    </div>
  );
}
