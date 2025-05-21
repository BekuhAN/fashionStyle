import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./catalog-item.module.scss";
import type { CatalogItemType } from "../../interfaces/catalog-item";

interface Props {
  item: CatalogItemType;
}

const priceFormat = (price: number) =>
  price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

function CatalogItem({ item }: Props): ReactElement {
  return (
    <Link to={`/catalog/${item.id}`} className={styles.catalog_item}>
      <figure className={styles.catalog_item__img}>
        <img
          src={`./assets/catalog/${item.image[0]}`}
          alt={item.title}
          className={styles.main}
        />
        <img src={`./assets/catalog/${item.image[1]}`} alt={item.title} />
      </figure>
      <div className={styles.catalog_item__content}>
        <h3 className={styles.catalog_item__title}>{item.title}</h3>
        <div className={styles.catalog_item__price}>
          {priceFormat(item.price)} ₽
          {item.oldPrice > 0 && (
            <span className={styles.catalog_item__oldPrice}>
              {priceFormat(item.oldPrice)} ₽
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CatalogItem;
