/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Slider from "@mui/material/Slider";
import styles from "./Sell.module.scss";

const marks = [
  {
    value: 0,
    //  label: "0%",
  },
  {
    value: 25,
    label: "25%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 75,
    label: "75%",
  },
  {
    value: 100,
    // label: "100%",
  },
];

export default function Sell() {
  const [balance, setBalance] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);
  const currency = useSelector((state) => state.activePair.currency);
  const balanceCoin = useSelector((state) => state.user.balance);
  // console.log(balanceCoin);
  const priceHandler = (e) => {
    setPriceValue(e.target.value);
  };

  const amountHandler = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    if (balanceCoin[currency]) {
      setBalance(balanceCoin[currency]);
    } else {
      setBalance(0);
    }
  }, [currency]);
  const valuetext = (value) => {
    const res = (value / 100) * balance;
    setAmount(res);

    return `${value}%`;
  };

  return (
    <div className="tradeBox">
      <div className="avaliable">
        Avlb{" "}
        <span className="avaliable__value">
          {balance} {currency}
        </span>
      </div>
      <div className="tradeBox__field">
        <div className="tradeBox__field-prefix">
          <label htmlFor="price_field">Price</label>
        </div>
        <input
          type="number"
          id="price_field"
          className="tradeBox__field-input"
          value={priceValue}
          onChange={priceHandler}
        />
        <div className="tradeBox__field-sufix">
          <label htmlFor="price_field">{exchangeTo}</label>
        </div>
      </div>

      <div className="tradeBox__field">
        <div className="tradeBox__field-prefix">
          <label htmlFor="amount_field">Amount</label>
        </div>
        <input
          type="number"
          id="amount_field"
          className="tradeBox__field-input"
          value={amount}
          onChange={amountHandler}
        />
        <div className="tradeBox__field-sufix">
          <label htmlFor="amount_field">{currency}</label>
        </div>
      </div>
      <Slider
        aria-label="Custom marks"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
      />

      <button
        type="button"
        className={`${styles.sellButton} ${styles.tradeButton}`}
      >
        Sell {currency}
      </button>
    </div>
  );
}
