import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import styles from "./styles.module.scss";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

export function Header() {
  return (
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
              "url(https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
          }}

        />
        <h1>Explore a natureza</h1>
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
}
