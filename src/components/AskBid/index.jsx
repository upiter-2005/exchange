import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setClickPrice } from "../../redux/slices/activePair";
import styles from "./AskBid.module.scss";
import LoaderAsk from "./LoaderAsk";

export default function AskBid() {
  const dispatch = useDispatch();
  const colorPraice = useRef("");
  const arrow = useRef("");

  const currency = useSelector((state) => state.activePair.currency);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);

  const [ask, setAsk] = useState([]);
  const [bidList, setBidList] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pair = (currency + exchangeTo).toLowerCase();
    setLoading(false);
    const bid = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@depth20@1000ms`
    );
    bid.addEventListener("message", (e) => {
      const response = JSON.parse(e.data);
      setAsk(response.asks);
      setBidList(response.bids);
      setLoading(true);
    });

    const priceSocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@trade`
    );
    priceSocket.addEventListener("message", (e) => {
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
      priceSocket.close();
      bid.close();
    };
  }, [currency]);

  const loaderAsk = [...new Array(14)].map((item, i) => <LoaderAsk key={i} />);

  return (
    <div className={styles.askBid}>
      <div className={styles.askBidInner}>
        <div className={styles.askBidTitle}>
          <div className={styles.askBidColumns}>Price</div>
          <div className={styles.askBidColumns}>
            Amount <span>({currency})</span>
          </div>
          <div className={styles.askBidColumns}>Total({exchangeTo})</div>
        </div>
        {!loading
          ? loaderAsk
          : ask.map((obj, i) => (
              <li
                key={i}
                className={`${styles.askBidItem} ${styles.askBidInnerRed}`}
              >
                <span
                  className={styles.askBidColumns}
                  onClick={() =>
                    dispatch(setClickPrice(parseFloat(obj[0]).toFixed(2)))
                  }
                >
                  {parseFloat(obj[0]).toFixed(2)}
                </span>
                <span className={styles.askBidColumns}>
                  {parseFloat(obj[1]).toFixed(5)}
                </span>
                <span className={styles.askBidColumns}>
                  {parseFloat(obj[0] * obj[1]).toFixed(2)}
                </span>
              </li>
            ))}
      </div>
      {/* <div className={styles.askBidCurrentPrice}>{currentPrice}</div> */}
      <div className={`${colorPraice.current} currentPrice`}>
        {currentPrice}
        <span className="material-symbols-outlined askBidArrow">
          {arrow.current}
        </span>
      </div>
      <div className={`${styles.askBidInner} `}>
        {!loading
          ? loaderAsk
          : bidList.map((obj, i) => (
              <li
                key={i}
                className={`${styles.askBidItem} ${styles.askBidInnerGreen}`}
              >
                <span
                  className={styles.askBidColumns}
                  onClick={() =>
                    dispatch(setClickPrice(parseFloat(obj[0]).toFixed(2)))
                  }
                >
                  {parseFloat(obj[0]).toFixed(2)}
                </span>
                <span className={styles.askBidColumns}>
                  {parseFloat(obj[1]).toFixed(5)}
                </span>
                <span className={styles.askBidColumns}>
                  {parseFloat(obj[0] * obj[1]).toFixed(2)}
                </span>
              </li>
            ))}
      </div>
    </div>
  );
}
