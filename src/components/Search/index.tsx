import styles from "./styles.module.scss";

export function Search() {
  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Busque por fotos"
    />
  );
}
