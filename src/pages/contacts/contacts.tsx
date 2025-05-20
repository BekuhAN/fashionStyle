import { useRef, type FormEvent, type ReactElement } from "react";
import styles from "./contacts.module.scss";
import PageTitle from "../../components/page-title/page-title";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import emailjs from "@emailjs/browser";
import { addToast } from "@heroui/react";

function Contacts(): ReactElement {
  const formRef = useRef<HTMLFormElement | null>(null);
  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    // gutgesg3pd@translateid.com
    emailjs
      .sendForm("service_wulgaob", "template_mw3ksfi", formRef.current || "", {
        publicKey: "uQUIWvCwv0Nvd-XaD",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          formRef.current?.reset();
          addToast({
            title: "Успех!",
            description: "Сообщение успешно отправлено!",
            timeout: 3000,
            color: "success",
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
          addToast({
            title: "Ошибка...",
            description: error.text,
            timeout: 3000,
            color: "danger",
          });
        }
      );
  };
  return (
    <main className={styles.contacts}>
      <PageTitle title="Контакты" />
      <div className={clsx(styles.contacts__inner, "container")}>
        <div className={styles.contacts__map}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa8f722ca4d1de4631effbab3984164aa6eb62927734ae3645b1b0ad58be5d1ae&amp;source=constructor"
            width="100%"
            height="400"
            frameBorder="0"
          ></iframe>
        </div>
        <div className={styles.contacts__form}>
          <h3 className={styles.contacts__title}>Оставьте нам сообщение</h3>
          <form
            className={styles.contacts__form__inner}
            action=""
            ref={formRef}
            onSubmit={sendEmail}
          >
            <label htmlFor="" className={styles.contacts__form__item}>
              Ваше имя *
              <input required type="text" name="contacts_name" />
            </label>
            <label htmlFor="" className={styles.contacts__form__item}>
              Ваша почта *
              <input required type="email" name="contacts_email" />
            </label>
            <label htmlFor="" className={styles.contacts__form__item}>
              Тема сообщения
              <input type="text" name="contacts_theme" />
            </label>
            <label htmlFor="" className={styles.contacts__form__item}>
              Сообщения *
              <textarea required name="contacts_message" id=""></textarea>
            </label>
            <button className={styles.contacts__form__btn} type="submit">
              Отправить
            </button>
          </form>
        </div>
        <div className={styles.contacts__info}>
          <h3 className={styles.contacts__title}>Наши контактные данные</h3>
          <div className={styles.contacts__info__text}>
            Мы всегда на связи, чтобы помочь вам с выбором и ответить на любые
            вопросы. Ждем ваших звонков, сообщений и визитов в наш уютный
            магазин!
          </div>
          <div className={styles.contacts__info__item}>
            <div className={styles.contacts__info__item__icon}>
              <Icon
                className={styles.footer__contacts__icon}
                icon="material-symbols-light:map-outline-sharp"
              />
              <span>Адрес</span>
            </div>
            <div className={styles.contacts__info__item__content}>
              г. Краснодар, Восточно-Кругликовская улица, 24
            </div>
          </div>

          <div className={styles.contacts__info__item}>
            <div className={styles.contacts__info__item__icon}>
              <Icon
                className={styles.footer__contacts__icon}
                icon="material-symbols-light:phone-enabled-outline-sharp"
              />
              <span>Телефон</span>
            </div>
            <a
              href="tel:8 (999) 888-77-66"
              className={styles.contacts__info__item__content}
            >
              +7 (999) 888-77-66
            </a>
          </div>

          <div className={styles.contacts__info__item}>
            <div className={styles.contacts__info__item__icon}>
              <Icon
                className={styles.footer__contacts__icon}
                icon="material-symbols-light:mail-outline-sharp"
              />
              <span> Электронная почта</span>
            </div>
            <a
              href="mailto:info@fashion.ru"
              className={styles.contacts__info__item__content}
            >
              info@fashion.ru
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contacts;
