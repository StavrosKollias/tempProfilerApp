
import React,{useState} from "react";
import { Line } from "react-chartjs-2";
import Button from "../Peripherals/Button/Button";
import Input from "../Peripherals/Input/Input";
import LinkComponent from "../Peripherals/LinkComponent/LinkComponent";
import { ITestProps } from "./ITestProps";
import "./Test.scss";

const INITIAL_STATE= {channel1:"-", channel2: "-",channel3:"-",channel4:"-", battery:"-", valueInput:300 ,chartData:null,chartOptions:null};

const TestComponent:React.FC<ITestProps>=(props)=>{
    const [state,setState]= useState(INITIAL_STATE);
  

const handleChangeInputSamplePeriod=(event:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(event.target.value);
    setState((state)=>{
     return {
      ...state,
      valueInput:Number(event.target.value)
     } 
    });
}

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

// Called when a message is received from the server
let response = { type: 0, data: {channel1:"",channel2:"",channel3:"",channel4:"",battery:""} };



function onMessage(event) {
    const DataProps= props;
    // Print out our received message
    console.log("Received: " + event.data);
    // Update circle graphic with LED state
    var array = event.data.split(":");
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
        console.log(event.data);
        response.type = array[0];
        array.shift();
        const channel1 = array[0].split(" ")[1];
        const channel2 = array[1].split(" ")[1];
        const channel3 = array[2].split(" ")[1];
        const channel4 = array[3].split(" ")[1];
        const battery = array[3].split(" ")[1];
        response.data.channel1 = channel1;
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

        generateChartData(battery)

            // SetData(data=event.data);
        break;
        default:
        break;
    }

    return response;
}

const generateChartData=(newData)=>{
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

    var data= {
      labels: [],
      datasets: [
        {
          fill: false,
          lineTention: 1,
          label: "Baterry",
          backgroundColor: backgroundColor[0],
          borderColor: backgroundColor[0],
          data: [],
        },
        //  {
        //   fill: false,
        //   lineTention: 1,
        //   borderDash: [20, 30],
        //   label: "Channel 2",
        //   backgroundColor: backgroundColor[1],
        //   borderColor: backgroundColor[1],
        //   data: [0, 5, 10, 15, 10, 30, 45],
        // },
        // {
        //   fill: false,
        //   lineTention: 1,
        //   borderDash: [20, 30],
        //   label: "Channel 3",
        //   backgroundColor: backgroundColor[2],
        //   borderColor: backgroundColor[2],
        //   data: [0, 5, 10, 15, 10, 30, 45],
        // },
        //  {
        //   fill: false,
        //   lineTention: 1,
        //   borderDash: [20, 30],
        //   label: "Channel 4",
        //   backgroundColor: backgroundColor[3],
        //   borderColor: backgroundColor[3],
        //   data: [],
        // },
      ],
    };
   
      const options= {
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
              labelString: "\xB0C",
            },
            ticks: {
              beginAtZero: true,
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
              labelString: "mm:s:ms",
            },
            ticks: {
              fontColor: "black",
            },
          },
        ],
      },
    };

    if(!isNaN(newData)){
        data.labels.push(data.labels.length);
        newData= Number(newData); 
        data.datasets[0].data.push(newData);
          setState((state)=>{
                  return {
                    ...state,
                  chartOptions:options,
                  chartData:data,
                  } 
              });
    }

}
// generateChartData(NaN);

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
                            
                          {state.chartOptions &&   <Line
                                data={state.chartData}
                                options={state.chartOptions}
                                // plugins={[ChartAnnotation, ChartDraggable, ChartZoom]}
                            />}
                        </div>
                     
                        <div className="result-3" >
                            <h1>Result #03#</h1>
                           {/* {data} */}
                        <span>{`Channel1 temp:=> ${state.channel1} `}</span>     
                        <span>{`Channel2 temp:=> ${state.channel2} `}</span>     
                        <span> {`Channel3 temp:=> ${state.channel3} `}</span>
                        <span> {`Channel4 temp:=> ${state.channel4} `}</span>
                        <span> {`Battery V:=> ${state.battery} `}</span>
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