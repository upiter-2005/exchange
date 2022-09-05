import styles from "./Home.module.scss";

import Info from "../components/Info";
import CurenciesList from "../components/CurenciesList";
import AskBid from "../components/AskBid";
import Chart from "../components/Chart";

const Home = () => (
  <div className={styles.container}>
    <Info />
    <div className={styles.bidAsk}>
      <AskBid />
    </div>
    <div className={styles.centerArea}>
      <div className={styles.chartWrapper}>
        <Chart />
      </div>

      <dir>Bue/Sell</dir>
    </div>
    <div className={styles.listCurrencies}>
      <CurenciesList />
    </div>
  </div>
);

export default Home;
