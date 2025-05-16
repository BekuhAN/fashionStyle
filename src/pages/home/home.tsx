import { type ReactElement } from "react";
import styles from "./home.module.scss";
import Preview from "../../components/preview/preview";
import Services from "../../components/services/services";
import Popular from "../../components/popular/popular";

function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <Preview />
      <Services />
      <Popular />
    </div>
  );
}

export default Home;
