import { useEffect, useState, type ReactElement } from "react";
import { useCatalog } from "../../data-access/catalog/use-catalog";
import { useParams } from "react-router-dom";
import type { CatalogItemType } from "../../interfaces/catalog-item";
import styles from "./catalog-page.module.scss";
import PageTitle from "../../components/page-title/page-title";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addWishList,
  getWishList,
  removeWishList,
} from "../../features/wishlist/wishlist";
import { addCart, getCart } from "../../features/cart/cart";
import { Accordion, AccordionItem, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Carousel from "../../components/carousel/carousel";

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

  const dispatch = useDispatch();
  const wishlist = useSelector(getWishList);
  const cart = useSelector(getCart);
  const [countProduct, setCountProduct] = useState(1);
  // const [count, setCount] = useState(catalogItem?.count);

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

          <div className={styles.catalog_page__content__buy}>
            <Input
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">шт.</span>
                </div>
              }
              labelPlacement="outside"
              placeholder="1"
              min={1}
              max={100}
              radius="none"
              classNames={{
                base: styles.catalog_page__content__buy__input,
              }}
              value={countProduct?.toString()}
              type="number"
              onValueChange={(e) => setCountProduct(Number(e))}
              isDisabled={cart.some((i) => i.id === catalogItem?.id)}
            />
            <Button
              radius="none"
              className={styles.catalog_page__content__buy__btn}
              // variant="ghost"
              color="default"
              onPress={() =>
                dispatch(addCart({ ...catalogItem, count: countProduct }))
              }
              isDisabled={cart.some((i) => i.id === catalogItem?.id)}
            >
              {cart.some((i) => i.id === catalogItem?.id)
                ? "В корзине"
                : "В Корзину"}
            </Button>
            <div className={styles.catalog_page__content__heart}>
              {wishlist.find((i) => i.id === catalogItem?.id) ? (
                <Icon
                  icon="material-symbols-light:heart-minus-outline"
                  width="40"
                  height="40"
                  onClick={() =>
                    dispatch(removeWishList(catalogItem?.id || ""))
                  }
                />
              ) : (
                <Icon
                  icon="material-symbols-light:heart-plus-outline"
                  width="40"
                  height="40"
                  onClick={() => dispatch(addWishList(catalogItem))}
                />
              )}
            </div>
          </div>
          <p className={styles.catalog_page__content__description}>
            {catalogItem?.info}
          </p>
          <div className={styles.catalog_page__content__list}>
            <Accordion
              className={styles.catalog_page__content__list__wrapper}
              variant="shadow"
            >
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Обмеры изделий"
              >
                <div
                  className={styles.catalog_page__content__list__item}
                  dangerouslySetInnerHTML={{
                    __html: `${catalogItem?.measurements}`,
                  }}
                ></div>
              </AccordionItem>
              <AccordionItem key="2" aria-label="Accordion 2" title="Уход">
                <div
                  className={styles.catalog_page__content__list__item}
                  dangerouslySetInnerHTML={{
                    __html: `${catalogItem?.care}`,
                  }}
                ></div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className={clsx(styles.catalog_page__more, "container")}>
        <Carousel
          title="Похожие товары"
          items={catalogList.filter(
            (item) =>
              item.categoryId == catalogItem?.categoryId &&
              item.id !== catalogItem?.id
          )}
        />
      </div>
    </main>
  );
}

export default CatalogPage;
