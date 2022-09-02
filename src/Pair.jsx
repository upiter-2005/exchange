import React from "react";
import { useEffect, useState } from "react";
//import Chart from "react-google-charts";
import { candlesUrl } from "./api/apiUrls";

export default function Pair({ name }) {
  const [candleData, setCandleData] = useState([]);
  const [price, setPrice] = useState("");

  const makeCandleChart = async () => {
    const chart = await fetch(candlesUrl)
      .then((data) => data.json())
      .then((data) => data);
    let newArr = [["day", "a", "b", "c", "d"]];

    chart.reverse().forEach((obj, i) => {
      if (i > 200) return false;
      let d = new Date(obj[0]);
      d.toLocaleDateString("en-US");
      newArr.push([d, parseInt(obj[1]), parseInt(obj[2]), parseInt(obj[3]), parseInt(obj[4])]);
    });
    setCandleData(newArr);
  };

  useEffect(() => {
    // makeCandleChart();

    const pair = name.toLowerCase();
    let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);
    ws.addEventListener("message", (e) => {
      let res = JSON.parse(e.data);
      const roundPrice = parseInt(res.p).toFixed(2);
      setPrice(roundPrice);
    });
  }, []);

  if (!price) return false;
  return (
    <div className="price">
      {/* <Chart
        width={"80%"}
        height={650}
        chartType="CandlestickChart"
        loader={<div>Loading Chart</div>}
        data={candleData}
        options={{
          legend: "none",
          titleTextStyle: {
            color: "#fff",
          },
          hAxis: {
            titleTextStyle: {
              color: "#fff",
            },
            textStyle: {
              color: "#fff",
              fontSize: 13,
              bold: false,
            },
          },
          vAxis: {
            titleTextStyle: {
              color: "#fff",
            },
            textStyle: {
              color: "#fff",
              fontSize: 13,
              bold: false,
            },
          },
          backgroundColor: "#333",
          candlestick: {
            hollowIsRising: false,
            fallingColor: { strokeWidth: 0, fill: "#eee" }, // red
            risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
          },
        }}
        rootProps={{ "data-testid": "1" }}
      /> */}
      <span>{name}</span>
      {price}
    </div>
  );
}
