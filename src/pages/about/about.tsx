import { type ReactElement } from "react";
import PageTitle from "../../components/page-title/page-title";
import styles from "./about.module.scss";
import Comments from "../../components/comments/comments";
import News from "../../components/news/news";
import clsx from "clsx";
import About1 from '../../assets/about-1.jpg';
import About2 from '../../assets/about-2.jpg';

function About(): ReactElement {
  return (
    <main className={styles.about}>
      <PageTitle title="О нас" />
      <div className={clsx(styles.about__inner, "container")}>
        <div className={styles.about__content}>
          <h3 className={styles.about__title}>Концепт</h3>
          <p>
            Мода&Стиль - ведущий мультибрендовый магазин на территории ЮФО, в
            котором представлены изделия талантливых российских модельеров.
          </p>
          <p>
            Мы являемся одним из самых масштабных проектов в России, нацеленным
            на популяризацию отечественного производства и дизайна женской
            одежды.
          </p>
        </div>
        <div className={styles.about__image}>
          <img src={About1} />
        </div>
        <div className={styles.about__image}>
          <img src={About2} />
        </div>
        <div className={styles.about__content}>
          <h3 className={styles.about__title}>Мэйд ин Раша</h3>
          <p>
            Дизайнеры, с которыми мы сотрудничаем, имеют квалификацию в сфере
            дизайна, являются участниками всероссийских и международных
            конкурсов и показов.
          </p>
          <p>
            Специфика и цветовые решения коллекций Мода&Стиль подобраны в
            соответствии с трендами и прогнозами платформы WGSN и Pantone,
            большинство моделей создаются из натуральных материалов, украшены
            эксклюзивной фурнитурой.
          </p>
        </div>
      </div>
      <Comments />
      <News />
    </main>
  );
}

export default About;
