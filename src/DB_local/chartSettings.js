export const chartSettings = {
  chart: {
    type: "candlestick",
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "rgb(0,255,0)",
        downward: "rgb(255,0,0)",
      },
    },
  },
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
  tooltip: {},
};
