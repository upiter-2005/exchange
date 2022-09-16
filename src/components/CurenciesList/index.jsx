import { useState, useEffect } from "react";
import styles from "./CurenciesList.module.scss";
import Pair from "../Pair";
import { filterList } from "../../DB_local/settings";

const CurenciesList = () => {
  const [newPairs, setNewPairs] = useState([]);

  useEffect(() => {
    let items = [];
    items = filterList.usdt;
    // const listPairs = items.slice(0, 25);
    setNewPairs(items);
  }, []);

  return (
    <div className={styles.currencyListContainer}>
      <div className={styles.currencyListContainerTitles}>
        <span>Pair</span>
        <span>Price</span>
        <span>Change 24h</span>
      </div>
      <div className={styles.currencyListContainerInner}>
        {newPairs.map((obj) => (
          <Pair name={obj} key={obj} />
        ))}
      </div>
    </div>
  );
};

export default CurenciesList;
