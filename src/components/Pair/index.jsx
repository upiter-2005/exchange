import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { setCurrency } from "../../redux/slices/activePair";

import styles from "./Pair.module.scss";
import { dayDataUrl } from "../../api/apiUrls";

export default function Pair({ name }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);

  const colorPraice = useRef("");
  const persentColor = useRef("");
  const [price, setPrice] = useState(0);
  const [persent, setPersent] = useState(0);
  const [formatName, setFormatName] = useState("");

  const switchCurrency = () => {
    const queryString = qs.stringify({ pair: name });
    navigate(`?${queryString}`);

    dispatch(setCurrency(name.replace("USDT", "")));
  };
  const findPercent = async () => {
    const dayData = await fetch(`${dayDataUrl}${name} `)
      .then((data) => data.json())
      .then((data) => data);
    const priceChangePercent = (
      ((dayData.lastPrice - dayData.openPrice) / dayData.lastPrice) *
      100
    ).toFixed(2);
    if (priceChangePercent > 0) {
      persentColor.current = "rise";
    } else {
      persentColor.current = "low";
    }
    setPersent(priceChangePercent);
  };

  useEffect(() => {
    // makeCandleChart();

    const pair = name.toLowerCase();
    setFormatName(name.replace("USDT", "/"));

    // const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

    // This request equel to common panel above chart
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@miniTicker`
    );
    ws.addEventListener("message", (e) => {
      const res = JSON.parse(e.data);
      const roundPrice = parseFloat(res.c).toFixed(2);
      findPercent();
      setPrice((prevPrice) => {
        if (prevPrice > roundPrice) {
          colorPraice.current = "low";
        } else {
          colorPraice.current = "rise";
        }

        return roundPrice;
      });
    });
  }, []);

  if (!price) return false;

  return (
    <div className={styles.pairItem} onClick={switchCurrency}>
      <div className={styles.pairItemName}>
        <span className={styles.pairWhite}>{formatName}</span>
        <span>{exchangeTo}</span>
      </div>
      <div className={`${styles.pairItemPrice} ${colorPraice.current}`}>
        {price}
      </div>
      <div className={persentColor.current}>{persent}%</div>
    </div>
  );
}
