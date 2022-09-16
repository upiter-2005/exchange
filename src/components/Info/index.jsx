import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Info.module.scss";

export default function Info() {
  const currency = useSelector((state) => state.activePair.currency);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);

  const colorPraice = useRef("");
  const arrow = useRef("");
  const persentColor = useRef("");

  const [currentPrice, setCurrentPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [hightPrice, setHightPrice] = useState("");
  const [persentChange, setPersentChange] = useState("");

  useEffect(() => {
    const pairParams = (currency + exchangeTo).toLowerCase();
    const ws2 = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pairParams}@ticker`
    );
    ws2.addEventListener("message", (e) => {
      const res = JSON.parse(e.data);

      const priceChangePercent = (((res.c - res.o) / res.c) * 100).toFixed(2);
      if (priceChangePercent > 0) {
        persentColor.current = "rise";
      } else {
        persentColor.current = "low";
      }
      setPersentChange(priceChangePercent);
      setLowPrice(parseFloat(res.l).toFixed(2));
      setHightPrice(parseFloat(res.h).toFixed(2));
    });

    const pair = (currency + exchangeTo).toLowerCase();
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);
    ws.addEventListener("message", (e) => {
      const res = JSON.parse(e.data);
      const roundPrice = parseFloat(res.p).toFixed(2);

      setCurrentPrice((prevCurrentPrice) => {
        if (prevCurrentPrice > roundPrice) {
          colorPraice.current = "low";
          arrow.current = "arrow_downward";
        } else {
          colorPraice.current = "rise";
          arrow.current = "arrow_upward";
        }

        return roundPrice;
      });
    });

    return () => {
      ws.close();
      ws2.close();
    };
  }, [currency]);

  return (
    <div className={styles.infoBox}>
      <div className={styles.infoBoxName}>{currency + exchangeTo}</div>
      <div className={`${colorPraice.current} currentPrice`}>
        {currentPrice}
        <span className="material-symbols-outlined">{arrow.current}</span>
      </div>
      <div className={styles.infoBoxItem}>
        <div className={styles.infoBoxTop}>24h Change</div>
        <div className={persentColor.current}>{persentChange}%</div>
      </div>
      <div className={styles.infoBoxItem}>
        <div className={styles.infoBoxTop}>24h High</div>
        <div>{hightPrice}</div>
      </div>
      <div className={styles.infoBoxItem}>
        <div className={styles.infoBoxTop}>24h Low</div>
        <div>{lowPrice}</div>
      </div>
    </div>
  );
}
