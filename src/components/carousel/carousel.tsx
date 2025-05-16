import { type ReactElement } from "react";
import type { CatalogItem } from "../../interfaces/catalog-item";
import styles from "./carousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  items: CatalogItem[];
}

const priceFormat = (price: number) =>
  price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

function Carousel({ title, items }: Props): ReactElement {
  return (
    <div className={styles.carousel}>
      <div className="container">
        <h2 className={styles.carousel__title}>
          <span>{title}</span>
        </h2>
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
          {items.length &&
            items.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  to={`/catalog/${item.id}`}
                  className={styles.carousel__item}
                >
                  <figure className={styles.carousel__item__img}>
                    <img
                      src={`./assets/catalog/${item.image[0]}`}
                      alt={item.title}
                      className={styles.main}
                    />
                    <img
                      src={`./assets/catalog/${item.image[1]}`}
                      alt={item.title}
                    />
                  </figure>
                  <div className={styles.carousel__item__content}>
                    <h3 className={styles.carousel__item__title}>
                      {item.title}
                    </h3>
                    <div className={styles.carousel__item__price}>
                      {priceFormat(item.price)} ₽
                      {item.oldPrice > 0 && (
                        <span className={styles.carousel__item__oldPrice}>
                          {priceFormat(item.oldPrice)} ₽
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Carousel;
