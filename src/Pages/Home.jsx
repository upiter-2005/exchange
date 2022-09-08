import styles from "./Home.module.scss";

import Info from "../components/Info";
import CurenciesList from "../components/CurenciesList";
import AskBid from "../components/AskBid";
import ChartBox from "../components/ChartBox";
import SellList from "../components/SellList";
import Buy from "../components/Buy";
import Sell from "../components/Sell";
import UserActions from "../components/UserActions";

const Home = () => (
  <div className={styles.container}>
    <div className={styles.bidAsk}>
      <AskBid />
    </div>
    <div className={styles.centerArea}>
      <div className={styles.chartWrapper}>
        <Info />
        <ChartBox />
      </div>

      <div className={styles.tradeContainer}>
        <Buy />
        <Sell />
      </div>
    </div>
    <div className={styles.listCurrencies}>
      <CurenciesList />
      <SellList />
    </div>

    <UserActions />
  </div>
);

export default Home;
