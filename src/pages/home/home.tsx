import { type ReactElement } from "react";
import styles from "./home.module.scss";
import Preview from "../../components/preview/preview";

function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <Preview />
    </div>
  );
}

export default Home;
