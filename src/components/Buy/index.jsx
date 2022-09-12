/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Slider from "@mui/material/Slider";
import { addOrderBuy } from "../../redux/slices/userSlice";
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
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [validOrder, setValidOrder] = useState(false);

  const clickPrice = useSelector((state) => state.activePair.clickPrice);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);
  const currency = useSelector((state) => state.activePair.currency);
  const balanceCoin = useSelector((state) => state.user.balance);

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
        price: priceValue,
        amount,
        type: "buy",
        time,
      };
      dispatch(addOrderBuy(order));
    }
  };

  const priceHandler = (e) => {
    setPriceValue(e.target.value);
  };

  useEffect(() => {
    setPriceValue(clickPrice);
  }, [clickPrice, currency]);

  useEffect(() => {
    if (balanceCoin[exchangeTo]) {
      setBalance(balanceCoin[exchangeTo].toFixed(2));
      setValidOrder(true);
    } else {
      setBalance(0);
      setValidOrder(false);
    }
  }, [exchangeTo, balanceCoin]);

  const valuetext = (value) => {
    const res = (
      (balanceCoin[exchangeTo] / priceValue) *
      (value / 100)
    ).toFixed(4);
    if (res) {
      setValidOrder(true);
    }
    setAmount(res);

    return `${value}%`;
  };

  return (
    <div className="tradeBox">
      <div className="avaliable">
        Avlb{" "}
        <span className="avaliable__value">
          {balance} {exchangeTo}
        </span>
      </div>
      <div className="tradeBox__field">
        <div className="tradeBox__field-prefix">
          <label htmlFor="price_field_buy">Price</label>
        </div>
        <input
          type="number"
          id="price_field_buy"
          className="tradeBox__field-input"
          value={priceValue}
          onChange={priceHandler}
        />
        <div className="tradeBox__field-sufix">
          <label htmlFor="price_field_buy">{exchangeTo}</label>
        </div>
      </div>

      <div className="tradeBox__field">
        <div className="tradeBox__field-prefix">
          <label htmlFor="amount_field_buy">Amount</label>
        </div>
        <input
          type="number"
          id="amount_field_buy"
          className="tradeBox__field-input"
          value={amount}
          disabled="true"
        />
        <div className="tradeBox__field-sufix">
          <label htmlFor="amount_field_buy">{currency}</label>
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
        onClick={makeOrder}
        className={
          balance === 0
            ? `${styles.buyButton} ${styles.tradeButton} ${styles.noBalace}`
            : `${styles.buyButton} ${styles.tradeButton}`
        }
      >
        Buy {currency}
      </button>
    </div>
  );
}
