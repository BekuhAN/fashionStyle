import { type ReactElement } from "react";
import styles from "./footer.module.scss";
import { Link } from "react-router-dom";
import { useNavigation } from "../../data-access/navigation/use-navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

function Footer(): ReactElement {
  const navList = useNavigation();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__inner}>
          <div className={styles.footer__column}>
            <Link className={styles.footer__logo} to="/">
              Мода&Стиль
            </Link>
            <div className={styles.footer__text}>
              <p>
                Мы создаем моду, которая говорит о вас. В нашем магазине —
                только избранные коллекции от талантливых дизайнеров, где каждая
                вещь становится частью вашего уникального стиля.
              </p>
              <p>
                Качество, индивидуальность и безупречный сервис — вот что делает
                «Мода&Стиль» местом для тех, кто ценит настоящее искусство в
                одежде.
              </p>
            </div>
          </div>
          <div className={styles.footer__column}>
            <div className={styles.footer__title}>Навигация</div>
            <ul className={styles.footer__nav}>
              {navList.length > 0 &&
                navList.map((item) => (
                  <li className={styles.footer__nav__item} key={item.id}>
                    <Link className={styles.footer__nav__link} to={item.path}>
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.footer__column}>
            <div className={styles.footer__title}>Контакты</div>
            <ul className={styles.footer__contacts}>
              <li className={styles.footer__contacts__item}>
                <Icon
                  className={styles.footer__contacts__icon}
                  icon="material-symbols-light:map-outline-sharp"
                  width="24"
                  height="24"
                />
                г. Краснодар, Восточно-Кругликовская улица, 24
              </li>
              <li className={styles.footer__contacts__item}>
                <Icon
                  className={styles.footer__contacts__icon}
                  icon="material-symbols-light:phone-enabled-outline-sharp"
                  width="24"
                  height="24"
                />
                <a href="tel:+7 (999) 888-77-66">+7 (999) 888-77-66</a>
              </li>
              <li className={styles.footer__contacts__item}>
                <Icon
                  className={styles.footer__contacts__icon}
                  icon="material-symbols-light:mail-outline-sharp"
                  width="24"
                  height="24"
                />
                <a href="mailto:info@fashion.ru">info@fashion.ru</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footer__copy}>Copyright © 2025 Мода&Стиль.</div>
    </footer>
  );
}

export default Footer;
