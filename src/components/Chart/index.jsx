/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ApexCharts from "apexcharts";
import { setInterval } from "../../redux/slices/activePair";
import { candlesUrl } from "../../api/apiUrls";
import styles from "./Chart.module.scss";
import { intervals } from "../../DB_local/intervals";

export default function Chart() {
  const dispatch = useDispatch();
  const chartContainer = useRef();

  const currency = useSelector((state) => state.activePair.currency);
  const exchangeTo = useSelector((state) => state.activePair.exchangeTo);
  const chartInterval = useSelector((state) => state.activePair.chartInterval);

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
      parseData.push([
        el[0],
        [Number(open), Number(high), Number(low), Number(close)],
      ]);
    });

    const options = {
      chart: {
        width: "100%",
        heaight: "445px",
        type: "candlestick",
        zoom: {
          enabled: true,
          autoScaleYaxis: true,
        },
      },

      plotOptions: {
        candlestick: {
          colors: {
            upward: "rgb(0,255,0)",
            downward: "rgb(255,0,0)",
          },
        },
      },
      series: [
        {
          data: parseData,
        },
      ],
      xaxis: {
        type: "datetime",
        tickAmount: 6,
        labels: {
          style: {
            colors: "#fff",
          },
        },
        crosshairs: {
          stroke: {
            color: "#fff",
          },
        },
      },
      noData: {
        text: "Loading...",
      },
      yaxis: {
        opposite: true,
        tickAmount: 15,
        tooltip: { enabled: true },
        labels: {
          style: {
            colors: "#fff",
          },
        },
        crosshairs: {
          stroke: {
            color: "#fff",
          },
        },
      },
      grid: {
        borderColor: "#676767",

        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        row: {
          colors: ["#1a1a1a"],
          opacity: 0.1,
        },
        column: {
          colors: ["#1a1a1a"],
          opacity: 0.1,
        },
      },
    };
    const chart = new ApexCharts(chartContainer.current, options);
    chart.render();
  };

  // useEffect(() => {
  //   makeDataChart();
  // }, []);
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
      <div ref={chartContainer} className={styles.chartWrapper}></div>
    </div>
  );
}
