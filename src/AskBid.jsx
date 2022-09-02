import React from "react";
import { useEffect, useState } from "react";

export default function AskBid() {
  const [ask, setAsk] = useState([]);
  useEffect(() => {
    let bid = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth20@1000ms");
    bid.addEventListener("message", (e) => {
      let bid = JSON.parse(e.data);
      setAsk(bid.bids);
    });
  }, []);
  return (
    <div>
      {/* {console.log(ask)} */}

      {ask.map((obj, i) => (
        <li key={i}>
          <span>{obj[0]}</span>
          <br />
          <span>{obj[1]}</span>
        </li>
      ))}
    </div>
  );
}
