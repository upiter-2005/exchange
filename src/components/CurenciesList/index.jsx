import { useState, useEffect } from "react";
import styles from "./CurenciesList.module.scss";
import { allPairsUrl } from "../../api/apiUrls";
import Pair from "../Pair";

const CurenciesList = () => {
  const [newPairs, setNewPairs] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const getAllPairs = async (url) => {
    const dataPairs = await fetch(url)
      .then((data) => data.json())
      .then((data) => data);
    const items = dataPairs.filter((obj) => obj.symbol.includes("USDT"));
    const listPairs = items.slice(0, 12);

    setNewPairs(listPairs);
  };

  useEffect(() => {
    getAllPairs(allPairsUrl);
  }, []);

  const findPair = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className={styles.currencyListContainer}>
      <div className={styles.currencyListSearch}>
        <span className="material-symbols-outlined searchInput">search</span>
        <input
          type="text"
          value={searchVal}
          placeholder="Search"
          className={styles.currencyListInput}
          onChange={findPair}
        />
      </div>
      <div className={styles.currencyListFilter}>
        <button type="button" className="filterButton ">
          <span className="material-symbols-outlined favoriteIcon">star</span>
        </button>
        <button type="button" className="filterButton active">
          USDT
        </button>
        <button type="button" className="filterButton">
          BTC
        </button>
        <button type="button" className="filterButton">
          ETH
        </button>
        <button type="button" className="filterButton">
          UAH
        </button>
      </div>
      <div className={styles.currencyListContainerTitles}>
        <span>Pair</span>
        <span>Price</span>
      </div>
      <div className={styles.currencyListContainerInner}>
        {newPairs.map((obj) => (
          <Pair name={obj.symbol} key={obj.symbol} />
        ))}
      </div>
    </div>
  );
};

export default CurenciesList;
