import { type ReactElement } from "react";
import styles from "./home.module.scss";
import Preview from "../../components/preview/preview";
import Services from "../../components/services/services";

function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <Preview />
      <Services />
    </div>
  );
}

export default Home;
