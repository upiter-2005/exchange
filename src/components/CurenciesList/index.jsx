import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./CurenciesList.module.scss";
import Pair from "../Pair";
import { list } from "../../utils/settings";

const CurenciesList = () => {
  const [newPairs, setNewPairs] = useState([]);
  // const [searchVal, setSearchVal] = useState("");

  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);

  const getAllPairs = async () => {
    const items = list.filter((obj) => obj.includes(exchangeTo));
    const listPairs = items.slice(0, 15);

    setNewPairs(listPairs);
  };
  // const filterPairs = (query) => {
  //   const filtered = list.filter((obj) => obj.includes(query.toUpperCase()));

  //   setNewPairs(filtered);
  //   console.log(filtered);
  // };
  useEffect(() => {
    getAllPairs();
  }, [exchangeTo]);

  // const findPair = (e) => {
  //   setSearchVal(e.target.value);
  //   filterPairs(e.target.value);
  // };

  return (
    <div className={styles.currencyListContainer}>
      {/* <div className={styles.currencyListSearch}>
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
      </div> */}
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
