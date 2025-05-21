import { useEffect, useState, type ReactElement } from "react";
import { useCatalog } from "../../data-access/catalog/use-catalog";
import { useParams } from "react-router-dom";
import type { CatalogItemType } from "../../interfaces/catalog-item";
import styles from "./catalog-page.module.scss";
import PageTitle from "../../components/page-title/page-title";
import clsx from "clsx";

const priceFormat = (price: number) =>
  price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

function CatalogPage(): ReactElement {
  const catalogList = useCatalog({});
  const params = useParams();
  const [catalogItem, setCatalogItem] = useState<CatalogItemType>();
  useEffect(() => {
    setCatalogItem(
      catalogList.find((item) => item.id.toString() === params.id)
    );
  }, [catalogList, params.id]);

  const [activeImage, setActiveImage] = useState(0);

  return (
    <main className={styles.catalog_page}>
      <PageTitle title={catalogItem?.title || ""} />
      <div className={clsx(styles.catalog_page__inner, "container")}>
        <div className={styles.catalog_page__image}>
          <div className={styles.catalog_page__image__main}>
            <img
              src={`../../assets/catalog/${catalogItem?.image[activeImage]}`}
            />
          </div>
          <div className={styles.catalog_page__image__thumbs}>
            {catalogItem &&
              catalogItem.image.map((item, index) => (
                <div
                  className={clsx(
                    styles.catalog_page__image__thumbs__item,
                    activeImage === index && styles.active
                  )}
                  key={index}
                >
                  <img
                    onClick={() => setActiveImage(index)}
                    src={`../../assets/catalog/${item}`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={styles.catalog_page__content}>
          <h2 className={styles.catalog_page__content__title}>
            {catalogItem?.title}
          </h2>
          {catalogItem && (
            <div className={styles.catalog_page__content__price}>
              {priceFormat(catalogItem?.price)} ₽
              {catalogItem?.oldPrice > 0 && (
                <span className={styles.catalog_page__content__oldPrice}>
                  {priceFormat(catalogItem?.oldPrice)} ₽
                </span>
              )}
            </div>
          )}
          <p className={styles.catalog_page__content__description}>
            {catalogItem?.info}
          </p>
        </div>
      </div>
    </main>
  );
}

export default CatalogPage;
