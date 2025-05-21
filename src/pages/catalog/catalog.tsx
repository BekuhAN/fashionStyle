import { type ReactElement } from "react";
import styles from "./catalog.module.scss";
import PageTitle from "../../components/page-title/page-title";
import CatalogSidebar from "../../components/catalog-sidebar/catalog-sidebar";
import CatalogList from "../../components/catalog-list/catalog-list";
import clsx from "clsx";

export default function Catalog(): ReactElement {
  return (
    <main className={styles.catalog}>
      <PageTitle title="Каталог" />
      <div className={clsx(styles.catalog__inner, "container")}>
        <CatalogSidebar />
        <CatalogList />
      </div>
    </main>
  );
}
