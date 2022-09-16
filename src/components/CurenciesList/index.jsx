import { useState, useEffect } from "react";
import styles from "./CurenciesList.module.scss";
import Pair from "../Pair";
import { filterList } from "../../DB_local/settings";
import { dayDataUrl } from "../../api/apiUrls";
import LoaderAsk from "./LoaderAsk";

const CurenciesList = () => {
  const [newPairs, setNewPairs] = useState([]);

  const getDataCurrency = () => {
    setInterval(async () => {
      const promisArr = [];
      filterList.usdt.forEach((item) => {
        const pair = `${item.toUpperCase()}USDT`;
        promisArr.push(
          fetch(`${dayDataUrl}${pair}`)
            .then((data) => data.json())
            .then((data) => data)
        );
      });

      Promise.all(promisArr).then((val) => {
        setNewPairs(val);
      });
    }, 3000);
  };
  useEffect(() => {
    getDataCurrency();
  }, []);

  const loaderAsk = [...new Array(14)].map((item, i) => <LoaderAsk key={i} />);

  return (
    <div className={styles.currencyListContainer}>
      <div className={styles.currencyListContainerTitles}>
        <span>Pair</span>
        <span>Price</span>
        <span>Change 24h</span>
      </div>
      <div className={styles.currencyListContainerInner}>
        {!newPairs.length
          ? loaderAsk
          : newPairs.map((obj) => <Pair {...obj} key={obj.symbol} />)}
      </div>
    </div>
  );
};

export default CurenciesList;
