import { type ReactElement } from "react";
import styles from "./services.module.scss";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";

function Services(): ReactElement {
  return (
    <section className={styles.services}>
      <div className={clsx(styles.services__inner, "container")}>
        <div className={styles.services__list}>
          <div className={styles.services__item}>
            <div className={styles.services__item__icon}>
              <Icon icon="material-symbols-light:delivery-truck-speed-outline" />
            </div>
            <div className={styles.services__item__title}>
              Бесплатная доставка
            </div>
            <div className={styles.services__item__content}>
              Бесплатная доставка на все заказы
            </div>
          </div>
          <div className={styles.services__item}>
            <div className={styles.services__item__icon}>
              <Icon icon="material-symbols-light:currency-ruble" />
            </div>
            <div className={styles.services__item__title}>Возврат денег</div>
            <div className={styles.services__item__content}>
              30 дней на бесплатный возврат
            </div>
          </div>
          <div className={styles.services__item}>
            <div className={styles.services__item__icon}>
              <Icon icon="material-symbols-light:headset-mic-outline-sharp" />
            </div>
            <div className={styles.services__item__title}>Онлайн поддержка</div>
            <div className={styles.services__item__content}>
              Поддержка 24 часа в сутки
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
