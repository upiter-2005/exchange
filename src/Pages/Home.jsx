import styles from "./Home.module.scss";

import Info from "../components/Info";
import CurenciesList from "../components/CurenciesList";
import AskBid from "../components/AskBid";
import ChartBox from "../components/ChartBox";
import SellList from "../components/SellList";

const Home = () => (
  <div className={styles.container}>
    <Info />
    <div className={styles.bidAsk}>
      <AskBid />
    </div>
    <div className={styles.centerArea}>
      <div className={styles.chartWrapper}>
        <ChartBox />
      </div>

      <dir>Bue/Sell</dir>
    </div>
    <div className={styles.listCurrencies}>
      <CurenciesList />
      <SellList />
    </div>
  </div>
);

export default Home;
