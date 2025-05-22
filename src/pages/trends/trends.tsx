import { type ReactElement } from "react";
import styles from "./trends.module.scss";
import PageTitle from "../../components/page-title/page-title";
import clsx from "clsx";
import { useTrends } from "../../data-access/trends/use-trends";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import CatalogItem from "../../components/catalog-item/catalog-item";
import { useCatalog } from "../../data-access/catalog/use-catalog";

function Trends(): ReactElement {
  const trendsList = useTrends();
  const catalogList = useCatalog({});
  return (
    <main className={styles.trends}>
      <PageTitle title="Тренды" />
      <div className={clsx(styles.trends__inner)}>
        {trendsList.length > 0 &&
          trendsList.map((item) => (
            <>
              <div className={styles.trends__item} key={item.id}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../../assets/${item.image})`,
                    backgroundSize: "100% auto",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                  }}
                  className={styles.trends__item__image}
                >
                  <h2 className={styles.trends__item__title}>{item.title}</h2>
                  <p className={styles.trends__item__text}>
                    {item.description}
                  </p>
                </div>
                <div className={clsx(styles.trends__item__list, "container")}>
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
                    {catalogList.filter(
                      (catalogItem) => catalogItem.trendId.toString() == item.id
                    ).length > 0 &&
                      catalogList
                        .filter(
                          (catalogItem) =>
                            catalogItem.trendId.toString() == item.id
                        )
                        .map((catalogItem) => (
                          <SwiperSlide key={catalogItem.id}>
                            <CatalogItem item={catalogItem} />
                          </SwiperSlide>
                        ))}
                  </Swiper>
                </div>
              </div>
            </>
          ))}
      </div>
    </main>
  );
}

export default Trends;
