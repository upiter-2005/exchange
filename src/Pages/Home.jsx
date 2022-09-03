import styles from "./Home.module.scss";

import CurenciesList from "../components/CurenciesList";
import AskBid from "../components/AskBid";

const Home = () => (
  <div className={styles.container}>
    <div className={styles.bidAsk}>
      <AskBid />
    </div>
    <div className={styles.chart}>Chart</div>
    <div className={styles.listCurrencies}>
      <CurenciesList />
    </div>
  </div>
);

export default Home;
