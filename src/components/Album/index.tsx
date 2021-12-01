import React from "react";
import {
  createClient,
  PhotosWithTotalResults,
  Photo as PhotoInterface,
} from "pexels";
import InfiniteScroll from "react-infinite-scroll-component";

import { SearchContext } from "../../context/search";
import { useDebounce } from "../../hooks/useDebounce";

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
  const { search } = React.useContext(SearchContext);
  const debouncedSearchTerm = useDebounce(search, 500);

  const [responsePhotos, setPesponsePhotos] = React.useState<PhotoData[]>(
    () => []
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const getPhotos = async () => {
    const addPhotos = (
      prevPhotos: PhotoData[],
      newPhotos: PhotoInterface[]
    ) => {
      const allPhotos = [...prevPhotos, ...newPhotos];

      const PhotosWithoutDuplicateID = allPhotos.filter((obj, index, self) => {
        return index === self.findIndex((el) => el.id === obj.id);
      });

      return PhotosWithoutDuplicateID;
    };

    setIsLoading(false);
    if (!search) {
      setCurrentPage((prev) => prev + 1);
      const response = (await client.photos.curated({
        per_page: 12,
        page: currentPage,
      })) as PhotosWithTotalResults;
      setPesponsePhotos((prev) => addPhotos(prev, response.photos));

      return;
    }

    if (debouncedSearchTerm.trim()) {
      if (search !== debouncedSearchTerm.trim()) {
        setCurrentPage(1);
        return;
      }

      setCurrentPage((prev) => prev + 1);
      const searchPhotos = (await client.photos.search({
        query: debouncedSearchTerm.trim(),
        per_page: 12,
        page: currentPage,
      })) as PhotosWithTotalResults;
      setPesponsePhotos((prev) => addPhotos(prev, searchPhotos.photos));

      return;
    }
  };

  React.useEffect(() => {
    if (search.trim() !== debouncedSearchTerm.trim()) {
      setCurrentPage(1);
      setPesponsePhotos(() => []);
      setIsLoading(true);
      return;
    }

    getPhotos();
  }, [search, debouncedSearchTerm]);

  const photos = responsePhotos;
  if (!photos) return null;
  return (
    <InfiniteScroll
      next={getPhotos}
      hasMore={true}
      loader={undefined}
      dataLength={photos.length}
      height={861}
      className={styles.scroll}
      style={isLoading ? { display: "flex" } : undefined}
    >
      {isLoading ? (
        <div className="spinner" />
      ) : (
        <section className={styles.album}>
          {photos?.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </section>
      )}
    </InfiniteScroll>
  );
}

// React.useEffect(() => {
//   const intersectionObserver = new IntersectionObserver((entries) => {
//     console.log(search)
//     if (entries.some((entry) => entry.isIntersecting)) {
//       setCurrentPage(currentPage+1);
//     }
//   });

//   if (photos && !isLoading) {
//     const sentinela = document.querySelector(`#sentinela`) as Element;

//     intersectionObserver.observe(sentinela);
//   }
//   return () => intersectionObserver.disconnect();
// }, [debouncedSearchTerm]);
