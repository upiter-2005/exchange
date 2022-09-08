import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import styles from "./CurenciesList.module.scss";
import Pair from "../Pair";
import { filterList } from "../../DB_local/settings";

const CurenciesList = () => {
  const [newPairs, setNewPairs] = useState([]);
  // const [searchVal, setSearchVal] = useState("");

  // const exchangeTo = useSelector((state) => state.activePair.exchangeTo);

  const getAllPairs = () => {
    let items = [];
    items = filterList.usdt;
    console.log(items);
    // const listPairs = items.slice(0, 25);

    setNewPairs(items);
  };

  // const filterPairs = (val) => {
  //   dispatch(setFilter(val));
  // };

  useEffect(() => {
    getAllPairs();
  }, []);

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
        {FILTERS.map((obj) => (
          <button
            type="button"
            onClick={() => filterPairs(obj)}
            className={obj === filter ? "filterButton  active" : "filterButton"}
            key={obj}
          >
            {obj}
          </button>
        ))}
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
