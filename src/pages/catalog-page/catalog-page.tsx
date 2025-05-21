import { useEffect, useState, type ReactElement } from "react";
import { useCatalog } from "../../data-access/catalog/use-catalog";
import { useParams } from "react-router-dom";
import type { CatalogItemType } from "../../interfaces/catalog-item";
import styles from "./catalog-page.module.scss";
import PageTitle from "../../components/page-title/page-title";
import clsx from "clsx";

function CatalogPage(): ReactElement {
  const catalofList = useCatalog({});
  const params = useParams();
  const [catalogItem, setCatalogItem] = useState<CatalogItemType>();
  useEffect(() => {
    setCatalogItem(
      catalofList.find((item) => item.id.toString() === params.id)
    );
  }, [catalogItem, params.id]);
  return (
    <main className={styles.catalog_page}>
      <PageTitle title={`${catalogItem?.title}`} />
      <div className={clsx(styles.catalog_page__inner, "container")}>
        {catalogItem?.title}
      </div>
    </main>
  );
}

export default CatalogPage;
