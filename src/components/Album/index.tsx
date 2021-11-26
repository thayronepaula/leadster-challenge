import styles from "./styles.module.scss";

export function Album() {
  const photos = [];

  for (let i = 0; i < 3; i++) {
    photos.push(i);
  }
  return (
    <section className={styles.album}>
      {photos.map((num) => (
        <div key={num} style={{ background: "#222", width: 270, height: 350 }} />
      ))}
    </section>
  );
}
