import styles from "./styles.module.scss";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        All rights reserved to
        <a href="https://www.pexels.com/" target="_blank">
          Pexels
        </a>
      </p>
      <hr />

      <span>{currentYear}</span>
    </footer>
  );
}
