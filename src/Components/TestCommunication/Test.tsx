
import Chart from "chart.js";
import React,{useEffect, useRef, useState} from "react";
import { Line } from "react-chartjs-2";
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


   
  const options1= {
      bezierCurve: false,
      maintainAspectRatio: false,
      responsive: true,
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
              labelString: "",
            },
            ticks: {
              beginAtZero: true,
              fontColor: "black",
              maxTicksLimit: 5,
              precision:2,
              step:0.5,
              min: 0,
              suggestedMax:8,
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
              maxTicksLimit: 10,
              fontColor: "black",
            },
          },
        ],
      },
    };


     const options2= {
      bezierCurve: false,
      maintainAspectRatio: false,
      responsive: true,
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
              labelString: "",
            },
            ticks: {
              beginAtZero: true,
              fontColor: "black",
              maxTicksLimit: 5,
              precision:2,
              step:0.5,
              min: 0,
              suggestedMax:8,
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
              maxTicksLimit: 10,
              fontColor: "black",
            },
          },
        ],
      },
    };
 

    var dataBattery= {
      labels: [],
      datasets: [
        {
          fill: false,
          lineTention: 1,
          label: "",
          backgroundColor: backgroundColor[5],
          borderColor: backgroundColor[5],
          data: [],
        },
      ],
    };

     var datachannel1= {
      labels: [],
      datasets: [
        {
          fill: false,
          lineTention: 1,
          label: "",
          backgroundColor: backgroundColor[5],
          borderColor: backgroundColor[5],
          data: [],
        },
      ],
    };




const INITIAL_STATE= {channel1:"-", channel2: "-",channel3:"-",channel4:"-", battery:"-", valueInput:300 ,chartDataBattery:dataBattery, chartDatachannel1:datachannel1,chartOptionsBattery:options1,chartOptionsChannel1:options2 };
  
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
  let closeMSg;
  // Log disconnection state
  console.log("Disconnected");
  return closeMSg = "Disconnected";
  // Try to reconnect after a few seconds
  setTimeout(function () {
    wsConnect(url);
  }, 2000);
}

// Called when a WebSocket error occurs

function onError(event) {
  let errMsg = "";
  console.log("ERROR: " + event.data);
 return errMsg = "ERROR: " + event.data;
}

// Sends a message to the server (and prints it to the console)
function doSend(message) {
  console.log("Sending: " + message);
  websocket.send(message);
}


// Called when a message is received from the server
let response = { type: 0, data: {channel1:"",channel2:"",channel3:"",channel4:"",battery:""} };



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
        // console.log(event.data);
        response.type = array[0];
        array.shift();
        const channel1 = array[0].split(" ")[1];
        const channel2 = array[1].split(" ")[1];
        const channel3 = array[2].split(" ")[1];
        const channel4 = array[3].split(" ")[1];
        const battery = array[4].split(" ")[1];

        


        if(!isNaN(battery)){
          const batteryDataSet=state.chartDataBattery;
                batteryDataSet.labels.push(batteryDataSet.labels.length);
                let newDataBattery=Number(battery);
                 batteryDataSet.datasets[0].data.push(newDataBattery);
                 batteryDataSet.datasets[0].backgroundColor=backgroundColor[0];
                 batteryDataSet.datasets[0].borderColor=backgroundColor[0];
                 batteryDataSet.datasets[0].label="Battery";
                 const optionsBattery= state.chartOptionsBattery;
                 optionsBattery.scales.yAxes[0].scaleLabel.labelString="v";
                 optionsBattery.scales.yAxes[0].ticks.min= Math.floor(Math.min(...batteryDataSet.datasets[0].data)- Math.min(...batteryDataSet.datasets[0].data)* 0.1);
                 optionsBattery.scales.yAxes[0].ticks.suggestedMax= Math.ceil(Math.max(...batteryDataSet.datasets[0].data) + Math.max(...batteryDataSet.datasets[0].data) * 0.1);


              let newDataChannel1= Number(channel1);
              const channel1Dataset= state.chartDatachannel1;
                channel1Dataset.labels.push(channel1Dataset.labels.length);
                channel1Dataset.datasets[0].data.push(newDataChannel1);
                channel1Dataset.datasets[0].backgroundColor=backgroundColor[1];
                channel1Dataset.datasets[0].borderColor=backgroundColor[1];
                channel1Dataset.datasets[0].label="channel 1";
                const chartOptionsChannel1= state.chartOptionsChannel1;
                chartOptionsChannel1.scales.yAxes[0].scaleLabel.labelString="\xB0C";
                chartOptionsChannel1.scales.yAxes[0].ticks.min= Math.floor(Math.min(...channel1Dataset.datasets[0].data) - Math.min(...channel1Dataset.datasets[0].data)* 0.1);
                chartOptionsChannel1.scales.yAxes[0].ticks.suggestedMax= Math.ceil(Math.max(...channel1Dataset.datasets[0].data) + Math.max(...channel1Dataset.datasets[0].data) * 0.1);

              console.log(channel1);

                  setState((state)=>{
                          return {
                            ...state,
                            channel1:channel1+ " \xB0C",
                            channel2:channel2+ " \xB0C",
                            channel3:channel3+ " \xB0C",
                            channel4:channel4 + " \xB0C",
                            battery:battery+ " V",
                            chartOptionsBattery:optionsBattery,
                            chartDataBattery:batteryDataSet,
                            chartOptionsChannel1:chartOptionsChannel1,
                            chartDatachannel1:channel1Dataset,
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
      
        break;
        default:
        break;
    }

    return response;
}


const updateCharts=()=>{
    Chart.helpers.each(Chart.instances, function(instance){
      instance.chart.update()
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
                        <Button title="connect" className="btn-success" id="Connect" innerText="Do Connection"  handleClick={()=>wsConnect(url)}/>
                        <Button className="btn-primary"  title="request"  id="request" innerText="Request#00#"   handleClick={()=> doSend("getLEDState")}/>
                        <Button className="btn-secondary" title="sample period"  id="sample-period" innerText="Request#01# Set Sample Period"  handleClick={()=>console.log("Hey")}/>
                        <Button className="btn-secondary" title="start capture" id="start-capturing" innerText="Request#02# Start Capturing"  handleClick={()=>console.log("Hey")} />
                        <Input max="1000" min="100" step="100" defaultValue="300" type="range" className="input-range-primary"  name="sampleperiod" label="sample Periond" dataRole="input-range"  handleChange={(e)=>handleChangeInputSamplePeriod(e)}/>
                            <span>{state.valueInput}</span>
                        </span>

                        <div className="result-0" >
                            <h1>Result #00#</h1>
                            

                        <div className="chart-container">
                          {state.chartOptionsBattery &&   <Line
                                      data={state.chartDataBattery}
                                      options={state.chartOptionsBattery}
                                // plugins={[ChartAnnotation, ChartDraggable, ChartZoom]}
                                 />}

                        </div>
                     
                        <div className="chart-container">
                             {state.chartOptionsChannel1 &&   <Line
                                data={state.chartDatachannel1}
                                options={state.chartOptionsChannel1}
                                // plugins={[ChartAnnotation, ChartDraggable, ChartZoom]}
                            />}
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