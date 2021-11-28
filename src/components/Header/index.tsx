import { createClient, PhotosWithTotalResults } from "pexels";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import styles from "./styles.module.scss";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Search } from "../Search";
import React from "react";
import Skeleton from "react-loading-skeleton";

interface PhotoData {
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
const queries = ["Nature", "Fantasy", "Friendship", "Games"];

export function Header() {
  const [responsePhotos, setPesponsePhotos] = React.useState<PhotoData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getPhotos() {
      let response = [];
      try {
        for (let query of queries) {
          const PhotosWithTotalResults = (await client.photos.search({
            query,
            per_page: 1,
          })) as PhotosWithTotalResults;
          response.push(...PhotosWithTotalResults.photos);
        }
        setPesponsePhotos(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getPhotos();
  }, []);

  // console.log(responsePhotos);

  return (
    <header className={styles.header}>
      {isLoading ? (
        <Skeleton baseColor="#222" style={{ maxWidth: 1280, height: 300 }} />
      ) : (
        <Swiper
          className={styles.swiper}
          modules={[Autoplay]}
          slidesPerView={1}
          grabCursor
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {responsePhotos.map(({ id, src }, index) => {
            return (
              <SwiperSlide key={id} className={`${styles.swiperSlide}`}>
                <div
                  key={id}
                  className={`${styles.bgSlide}`}
                  style={{
                    backgroundImage: `url(${src.landscape}}`,
                  }}
                />
                <h1>Explore the {queries[index]}</h1>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <Search />
    </header>
  );
}
