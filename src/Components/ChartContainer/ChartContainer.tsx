import React, { useEffect, useState } from "react";
import { generateTimeLabel } from "../../functions/toolkit";
import { backgroundColor, updateCharts } from "../../functions/toolkit";
import { Annotation, IChannel, IChartData, IDataset, IZone } from "../../interfaces/utils";
import TemperatureChart from "../TemperatureChart/TemperatureChart";
import "./ChartContainer.scss";


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
    annotation: {
        events: ["click", "mousedown"],
        dblClickSpeed: 3,
        annotations: [],
        drawTime: "beforeDatasetsDraw",
      },
};





// shouldComponentUpdate(nextProps, nextState) {
//   if (nextState.zommed) {
//     return false;
//   }
//   return true;
// }

  const generateLabelsChart=(datasets: any, activeZones, samplePeriod:number)=>{
    var lengthDataSet = 0;
    datasets.map((e, i) => {
      if (e.data.length > lengthDataSet) {
        lengthDataSet = e.data.length - 1;
      }
    });

 
    var labelsLength = 0;
    activeZones.map((e, i) => {
      labelsLength += 1;
    });
    if (labelsLength > lengthDataSet) {
        var length=0;
        for (var i = 0; i <= labelsLength-1 ; i++) {
            length+=parseInt(activeZones[i].value);
        }
        generateZonePosition(length);
        const speed= 500;
        const t= Math.ceil(length*100*60000/speed /1000) *1000;
        labelsLength=t/samplePeriod;
    }
    else{
      labelsLength=lengthDataSet;
    }

    var labels = [];
    let labelItem="0";
    for (var i = 0; i <= labelsLength; i++) {
       labels.push(`${labelItem}`);
        labelItem=generateTimeLabel(labelItem,samplePeriod);
     
      // }
    }
    return labels;
  }



const generateDataLine=(dataChannels:Array<IChannel>,zones:Array<IZone>,samplePeriod:number)=>{
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
        return e;
  });
  
 const test= generateLabelsChart(datasets,zones,samplePeriod);

  const data:IChartData=  {
        labels: test,
        datasets: datasets,
    };
    return data;
}
const generateZonePosition=(distance)=>{
    console.log(distance);
 const speed= 500; //mm/s;
        var t = Math.ceil(distance*100*60000/speed /1000) *1000; //adding 100ms or any other sample period
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        console.log(`${days*24*60+hours*60+minutes}:${seconds}:${Math.abs(minutes*60*1000-Math.abs(seconds*1000-t))}`)
    return `${days*24*60+hours*60+minutes}:${seconds}:${Math.abs(minutes*60*1000-Math.abs(seconds*1000-t))}`;
}

const handleZoneAnnotationDrag=(event: any)=>{
    const annotationsChart = event.subject.chart.options.annotation.annotations;
    const indexOfTarget = annotationsChart
      .map((e) => {
        return e.id;
      })
      .indexOf(event.subject.element.id);

    const verticalAnnotations = annotationsChart.filter((annotation) => {
      return annotation.mode == "vertical";
    });

    const indexVerticalAnnotanions = verticalAnnotations
      .map((e) => {
        return e.id;
      })
      .indexOf(event.subject.element.id);

    if (indexVerticalAnnotanions === 0) {
      annotationsChart[indexOfTarget].value = event.subject.config.value;

      event.subject.chart.clear();
      event.subject.chart.update();
      var annotationID = event.subject.element.id;
    //   this.handleChangeAnnotationsPosition(
    //     false,
    //     annotationID,
    //     event.subject.config.value
    //   );
    } else {
      const indexPreviousValue =
        verticalAnnotations[indexVerticalAnnotanions - 1].value;
      if (event.subject.config.value - indexPreviousValue >= 1) {
        annotationsChart[indexOfTarget].value = event.subject.config.value;

        event.subject.chart.clear();
        event.subject.chart.update();
        var annotationID = event.subject.element.id;
        // this.handleChangeAnnotationsPosition(
        //   false,
        //   annotationID,
        //   event.subject.config.value - indexPreviousValue
        // );
      }
    }
}

const handleChangeAnnotationsPosition=(
    horizontal: boolean,
    name: string | number,
    value: number,
    templateData:any
  ) =>{
    if (horizontal) {
     const testAnnotation= templateData.thresholds.find((x) =>
       Number(x.name) === name
     ).value = value;

     console.log(testAnnotation);
      // annotations.find((x) =>
      // {return Number(x.name) === name}).value = value;

    } else {

     templateData.zones.find((x) => x.name === name).value = value;
     
    }
}
   
const  handleThresholdAnnotationDrag=(event: any,template)=> {
   console.log(typeof event);
    const indexOfTarget = event.subject.chart.options.annotation.annotations
      .map((e) => {
        return e.id;
      })
      .indexOf(event.subject.element.id);

    event.subject.chart.options.annotation.annotations[indexOfTarget].value =
      event.subject.config.value;
    event.subject.chart.update();

    var annotationID = event.subject.chart.options.annotation.annotations[
      indexOfTarget
    ].id
      .replace(/([A-Z])/g, "")
      .replace(/([a-z])/g, "");

     if(event.subject.chart.options.scales.yAxes[0].ticks.suggestedMax <= Number(event.subject.config.value.toFixed(0))) event.subject.chart.options.scales.yAxes[0].ticks.suggestedMax = Number(event.subject.config.value.toFixed(0)) + 0.1* Number(event.subject.config.value.toFixed(0));
   handleChangeAnnotationsPosition(
      true,
      Number(annotationID),
      Number(event.subject.config.value.toFixed(0)),
      template
    );
}


const generateAnnotations=(template,showTemperatureMarkers)=>{
    const colors = [
      "blue",
      "red",
      "black",
      "orange",
      "green",
      "purple",
      "brown",
      "pink",
      "green",
      "gray",
      "violet",
      "aqua",
      "firebrick",
      "greenyellow",
      "lightblue",
      "lime",
      "Turquoise",
      "yellow",
    ];
    var annotations = [];
    template.thresholds.forEach((e, i) => {
      var newThreshold = Number(e.name);
      const newAnnotation = new Annotation({
                    drawTime: "afterDatasetsDraw",
                    type: e.type,
                    mode: "horizontal",
                    id: "hLine" + e.name,
                    scaleID: "y-axis-0",
                    value: `${e.value}`,
                    // ,
                    borderColor: "black",
                    borderWidth: 2,
                    borderDash: [2, 2],
                    label: {
                    backgroundColor: "black",
                    content: `Threshold ${newThreshold}`,
                    enabled: true,
                    position: "center",
                    },
                    draggable: true,
                    onClick: function (e) {
                    this.chartInstance.update();
                    },
                    onDrag: function (event) {
                    inTernalHandleThresholdChange(event,template);
                    },
            });

      annotations.push(newAnnotation);

      return newAnnotation;
    });


    console.log(annotations);

    var zonePosition = 0;
    template.zones.map((e, i) => {
      zonePosition += Number(e.value);
      const newAnnotation = new Annotation({
        drawTime: "afterDatasetsDraw",
        type: e.type,
        mode: "vertical",
        id: e.name,
        scaleID: "x-axis-0",
        value: generateZonePosition(zonePosition),
        // zonePosition,
        borderColor: colors[i],
        borderWidth: 2,
        label: {
          backgroundColor: colors[i],
          content: e.name,
          enabled: true,
        },
        draggable: true,
        onDrag: function (event) {
          inTernalhandleZoneAnnotationDrag(event);
        },
      });
      if (showTemperatureMarkers) {
        const boxAnnotation = {
          type: e.type != "" ? "box" : "",
          id: e.name + "temp-box",
          xScaleID: "x-axis-0",
          yScaleID: "y-axis-0",
          xMin: i == 0 ? "0:1:0" : generateZonePosition(template.activeZones[i].value),
          //zonePosition - activeZones[i].value,
          xMax: generateZonePosition(zonePosition),
          yMin: e.bottomHeater,
          yMax: e.topHeater,
          backgroundColor: colors[i], //"#ffffff00",
          borderColor: colors[i],
          borderWidth: 3,
          borderRight: 0,
          borderleft: 0,
          label: {
            backgroundColor: colors[i],
            content: e.name,
            enabled: true,
          },
          draggable: true,
          onDrag: function (event) {
            inTernalHandleBoxTemperature(event);
          },

          onDragStart: function (event) {
            console.log(`start ${event.subject.config.yMax}`);
          },
          onDragEnd: function (event) {
            console.log(`end ${event.subject.config.yMax}`);
            hadleUpdateBoxAnnotation(event);
          }
        };
        annotations.push(boxAnnotation);
      }

      annotations.push(newAnnotation);
      return newAnnotation;
    });

    // Chart.helpers.each(Chart.instances, function (instance) {
    //     if(instance.options.annotation){
    //         instance.options.annotation.annotations = [];
    //         instance.chart.update();
    //     }
    
    // });

    const inTernalhandleZoneAnnotationDrag = (event: any) => {
      handleZoneAnnotationDrag(event);
    };

    const inTernalHandleThresholdChange = (event: any,template:any) => {
     handleThresholdAnnotationDrag(event,template);
    };

    const inTernalHandleBoxTemperature = (event: any) => {
     //handleBoxAnnotationDrag(event);
    };

    const hadleUpdateBoxAnnotation = (event: any) => {
      const zone = event.subject.element.id.split("temp-box")[0];
      //handleChangeAnnotationBoxTemp(zone, event.subject.config.yMax, event.subject.config.yMin);
    }
    
    return annotations;
}


const generateChartOptionsUpdate=(options:any, dataSets:Array<IDataset>,template,showTemperatureMarkers)=>{
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
  const threshArray=[]

  template.thresholds.map(e=> {
    return threshArray.push(parseInt(e.value));
});

const maxThreshhold=Math.max(...threshArray);
  if(maxThreshhold>max){
      options.scales.yAxes[0].ticks.suggestedMax = Math.ceil(maxThreshhold +  maxThreshhold * 0.2);
  }else{
        options.scales.yAxes[0].ticks.suggestedMax = Math.ceil(max +  Math.abs(max-min) * 0.5);
  }
  // options.scales.yAxes[0].ticks.min= Math.floor(min - Math.abs(max-min) * 0.2);
  // options.scales.yAxes[0].ticks.max= Math.ceil(max +  Math.abs(max-min) * 0.2);
  // console.log(max);
  options.annotation.annotations=[];
  options.annotation.annotations=generateAnnotations(template,showTemperatureMarkers);
  
 optionsLine = options;
}





export interface IChartsSectionProps{
  channels:Array<IChannel>;
  template: any;
  samplePeriod:number;
}


const ChartSectionState={dataLine:null};
const ChartContainer:React.FC<IChartsSectionProps>=(props)=>{
const [state,setState]= useState(ChartSectionState);



//  handleChangeAnnotationBoxTemp(zone: string, top: number, bottom: number) {
//     const annotations = this.state.activeZones;
//     annotations.find((x) => x.name === zone).topHeater = top;
//     annotations.find((x) => x.name === zone).bottomHeater = bottom;
//     this.setState({
//       activeZones: annotations,
//     });
//   }



//   handleBoxAnnotationDrag(event: any) {
//     const indexOfTarget = event.subject.chart.options.annotation.annotations
//       .map((e) => {
//         return e.id;
//       })
//       .indexOf(event.subject.element.id);
//     const gapMaxMin = event.subject.config.yMax - event.subject.config.yMin;
//     const maxDrag = event.subject.config.yMax - event.dy;
//     const minDrag = event.subject.config.yMin - event.dy;
//     const maxChart = event.subject.chart.options.scales.yAxes[0].ticks.max;
//     const minChart = event.subject.chart.options.scales.yAxes[0].ticks.min;
//     // if ()
//     if (maxDrag > maxChart) {
//       event.subject.config.yMax = maxChart;
//       event.subject.config.yMin = maxChart - gapMaxMin;
//     } else if (
//       minDrag < minChart
//     ) {
//       event.subject.config.yMin = minChart;
//       event.subject.config.yMax = minChart + gapMaxMin;
//     } else {
//       event.subject.config.yMax -= event.dy
//       event.subject.config.yMin -= event.dy
//     }
//     const zone = event.subject.element.id.split("temp-box")[0];
//     this.handleChangeAnnotationBoxTemp(zone, event.subject.config.yMax, event.subject.config.yMin);
//   }





    useEffect(()=>{
    const data=generateDataLine(props.channels,props.template.zones ,props.samplePeriod);
     generateChartOptionsUpdate(optionsLine, [],props.template,false);
        if(data.datasets.length>0){
            if(data.datasets[0].data.length>0){
              console.log("data Update here");
              generateChartOptionsUpdate(optionsLine, data.datasets,props.template,false);
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


    return (
        <div className="chart-component">
            <TemperatureChart type={"line"} data={state.dataLine} options={optionsLine} template={props.template}   />
        </div>
    )
}


export default ChartContainer;