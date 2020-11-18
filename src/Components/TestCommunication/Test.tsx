
import Chart from "chart.js";
import React,{useEffect, useRef, useState} from "react";
import { Bar } from "react-chartjs-2";
import Button from "../Peripherals/Button/Button";
import Input from "../Peripherals/Input/Input";
import LinkComponent from "../Peripherals/LinkComponent/LinkComponent";
import { ITestProps } from "./ITestProps";
import "./Test.scss";


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


  
    const generateChartOptions=(legendData:string,min:number, max:number, step:number,precision:number)=>{
   const options= {
      bezierCurve: true,
      maintainAspectRatio: false,
      responsive: true,
      elements: {
        line: {
          tension: 0.1,
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
             stacked: true,
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: legendData,
            },
            ticks: {
              beginAtZero: false,
              fontColor: "black",
              maxTicksLimit:6,
              // precision: precision,
              // step:step,
              // suggestedMax:max,
              // suggestedMin:min,
              // min:min,
              // max:max,
              //  beginAtZero: true
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
              maxTicksLimit: 20,
              fontColor: "black",
            },
          },
        ],
      },
    };
    return options;
    }


    const generateDataset=(index:number,label:string)=>{
      var data= {
            labels: [],
            datasets: [
              {
                type: "line",
                fill: false,
                lineTention: 1,
                label: label,
                backgroundColor: backgroundColor[index],
                borderColor: backgroundColor[index],
                data: [],
              },
            ],
          };

    return data;
    }
 
    const updateChart=(data:any, options:any,newData:number, span:number)=>{
       const newOptions= options;
        let newLabel;
        if(data.labels.length>0) newLabel= generateTimeLabel(data.labels[data.labels.length-1],1000); else newLabel= generateTimeLabel("0",1000);
        data.labels.push(newLabel);
        data.datasets[0].data.push(newData);
        // options.scales.yAxes[0].ticks.suggestedMin =  Math.floor(Math.min(...data.datasets[0].data) - Math.abs(Math.max(...data.datasets[0].data)- Math.min(...data.datasets[0].data)) * span);
         newOptions.scales.yAxes[0].ticks.min = Math.floor(Math.min(...data.datasets[0].data) - Math.abs(Math.max(...data.datasets[0].data)- Math.min(...data.datasets[0].data)) * span);
        // options.scales.yAxes[0].ticks.suggestedMax = Math.ceil(Math.max(...data.datasets[0].data) +  Math.abs(Math.max(...data.datasets[0].data)-Math.min(...data.datasets[0].data)) * span);
         newOptions.scales.yAxes[0].ticks.max = Math.ceil(Math.max(...data.datasets[0].data) +  Math.abs(Math.max(...data.datasets[0].data)-Math.min(...data.datasets[0].data)) * span);
        //  options.scales.yAxes[0].ticks.maxTicksLimit = 5;
        // const step=(options.scales.yAxes[0].ticks.max-options.scales.yAxes[0].ticks.min)/options.scales.yAxes[0].ticks.maxTicksLimit;
        //  options.scales.yAxes[0].ticks.stepSize= step.toString();
        // options.scales.yAxes[0].ticks.maxTicksLimit = parseInt(options.scales.yAxes[0].ticks.suggestedMax-options.scales.yAxes[0].ticks.suggestedMin/4);
        console.log(`${data.datasets[0].label} => ${newOptions.scales.yAxes[0].ticks.max},${newOptions.scales.yAxes[0].ticks.min}`);
       
        return {
          options:newOptions,
          data:data
        }
    }

    function generateTimeLabel(peviousSampleTime:string ,samplePeriod:number) {
      let  oldMS;
      if(peviousSampleTime==="0"){
        oldMS= parseInt(peviousSampleTime);
      }else{
          const peviousSampleTimeArray= peviousSampleTime.split(":");
          // const msTest= parseInt(peviousSampleTimeArray[1])*1000
        oldMS= parseInt(peviousSampleTimeArray[0])*60*1000+ parseInt(peviousSampleTimeArray[1])*1000+parseInt(peviousSampleTimeArray[2]);

      }
        var t = oldMS+samplePeriod; //adding 100ms or any other sample period
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
      return `${days*24*60+hours*60+minutes}:${seconds}:${Math.abs(minutes*60*1000-Math.abs(seconds*1000-t))}`;
    }


const INITIAL_STATE= {
  channel1:"-",
  channel2: "-",
  channel3:"-",
  channel4:"-",
  battery:"-",
  valueInput:300,
  chartDataBattery:generateDataset(0,"Batery"),
  chartDatachannel1:generateDataset(1,"Channel 1"),
  chartDatachannel2:generateDataset(2,"Channel 2"),
  chartOptionsBattery:generateChartOptions("V",0, 1, 1, 0),
  chartOptionsChannel1:generateChartOptions("\xB0C",0, 1, 10, 0),
  chartOptionsChannel2:generateChartOptions("\xB0C",0, 1, 10, 0),
  url: "ws://192.168.4.1:1337/",
};
  
var counter=0;
const TestComponent:React.FC<ITestProps>=(props)=>{
const [state,setState]= useState(INITIAL_STATE);
   

const handleChangeInputSamplePeriod=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const value= parseInt(event.target.value);
    setState((state)=>{
     return {
      ...state,
      valueInput:value
     } 
    });
}
const dataIncomming= useRef(true);

let websocket;
const url = "ws://192.168.4.1:1337/";
// Call this to connect to the WebSocket server
function wsConnect(url:string) {
// Connect to WebSocket server
 websocket = new WebSocket(url);
  // Assign callbacks
  websocket.onopen = function (event) {
    onOpen(event);
  };
  websocket.onclose = function (event) {
    onClose(event);
  };
  websocket.onmessage = function (event) {
    onMessage(event);
  };
  websocket.onerror = function (event) {
    onError(event);
  }; 
}
// Called when a WebSocket connection is established with the server
function onOpen(event) {
  // Log connection state
  console.log("Connected");
  // Get the current state of the LED
  doSend("getLEDState");
}
// Called when the WebSocket connection is closed
function onClose(event) {
  // Log disconnection state
  console.log("Disconnected");
  // Try to reconnect after a few seconds
  setTimeout(function () {
    wsConnect(url);
  }, 2000);
}

// Called when a WebSocket error occurs

function onError(event) {
  console.log("ERROR: " + event.data);
}

// Sends a message to the server (and prints it to the console)
function doSend(message) {
  console.log("Sending: " + message);
  websocket.send(message);
}


function onMessage(event) {
    // Print out our received message
    // console.log("Received: " + event.data);
    // Update circle graphic with LED state
    var array = event.data.split(":");
    dataIncomming.current= true;
    switch (array[0]) {
        case "#00#":
        response.type = array[0];
        array.shift();
        // response.data =
        console.log(response.type);
        break;
        case "#01":
        console.log(event.data);
        break;

        case "#02":
        console.log(event.data);
        break;
        case "#03":
        response.type = array[0];
        array.shift();
        const channel1 = array[0].split(" ")[1];
        const channel2 = array[1].split(" ")[1];
        const channel3 = array[2].split(" ")[1];
        const channel4 = array[3].split(" ")[1];
        const battery = array[4].split(" ")[1];
        updateStateCharts(battery,channel1,channel2,channel3,channel4);
      
        break;
        default:
        break;
    }

    return response;
}




// Called when a message is received from the server
let response = { type: 0, data: {channel1:"",channel2:"",channel3:"",channel4:"",battery:""} };

const updateStateCharts=(battery,channel1,channel2,channel3,channel4)=>{

        if(!isNaN(battery)){
                const batteryDataSet=state.chartDataBattery;
                let newDataBattery=Number(battery);
                const optionsBattery= state.chartOptionsBattery;
                const batteryChart= updateChart(batteryDataSet,optionsBattery,newDataBattery,0.5);

                let newDataChannel1= Number(channel1);
                const channel1Dataset= state.chartDatachannel1;
                const chartOptionsChannel1= state.chartOptionsChannel1;
                const channel1Chart= updateChart(channel1Dataset,chartOptionsChannel1,newDataChannel1,0.5);



                let newDataChannel2= Number(channel2);
                const channel2Dataset= state.chartDatachannel2;
                const chartOptionsChannel2= state.chartOptionsChannel2;
                const channel2Chart= updateChart(channel2Dataset,chartOptionsChannel2,newDataChannel2,0.5);

                  setState((state)=>{
                          return {
                            ...state,
                            channel1:channel1+ " \xB0C",
                            channel2:channel2+ " \xB0C",
                            channel3:channel3+ " \xB0C",
                            channel4:channel4 + " \xB0C",
                            battery:battery+ " V",
                            chartOptionsBattery:batteryChart.options,
                            chartDataBattery:batteryChart.data,
                            chartOptionsChannel1:channel1Chart.options,
                            chartDatachannel1:channel1Chart.data,
                            chartOptionsChannel2:channel2Chart.options,
                            chartDatachannel2:channel2Chart.data,
                          } 
                      });
          }else{
                    setState((state)=>{
                              return {
                                ...state,
                              channel1:channel1,
                              channel2:channel2,
                              channel3:channel3,
                              channel4:channel4,
                              battery:battery
                              } 
                          });
          }
}





const updateCharts=()=>{
    Chart.helpers.each(Chart.instances, function(instance){
      instance.chart.update()
      // console.log(instance);
    });
}

useEffect(()=>{
  console.log(state);
    updateCharts();
},[state])


    return(
        <div className="wrapper">
            <div className="container">
                 <div className="testComponent-wrapper py-1">
                        <h2>Testing communication</h2>
                        <span> 
                        <Button title="connect" className="btn-success" id="Connect" innerText="Do Connection"  handleClick={()=>wsConnect(state.url)}/>
                        <Button className="btn-primary"  title="request"  id="request" innerText="Request#00#"   handleClick={()=> doSend("getLEDState")}/>
                        <Button className="btn-secondary" title="sample period"  id="sample-period" innerText="Request#01# Set Sample Period"  handleClick={()=>console.log("Hey")}/>
                        <Button className="btn-secondary" title="start capture" id="start-capturing" innerText="Request#02# Start Capturing"  handleClick={()=>console.log("Hey")} />
                        <Input max="1000" min="100" step="100" defaultValue="300" type="range" className="input-range-primary"  name="sampleperiod" label="sample Periond" dataRole="input-range"  handleChange={(e)=>handleChangeInputSamplePeriod(e)}/>
                            <span>{state.valueInput}</span>
                        </span>

                        <div className="result-0" >
                            <h1>Result #00#</h1>
                            

                        <div className="chart-container">
                           <Bar
                                      data={state.chartDataBattery}
                                      options={state.chartOptionsBattery}
                                // plugins={[ChartAnnotation, ChartDraggable, ChartZoom]}
                                 />

                        </div>
                     
                        <div className="chart-container">
                           <Bar
                                data={state.chartDatachannel1}
                                options={state.chartOptionsChannel1}
                                // plugins={[ChartAnnotation, ChartDraggable, ChartZoom]}
                            />
                            </div>


                              <div className="chart-container">
                               <Bar
                                data={state.chartDatachannel2}
                                options={state.chartOptionsChannel2}
                                // plugins={[ChartAnnotation, ChartDraggable, ChartZoom]}
                            />
                            </div>
                        </div>

                        
                     
                        <div className="result-3" >
                            <h1>Result #03#</h1>
                    
                        <span>{`Channel 1 :=> ${state.channel1} `}</span>     
                        <span>{`Channel 2 :=> ${state.channel2} `}</span>     
                        <span>{`Channel 3 :=> ${state.channel3} `}</span>
                        <span>{`Channel 4 :=> ${state.channel4} `}</span>
                        <span>{`Battery:=> ${state.battery} `}</span>
                        </div>

                        <span>
                            {`You Are Logged In as ${props.userName} Congrats`}

                            <LinkComponent  className="btn btn-primary"  innerText="Back Login" to="/Login" handleClick={(e) => console.log("heu")} />{" "}
                        </span>
                    </div>
            </div>
        </div>
    )
}

export  default TestComponent;