import { Photo as PhotoInterface } from "pexels";
import React from "react";
import Skeleton from "react-loading-skeleton";

import styles from "../styles.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

import PhotographerIcon from "../../../assets/photographer_icon.svg";

interface PhotoProps extends PhotoInterface {
  avg_color?: string;
}

export function Photo({ ...photo }: PhotoProps) {
  const { avg_color, photographer, photographer_url, src, url } = photo;

  // format alt for image
  const altImage = url.split("https://www.pexels.com/photo/");
  const [, alt] = altImage;
  const altFormat = alt.replace(/[^a-zA-Z]/g, " ");
  //
  return (
    <div className={styles.card}>
      <AsyncImage src={src.portrait} alt={altFormat} baseColor={avg_color} />
      <footer className={styles.cardFooter}>
        <a href={photographer_url} target="_blank">
          {photographer}
        </a>
        <img
          className={styles.photographerIcon}
          src={PhotographerIcon}
          alt="Photographer Icon"
        />
      </footer>
    </div>
  );
}

type AsyncImageProps = {
  alt: string;
  src: string;
  baseColor?: string;
};

function AsyncImage({ alt, src, baseColor }: AsyncImageProps) {
  const [loadedSrc, setLoadedSrc] = React.useState("");
  React.useEffect(() => {
    setLoadedSrc("");
    if (src) {
      const handleLoad = () => {
        setLoadedSrc(src);
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.src = src;
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [src]);
  if (loadedSrc === src) {
    return <img src={src} alt={alt} />;
  } else {
    return <Skeleton baseColor={baseColor} width={270} height={350} />;
  }
}
