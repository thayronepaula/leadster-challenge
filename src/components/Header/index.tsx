import { createClient } from "pexels";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import styles from "./styles.module.scss";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Search } from "../Search";

const client = createClient(
  "563492ad6f91700001000001c23d184bf23045bd89cae01f5aa43464"
);
const query = "Nature";

export function Header() {
  client.photos
    .search({ query, per_page: 1 })
    .then((photos) => console.log(photos));

  return (
    <header className={styles.header}>
      <Swiper
        className={styles.swiper}
        modules={[Autoplay]}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        effect="fade"
        grabCursor
        autoplay={{ delay: 50000 }}
      >
        <SwiperSlide className={`${styles.swiperSlide}`}>
          <div
            className={`${styles.bgSlide}`}
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200)",
            }}
          />
          <h1>Explore a natureza</h1>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>

      <Search />
    </header>
  );
}
