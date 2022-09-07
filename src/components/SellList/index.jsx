import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./SellList.module.scss";
import Loader from "./Loader";

export default function SellList() {
  const currency = useSelector((state) => state.activePair.currency);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);

  const [sellItems, setSellItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (miliseconds) => {
    const t = new Date(Number(miliseconds));
    const h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();

    if (m < 10) {
      m = `0${m}`;
    }
    if (s < 10) {
      s = `0${s}`;
    }

    return `${h}:${m}:${s}`;
  };
  useEffect(() => {
    const pair = (currency + exchangeTo).toLowerCase();
    setLoading(false);
    const sell = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@trade`
    );
    sell.addEventListener("message", (e) => {
      const response = JSON.parse(e.data);
      console.log(response);
      setLoading(true);
      const time = formatDate(response.E);
      const price = parseFloat(response.p).toFixed(2);
      const amount = parseFloat(response.q).toFixed(5);
      const market = response.m;
      setSellItems((prevSellItems) => {
        if ([...prevSellItems].length > 31) {
          const temp = [...prevSellItems].splice(0, 15);

          return [...temp, [price, amount, time, market]];
        }

        return [...prevSellItems, [price, amount, time, market]];
      });
    });

    return () => {
      sell.close();
    };
  }, [currency]);

  const loader = [...new Array(14)].map((item, i) => <Loader key={i} />);

  return (
    <div className={styles.sellList}>
      <div className={styles.sellListInner}>
        <div className={styles.sellListTitle}>
          <div className={styles.sellListColumns}>Price</div>
          <div className={styles.sellListColumns}>
            Amount <span>({currency})</span>
          </div>
          <div className={styles.sellListColumns}>Time</div>
        </div>
        {!loading
          ? loader
          : sellItems.reverse().map((obj, i) => (
              <div
                key={i}
                className={
                  obj[3]
                    ? `${styles.sellListItem} ${styles.sellListInnerRed}`
                    : `${styles.sellListItem} ${styles.sellListInnerGreen}`
                }
              >
                <span className={styles.sellListColumns}>{obj[0]}</span>
                <span className={styles.sellListColumns}>{obj[1]}</span>
                <span className={styles.sellListColumns}>{obj[2]}</span>
              </div>
            ))}
      </div>
    </div>
  );
}
