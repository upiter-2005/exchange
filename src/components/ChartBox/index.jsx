/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Chart from "react-apexcharts";
import { chartSettings } from "../../DB_local/chartSettings";
import { setInterval } from "../../redux/slices/activePair";
import { candlesUrl } from "../../api/apiUrls";
import styles from "./ChartBox.module.scss";
import { intervals } from "../../DB_local/intervals";

export default function ChartBox() {
  const dispatch = useDispatch();

  const currency = useSelector((state) => state.activePair.currency);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);
  const chartInterval = useSelector((state) => state.activePair.chartInterval);

  const [candles, setCandles] = useState([
    {
      name: "candle",
      data: [
        {
          x: new Date(1538866800000),
          y: [6591.97, 6596.07, 6585, 6588.39],
        },
        {
          x: new Date(1538868600000),
          y: [6587.6, 6598.21, 6587.6, 6594.27],
        },
        {
          x: new Date(1538870400000),
          y: [6596.44, 6601, 6590, 6596.55],
        },
        {
          x: new Date(1538872200000),
          y: [6598.91, 6605, 6596.61, 6600.02],
        },
        {
          x: new Date(1538874000000),
          y: [6600.55, 6605, 6589.14, 6593.01],
        },
        {
          x: new Date(1538875800000),
          y: [6593.15, 6605, 6592, 6603.06],
        },
        {
          x: new Date(1538877600000),
          y: [6603.07, 6604.5, 6599.09, 6603.89],
        },
        {
          x: new Date(1538879400000),
          y: [6604.44, 6604.44, 6600, 6603.5],
        },
        {
          x: new Date(1538881200000),
          y: [6603.5, 6603.99, 6597.5, 6603.86],
        },
        {
          x: new Date(1634883000000),
          y: [6603.85, 6605, 6600, 6604.07],
        },
        {
          x: new Date(1648884800000),
          y: [6604.98, 6606, 6604.07, 6606],
        },
      ],
    },
  ]);

  const makeDataChart = async () => {
    const chartUrl = candlesUrl(
      (currency + exchangeTo).toUpperCase(),
      chartInterval
    );
    const response = await fetch(chartUrl)
      .then((data) => data.json())
      .then((data) => data);
    const parseData = [];
    response.reverse().forEach((el, i) => {
      if (i > 130) return false;
      const open = parseFloat(el[1]).toFixed(2);
      const high = parseFloat(el[2]).toFixed(2);
      const low = parseFloat(el[3]).toFixed(2);
      const close = parseFloat(el[4]).toFixed(2);
      parseData.push({
        x: new Date(el[0]),
        y: [Number(open), Number(high), Number(low), Number(close)],
      });
    });

    setCandles((prevCandles) => [
      {
        ...prevCandles.name,
        data: parseData,
      },
    ]);
  };

  useEffect(() => {
    makeDataChart();
  }, [chartInterval, currency, exchangeTo]);

  return (
    <div>
      <div className={styles.chartIntervals}>
        <span>Time:</span>
        {intervals.map((obj) => (
          <button
            type="button"
            className={
              obj === chartInterval
                ? `${styles.activeInterval} ${styles.butInterval}`
                : `${styles.butInterval}`
            }
            key={obj}
            onClick={() => {
              dispatch(setInterval(obj));
            }}
          >
            {obj}
          </button>
        ))}
      </div>
      <Chart
        options={chartSettings}
        series={candles}
        height="430px"
        type="candlestick"
      />
    </div>
  );
}
