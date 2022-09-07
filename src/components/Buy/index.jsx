/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import styles from "./Buy.module.scss";

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

export default function Buy() {
  const [priceValue] = useState(0);
  // const priceEl = useRef();
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);
  const currency = useSelector((state) => state.activePair.currency);

  const priceHandler = () => {
    console.log("price ch");
  };
  const amountHandler = () => {
    console.log("amount ch");
  };

  const valuetext = (value) => `${value}%`;

  return (
    <div className="tradeBox">
      <div className="avaliable">
        Avlb <span className="avaliable__value">7777 USDT</span>
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
          value={priceValue}
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
        className={`${styles.buyButton} ${styles.tradeButton}`}
      >
        Buy {currency}
      </button>
    </div>
  );
}
