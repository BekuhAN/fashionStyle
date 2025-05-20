import { type ReactElement } from "react";
import styles from "./news.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { Autoplay } from "swiper/modules";
import { useNews } from "../../data-access/news/use-news";
import NewsItem from "../news-item/news-item";

function News(): ReactElement {
  const newsList = useNews();

  return (
    <section className={styles.news}>
      <div className="container">
        <h2 className={styles.news__title}>Последние новости</h2>
        <div className={styles.news__list}>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {newsList.length &&
              newsList.map((item) => (
                <SwiperSlide key={item.id}>
                  <NewsItem item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default News;
