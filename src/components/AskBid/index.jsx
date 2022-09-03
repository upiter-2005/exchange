import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AskBid.module.scss";

export default function AskBid() {
  const currency = useSelector((state) => state.activePair.currency);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);
  console.log(currency);
  console.log(exchangeTo);
  const [ask, setAsk] = useState([]);
  const [bidList, setBidList] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    const bid = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@depth20@1000ms"
    );
    bid.addEventListener("message", (e) => {
      const response = JSON.parse(e.data);
      setAsk(response.asks);
      setBidList(response.bids);
    });

    const pair = (currency + exchangeTo).toLowerCase();
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);
    ws.addEventListener("message", (e) => {
      const res = JSON.parse(e.data);
      //   const roundPrice = parseInt(res.p).toFixed(2)
      setCurrentPrice(parseFloat(res.p).toFixed(2));
    });
  }, []);

  return (
    <div className={styles.askBid}>
      <div className={styles.askBidInner}>
        <div className={styles.askBidTitle}>
          <div>Price</div>
          <div>
            Amount <span>(BTC)</span>
          </div>
        </div>
        {ask.map((obj, i) => (
          <li key={i} className={styles.askBidItem}>
            <span>{obj[0]}</span>
            <br />
            <span>{obj[1]}</span>
          </li>
        ))}
      </div>
      <div className={styles.askBidCurrentPrice}>{currentPrice}</div>
      <div className={styles.askBidInner}>
        <div className={styles.askBidTitle}>
          <div>Price</div>
          <div>
            Amount <span>(BTC)</span>
          </div>
        </div>
        {bidList.map((obj, i) => (
          <li key={i} className={styles.askBidItem}>
            <span>{obj[0]}</span>
            <br />
            <span>{obj[1]}</span>
          </li>
        ))}
      </div>
    </div>
  );
}
