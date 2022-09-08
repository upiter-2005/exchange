import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { setCurrency } from "../../redux/slices/activePair";

import LoaderAsk from "./LoaderAsk";

import styles from "./Pair.module.scss";
import { dayDataUrl } from "../../api/apiUrls";

export default function Pair({ name }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);
  const filter = useSelector((state) => state.filter.filterTo);

  const colorPraice = useRef("");
  const persentColor = useRef("");
  const [price, setPrice] = useState(0);
  const [persent, setPersent] = useState(0);
  const [formatName, setFormatName] = useState("");

  const switchCurrency = () => {
    const queryString = qs.stringify({ pair: name });
    navigate(`?${queryString}`);

    dispatch(
      setCurrency({
        currency: name.replace(exchangeTo, ""),
        exchangeTo: filter.toUpperCase(),
      })
    );
  };

  const findPercent = () => {
    let point = 2;
    if (filter === "eth") point = 4;
    if (filter === "btc") point = 6;
    if (filter === "bnb") point = 6;
    const pair = (name + filter).toUpperCase();
    setInterval(async () => {
      const dayData = await fetch(`${dayDataUrl}${pair}`)
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

      const roundPrice = parseFloat(dayData.askPrice).toFixed(point);
      setPrice((prevPrice) => {
        if (prevPrice > roundPrice) {
          colorPraice.current = "low";
        } else {
          colorPraice.current = "rise";
        }

        return roundPrice;
      });

      setPersent(priceChangePercent);
    }, 2500);
  };

  useEffect(() => {
    const pair = (name + filter).toLowerCase();
    setFormatName(pair.replace(filter, `/${filter}`));
    findPercent();
    // const ws = new WebSocket(
    //   `wss://stream.binance.com:9443/ws/${pair}@miniTicker`
    // );
    // ws.addEventListener("message", (e) => {
    //   const res = JSON.parse(e.data);
    //   const roundPrice = parseFloat(res.c).toFixed(point);
    //  // findPercent();
    //   setPrice((prevPrice) => {
    //     if (prevPrice > roundPrice) {
    //       colorPraice.current = "low";
    //     } else {
    //       colorPraice.current = "rise";
    //     }

    //     return roundPrice;
    //   });
    // });
  }, []);

  if (!price) return <LoaderAsk />;

  return (
    <div className={styles.pairItem} onClick={switchCurrency}>
      <div className={styles.pairItemName}>
        <span className={styles.pairWhite}>{formatName}</span>
        {/* <span>{filter}</span> */}
      </div>
      <div className={`${styles.pairItemPrice} ${colorPraice.current}`}>
        {price}
      </div>
      <div className={persentColor.current}>{persent}%</div>
    </div>
  );
}
