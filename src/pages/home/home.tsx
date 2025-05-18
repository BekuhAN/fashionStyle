import { type ReactElement } from "react";
import styles from "./home.module.scss";
import Preview from "../../components/preview/preview";
import Services from "../../components/services/services";
import Popular from "../../components/popular/popular";
import Banner from "../../components/banner/banner";
import New from "../../components/new/new";
import Comments from "../../components/comments/comments";

function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <Preview />
      <Services />
      <Popular />
      <Banner />
      <New />
      <Comments />
    </div>
  );
}

export default Home;
