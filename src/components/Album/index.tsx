import { createClient, PhotosWithTotalResults } from "pexels";
import React from "react";

import { Photo } from "./Photo";
import styles from "./styles.module.scss";

interface PhotoData {
  avg_color?: string;
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  liked: boolean;
  src: {
    landscape: string;
    large: string;
    large2x: string;
    medium: string;
    original: string;
    portrait: string;
    small: string;
    tiny: string;
  };
}

const client = createClient(
  "563492ad6f917000010000011d7c21ba52c34f0abbefd675f9034e42"
);
export function Album() {
  const [responsePhotos, setPesponsePhotos] = React.useState<PhotoData[]>(
    () => []
  );
  const [currentPage, SetCurrentPage] = React.useState(1);

  async function getPhotos() {
    const response = (await client.photos.curated({
      per_page: 23,
      page: currentPage,
    })) as PhotosWithTotalResults;

    setPesponsePhotos((prev) => {
      const allPhotos = [...prev, ...response.photos];

      const PhotosWithoutDuplicateID = allPhotos.filter((obj, index, self) => {
        return index === self.findIndex((el) => el.id === obj.id);
      });

      return PhotosWithoutDuplicateID;
    });
  }

  // console.log(responsePhotos[0].id)

  React.useEffect(() => {
    getPhotos();
  }, [currentPage]);

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        // console.log("observando", entries);
        SetCurrentPage((prev) => prev + 1);
      }
    });
    if (photos) {
      const sentinela = document.querySelector(
        `.${styles.sentinela}`
      ) as Element;

      intersectionObserver.observe(sentinela);
    }

    return () => intersectionObserver.disconnect();
  }, []);

  const photos = responsePhotos;
  if (!photos) return null;

  return (
    <>
      <h1>{currentPage}</h1>
      <div className={styles.scroll}>
        <section className={styles.album}>
          {photos?.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
          <div className={styles.sentinela} />
        </section>
      </div>
    </>
  );
}
