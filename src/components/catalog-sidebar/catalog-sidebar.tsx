import { type ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./catalog-sidebar.module.scss";
import {
  setActiveCategory,
  setPriceRange,
} from "../../features/catalog/catalog";
import { useCategories } from "../../data-access/categories/use-categories";
import { Slider } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import _ from "lodash";
import { useCatalog } from "../../data-access/catalog/use-catalog";

export default function CatalogSidebar(): ReactElement {
  const categoriesList = useCategories();
  const dispatch = useDispatch();
  const productSort = useCatalog({ _sort: "-price" });

  const debouncedOnChange = useCallback(
    _.debounce((value) => {
      dispatch(setPriceRange(value));
    }, 500),
    []
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__title}>
        <span>Цена</span>
      </div>
      <div className={styles.sidebar__price}>
        {productSort.length > 0 && (
          <I18nProvider locale="ru">
            <Slider
              defaultValue={[
                productSort.sort((a, b) => a.price - b.price)[0].price,
                productSort.sort((a, b) => b.price - a.price)[0].price,
              ]}
              formatOptions={{ style: "currency", currency: "RUB" }}
              color="foreground"
              label="Цена:"
              maxValue={productSort.sort((a, b) => b.price - a.price)[0].price}
              minValue={productSort.sort((a, b) => a.price - b.price)[0].price}
              step={10}
              size="sm"
              classNames={{
                filler: styles.sidebar__price__filter,
                thumb: styles.sidebar__price__thumb,
              }}
              onChange={(value) => {
                debouncedOnChange(Array.isArray(value) ? value : [value]);
              }}
            />
          </I18nProvider>
        )}
      </div>
      <div className={styles.sidebar__title}>
        <span>Категории</span>
      </div>
      <ul className={styles.sidebar__list}>
        <li
          className={styles.sidebar__list__item}
          onClick={() => {
            dispatch(setActiveCategory(0));
          }}
        >
          Все
        </li>
        {categoriesList.length > 0 &&
          categoriesList.map((item) => (
            <li
              key={item.id}
              className={styles.sidebar__list__item}
              onClick={() => {
                dispatch(setActiveCategory(item.id));
              }}
            >
              {item.title}
            </li>
          ))}
      </ul>
    </aside>
  );
}
