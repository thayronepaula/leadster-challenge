import { createClient, Photos, PhotosWithTotalResults } from "pexels";
import React from "react";

import { Photo } from "./Photo";
import styles from "./styles.module.scss";

const client = createClient(
  "563492ad6f917000010000011d7c21ba52c34f0abbefd675f9034e42"
);
export function Album() {
  const [responsePhotos, setPesponsePhotos] =
    React.useState<PhotosWithTotalResults | null>(null);

  React.useEffect(() => {
    client.photos
      .curated({ per_page: 36, page: Math.floor(Math.random() * 300) })
      .then((photos) => setPesponsePhotos(photos as PhotosWithTotalResults));
  }, []);

  const photos = responsePhotos?.photos;
  if (!photos) return null;

  // console.log(responsePhotos);
  return (
    <div  className={styles.scroll}>

    <section className={styles.album}>
      {photos.map((photo) => (
        <Photo key={photo.id} {...photo} />
        ))}
    </section>
        </div>
  );
}
