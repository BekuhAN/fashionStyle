import { type ReactElement } from "react";
import styles from "./page-title.module.scss";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  title: string;
}

function PageTitle({ title }: Props): ReactElement {
  return (
    <section className={styles.page_title}>
      <div className={styles.page_title__breadcrumb}>
        <Link to="/" className={styles.page_title__breadcrumb__link}>
          <Icon
            icon="material-symbols-light:home-outline"
            width="28"
            height="28"
          />
        </Link>
        <span>/</span>
        <span>{title}</span>
      </div>
    </section>
  );
}

export default PageTitle;
