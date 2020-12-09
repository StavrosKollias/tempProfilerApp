
import React, { useEffect, useState } from "react";
import { backgroundColor, updateCharts } from "../../functions/toolkit";
import { IChannel, IChartData, IDataset} from "../../interfaces/utils";
import MiniChart from "../Peripherals/MiniChart/MiniChart";
import { IMiniChartsSectionProps } from "./IMinichartSectionProps";
import "./MiniChartsSection.scss"

var optionsLine={
  bezierCurve: false,
  maintainAspectRatio: false,
  responsive: true,
  elements: {
    line: {
      tension: 0.1,
      borderWidth: 1,
    },
    point: {
      borderWidth: 1,
      hoverBorderWidth: 1,
      hitRadius: 1,
      radius: 0     
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
          fontColor: "black",
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
          labelString: "m:s:ms",
        },
        ticks: {
          maxTicksLimit:11,
          fontColor: "black",
        },
      },
    ],
  },
};


const  dataPie :IChartData={
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
          data: [2, 10, 5, 2, 20, 30, 45],
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


const generateDataLine=(dataChannels:Array<IChannel>)=>{
  const datasets=[];
  dataChannels.map((e,i)=>{
     const newDataset:IDataset= {
          fill: false,
          lineTention: 1,
          type:"line",
          label: e.channelName,
          backgroundColor: backgroundColor[i],
          borderColor: backgroundColor[i],
          data: e.dataLine,
        };
        if(e.active) datasets.push(newDataset);
        // console.log(e.active);
        return e;
  });
  const data:IChartData=  {
        labels: dataChannels[0].dataLabels,
        datasets: datasets,
    };
    return data;
}


const generateChartOptionsUpdate=(options:any, dataSets:Array<IDataset>)=>{
  let max=null;
  let min= null;
  dataSets.map((e:IDataset,i:number)=>{
    const maxDataSetData= Math.max(...e.data);
    const minDataSetData= Math.min(...e.data);
    if(max){
     if( maxDataSetData > max )max = maxDataSetData;
    }else{
      max = maxDataSetData;
    }

    if(min){
       if( minDataSetData < min )min = minDataSetData;
    }else{
      min = minDataSetData;
    }
    return i ;
  });
  options.scales.yAxes[0].ticks.suggestedMin = Math.floor(min - Math.abs(max-min) * 0.5);
  options.scales.yAxes[0].ticks.suggestedMax = Math.ceil(max +  Math.abs(max-min) * 0.5);
  // options.scales.yAxes[0].ticks.min= Math.floor(min - Math.abs(max-min) * 0.2);
  // options.scales.yAxes[0].ticks.max= Math.ceil(max +  Math.abs(max-min) * 0.2);
  // console.log(max);
 optionsLine = options;
}


const MiniChartSectionState={dataLine:null,dataPie:null};
const MiniChartsSection:React.FC<IMiniChartsSectionProps>=(props)=>{
  const [state,setState]= useState(MiniChartSectionState);
    useEffect(()=>{
    const data=generateDataLine(props.channels);
        if(data.datasets.length>0){
            if(data.datasets[0].data.length>0){
              console.log("data Update here");
              generateChartOptionsUpdate(optionsLine, data.datasets);
               updateCharts(data.datasets);
              }
        }
        setState((state)=>{
        return{
          ...state,
          dataLine:data,
        }
        }); 
    },[props]);
    
    return(
        <section className="mini-charts-section">
           <MiniChart type="line" data={state.dataLine} options={optionsLine} template={props.template} />
           <MiniChart type="doghnut" data={dataPie} options={optionsPie} />
        </section>
    )
}

export default MiniChartsSection;