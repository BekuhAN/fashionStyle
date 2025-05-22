import { type ReactElement } from "react";
import styles from "./header.module.scss";
import clsx from "clsx";
import { useNavigation } from "../../data-access/navigation/use-navigation";
import { Link } from "react-router-dom";
import Cart from "../cart/cart";
import Wishlist from "../wishlist/wishlist";

function Header(): ReactElement {
  const navList = useNavigation();

  return (
    <header className={styles.header}>
      <div className={clsx(styles.header__inner, "container")}>
        <Link to="/" className={styles.header__logo}>
          Мода&Стиль
        </Link>
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            {navList.length > 0 &&
              navList.map((item) => (
                <li className={styles.header__nav__item} key={item.id}>
                  <Link className={styles.header__nav__link} to={item.path}>
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <div className={styles.header__cart}>
          <Wishlist />
          <Cart />
        </div>
      </div>
    </header>
  );
}

export default Header;
