import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Pair.module.scss";

export default function Pair({ name }) {
  const [price, setPrice] = useState("");
  const [formatName, setFormatName] = useState("");
  const [exchangeCurrency, setExchangeCurrency] = useState("USDT");

  useEffect(() => {
    // makeCandleChart();

    const pair = name.toLowerCase();
    setFormatName(name.replace("USDT", "/"));

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);
    ws.addEventListener("message", (e) => {
      const res = JSON.parse(e.data);
      //   const roundPrice = parseInt(res.p).toFixed(2)
      setPrice(parseFloat(res.p).toFixed(2));
    });
  }, []);

  if (!price) return false;

  return (
    <Link to={`/pair/${name}`} className={styles.pairItem}>
      <div className={styles.pairItemName}>
        <span className={styles.pairWhite}>{formatName}</span>
        <span>{exchangeCurrency}</span>
      </div>
      <div className={styles.pairItemPrice}>{price}</div>
    </Link>
  );
}
