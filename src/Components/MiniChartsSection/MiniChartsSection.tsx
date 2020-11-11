import React from "react";
import MiniChart from "../Peripherals/MiniChart/MiniChart";

import "./MiniChartsSection.scss"

const backgroundColor = [
  "#39a2a9",
  "#8b62d1",
  "#5fc27e",
  "#f22034",
  "#e9db1d",
  "#355fff",
  "#97d4d8",
  "#c5adee",
  "#98e6b1",
  "#f87683",
  "#f1ea7b",
  "#99adff",
];

const dataLine=  {
      labels: ["0", "1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          fill: false,
          lineTention: 1,
          label: "Channel 1",
          backgroundColor: backgroundColor[0],
          borderColor: backgroundColor[0],
          data: [0, 10, 5, 2, 20, 30, 25],
        },
        {
          fill: false,
          lineTention: 1,
          borderDash: [20, 30],
          label: "Channel 2",
          backgroundColor: backgroundColor[1],
          borderColor: backgroundColor[1],
          data: [0, 5, 10, 15, 10, 30, 45],
        },
         {
          fill: false,
          lineTention: 1,
        //   borderDash: [20, 30],
          label: "Channel 3",
          backgroundColor: backgroundColor[3],
          borderColor: backgroundColor[3],
          data: [0, 10, 15, 5, 30, 20, 65],
        },
      ],
    };

    const optionsLine={
      bezierCurve: false,
      maintainAspectRatio: false,
      responsive: true,
    //   onHover: function (event, elements) {
    //     hoverOverChart(this, event);
    //   },
      elements: {
        line: {
          // tension: 0.1,
          borderWidth: 2,
        },
        point: {
          borderWidth: 1,
          hoverBorderWidth: 1,
          hitRadius: 1,
          pointStyle: "dash",
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      legend: {
        display: true,
        labels: {
          fontColor: "gray",
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: "\xB0C",
            },
            ticks: {
              beginAtZero: true,
              fontColor: "black",
              // max: this.state.maxTempChart,
              // min: this.state.minTempChart,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: "mm:s:ms",
            },
            ticks: {
              fontColor: "black",
            },
          },
        ],
      },
    };


     const  dataPie={
      labels: [
        "Zone 1",
        "Zone 2",
        "Zone 3",
        "Zone 4",
        "Zone 4",
        "Zone 6",
        "Zone 7",
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };

    // Configuration options go here
    const optionsPie={
      percentageInnerCutout: 20,
      bezierCurve: true,
      maintainAspectRatio: false,
      responsive: true,
      elements: {
        line: {
          tension: 0,
          borderWidth: 1,
        },
        point: {
          borderWidth: 1,
          hoverBorderWidth: 1,
          hitRadius: 1,
          pointStyle: "dash",
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      legend: {
        display: true,
        labels: {
          fontColor: "gray",
        },
      },
    };

const MiniChartsSection:React.FC=()=>{
    return(
        <section className="mini-charts-section">

           <MiniChart type="line" data={dataLine} options={optionsLine} />
           <MiniChart type="doghnut" data={dataPie} options={optionsPie} />
        </section>
    )
}

export default MiniChartsSection;