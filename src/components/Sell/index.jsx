/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Slider from "@mui/material/Slider";
import { addOrderSell } from "../../redux/slices/userSlice";
import styles from "./Sell.module.scss";

const marks = [
  {
    value: 0,
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
  },
];

export default function Sell() {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [validOrder, setValidOrder] = useState(false);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);
  const currency = useSelector((state) => state.activePair.currency);
  const clickPrice = useSelector((state) => state.activePair.clickPrice);
  const balanceCoin = useSelector((state) => state.user.balance);
  const updating = useSelector((state) => state.user.updating);

  const priceHandler = (e) => {
    setPriceValue(e.target.value);
  };

  const makeOrder = () => {
    if (amount < 0.00000001) {
      alert("Insert coin amount");

      return false;
    }
    if (priceValue === 0) {
      alert("Insert price value");

      return false;
    }
    if (validOrder) {
      const time = moment().format("DD-MM-YYYY hh:mm:ss");
      const order = {
        currency: currency.toUpperCase(),
        exchangeTo,
        price: Number(priceValue),
        amount: Number(amount),
        type: "sell",
        time,
      };
      dispatch(addOrderSell(order));
    }
  };

  useEffect(() => {
    setPriceValue(clickPrice);
  }, [clickPrice, currency]);

  useEffect(() => {
    if (balanceCoin[currency]) {
      setBalance(parseFloat(balanceCoin[currency]).toFixed(6));
      setValidOrder(true);
    } else {
      setBalance(0);
      setValidOrder(false);
    }
  }, [currency, balanceCoin]);

  const valuetext = (value) => {
    const res = parseFloat((value / 100) * balance).toFixed(4);
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
        <span className="avaliable__valueResult">
          - &gt; {parseFloat(amount * priceValue).toFixed(2)} {exchangeTo}
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
      {/* divider area */}
      <div className="tradeBox__field">
        <div className="tradeBox__field-prefix">
          <label htmlFor="amount_field">Amount</label>
        </div>
        <input
          type="number"
          id="amount_field"
          className="tradeBox__field-input"
          value={amount}
          disabled="true"
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
        disabled={updating}
        onClick={makeOrder}
        className={
          balance === 0
            ? `${styles.sellButton} ${styles.tradeButton} ${styles.noBalace}`
            : `${styles.sellButton} ${styles.tradeButton}`
        }
      >
        Sell {currency}
      </button>
    </div>
  );
}
