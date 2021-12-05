import React from "react";
import Skeleton from "react-loading-skeleton";
import { createClient, PhotosWithTotalResults } from "pexels";
import { SearchContext } from "../../context/search";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import styles from "./styles.module.scss";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Search } from "../Search";

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

const getApiKey = (): string => {
  const key = import.meta.env.VITE_PEXELS_KEY as string;
  if (!key) {
    throw new Error("Pexels API key not provided");
  }
  return key;
};

const client = createClient(getApiKey());

const queries = [
  "Nature",
  "Brazil",
  "Fantasy",
  "Sports",
  "Stars",
  "Friendship",
  "Games",
  "Neon lights",
];

export function Header() {
  const { setSearch } = React.useContext(SearchContext);
  const [responsePhotos, setPesponsePhotos] = React.useState<PhotoData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getPhotos() {
      let response = [];
      try {
        for (let query of queries) {
          const photosWithTotalResults = (await client.photos.search({
            query,
            per_page: 1,
          })) as PhotosWithTotalResults;
          response.push(...photosWithTotalResults.photos);
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
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {responsePhotos.map(({ id, src }, index) => {
            return (
              <SwiperSlide
                key={id}
                className={`${styles.swiperSlide}`}
                onClick={() => setSearch(queries[index])}
              >
                <div
                  key={id}
                  className={styles.bgSlide}
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
