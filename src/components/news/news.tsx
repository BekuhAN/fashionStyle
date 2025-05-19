import { type ReactElement } from "react";
import styles from "./news.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { Autoplay } from "swiper/modules";
import { useNews } from "../../data-access/news/use-news";
import { Icon } from "@iconify/react";

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
                  <div className={styles.news__item}>
                    <div className={styles.news__item__image}>
                      <img src={`./assets/${item.image}`} />
                    </div>
                    <div className={styles.news__item__date}>
                      <Icon
                        icon="material-symbols-light:calendar-month-sharp"
                        width="18"
                        height="18"
                      />
                      {item.date}
                    </div>
                    <div className={styles.news__item__title}>{item.title}</div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default News;
