import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import qs from "qs";
import { setCurrency, setClickPrice } from "../../redux/slices/activePair";

import styles from "./Pair.module.scss";

export default function Pair({ symbol, lastPrice, openPrice, askPrice }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const colorPraice = useRef("");
  const persentColor = useRef("");
  const [price, setPrice] = useState(0);
  const [persent, setPersent] = useState(0);

  const switchCurrency = () => {
    const queryString = qs.stringify({ pair: symbol });
    navigate(`?${queryString}`);
    document.title = `${symbol} - Bitlex`;
    dispatch(
      setCurrency({
        currency: symbol.replace("USDT", "").toUpperCase(),
        exchangeTo: "USDT",
      })
    );
  };

  const findPercent = () => {
    const priceChangePercent = (
      ((lastPrice - openPrice) / lastPrice) *
      100
    ).toFixed(2);
    if (priceChangePercent > 0) {
      persentColor.current = "rise";
    } else {
      persentColor.current = "low";
    }

    const roundPrice = parseFloat(askPrice).toFixed(2);

    setPrice((prevPrice) => {
      if (prevPrice > roundPrice) {
        colorPraice.current = "low";
      } else {
        colorPraice.current = "rise";
      }

      return roundPrice;
    });

    setPersent(priceChangePercent);
  };

  useEffect(() => {
    findPercent();
    dispatch(setClickPrice(0));
  }, [lastPrice]);

  return (
    <div className={styles.pairItem} onClick={switchCurrency}>
      <div className={styles.pairItemName}>
        <span className={styles.pairWhite}>{symbol}</span>
      </div>
      <div className={`${styles.pairItemPrice} ${colorPraice.current}`}>
        {price}
      </div>
      <div className={persentColor.current}>{persent}%</div>
    </div>
  );
}
