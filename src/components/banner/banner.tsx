import { type ReactElement } from "react";
import styles from "./banner.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";

function Banner(): ReactElement {
  return (
    <section className={styles.banner}>
      <div className={clsx(styles.banner__inner, "container")}>
        <h2 className={styles.banner__title}>
          Тренды <br />
          2025
        </h2>
        <div className={styles.banner__control}>
          <Link to="/trends" className={styles.banner__link}>
            Подробнее
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
