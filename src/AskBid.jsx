import { useEffect, useState } from "react";

export default function AskBid() {
  const [ask, setAsk] = useState([]);
  useEffect(() => {
    const bid = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@depth20@1000ms"
    );
    bid.addEventListener("message", (e) => {
      const response = JSON.parse(e.data);
      setAsk(response.bids);
    });
  }, []);

  return (
    <div>
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
