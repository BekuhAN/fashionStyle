import { type ReactElement } from "react";
import styles from "./comments.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { Autoplay } from "swiper/modules";
import { useComments } from "../../data-access/comments/use-comments";
import { Icon } from "@iconify/react/dist/iconify.js";

function Comments(): ReactElement {
  const commentsList = useComments();

  return (
    <section className={styles.comments}>
      <div className="container">
        <h2 className={styles.comments__title}>Наши довольные клиенты</h2>
        <div className={styles.comments__list}>
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {commentsList.length &&
              commentsList.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={styles.comments__item}>
                    <div className={styles.comments__item__icon}>
                      <Icon icon="material-symbols-light:format-quote-rounded" />
                    </div>
                    <div className={styles.comments__item__text}>
                      {item.text}
                    </div>
                    <div className={styles.comments__item__author}>
                      <div className={styles.comments__item__author__image}>
                        <img src={`./assets/${item.image}`} />
                      </div>
                      <div className={styles.comments__item__author__name}>
                        {item.name}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Comments;
