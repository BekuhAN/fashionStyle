import { type ReactElement } from "react";
import styles from "./preview.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";

function Preview(): ReactElement {
  return (
    <section className={styles.preview}>
      <div className={clsx(styles.preview__wrapper, "container")}>
        <div className={styles.preview__inner}>
          <h1 className={styles.preview__title}>
            "Мода&Стиль" — одежда, которая говорит за вас
          </h1>
          <p className={styles.preview__subtitle}>
            Каждая вещь — авторская работа, созданная с вниманием к деталям.
            Натуральные ткани, ручная отделка и ограниченные серии. Мода вне
            времени.
          </p>
          <Link to="/catalog" className={styles.preview__button}>
            Перейти в каталог
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Preview;
