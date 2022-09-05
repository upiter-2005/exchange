/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { candlesUrl } from "../../api/apiUrls";
import styles from "./Chart.module.scss";

export default function Chart() {
  const chartContainer = useRef();

  const makeDataChart = async () => {
    const response = await fetch(candlesUrl)
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
        tickAmount: 20,
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

  useEffect(() => {
    makeDataChart();
  }, []);

  return (
    <div>
      <div ref={chartContainer} className={styles.chartWrapper}></div>
    </div>
  );
}
