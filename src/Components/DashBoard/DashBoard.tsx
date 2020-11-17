import React, { useEffect, useState } from "react";
import CardBoxcontainer from "../CardBox/CardBoxContainer/CardBoxContainer";
import MiniChartsSection from "../MiniChartsSection/MiniChartsSection";
import Table from "../Peripherals/Table/Table";
import TabsComponent from "../Peripherals/TabsComponent/TabsComponent";
const remote = window.require("electron").remote;
// const dbInstance = remote.getGlobal("db");
const getTemplates = remote.getGlobal("getTemplate");
const getOven= remote.getGlobal("getOven");

// const createTemplate = remote.getGlobal("createTemplate");
// const updateTemplate = remote.getGlobal("updateTemplate");
// const deleteTemplate = remote.getGlobal("deleteTemplate");

interface IDashBoardProps{
    userName:string;
}

async function getTemplateData(){
 const templates = await getTemplates();
 return templates.proxies;
}
  

async function getOvenData(){
 const oven = await getOven();
 return oven.proxies;
}


let websocket;
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
//   setTimeout(function () {
//     wsConnect(url);
//   }, 2000);
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
    switch (array[0]) {
        case "#00#":

        break;
        case "#01":
        console.log(event.data);
        break;

        case "#02":
        console.log(event.data);
        break;
        case "#03":
        array.shift();
        const channel1 = array[0].split(" ")[1];
        const channel2 = array[1].split(" ")[1];
        const channel3 = array[2].split(" ")[1];
        const channel4 = array[3].split(" ")[1];
        const battery = array[4].split(" ")[1];
        generateChannelsData(battery,channel1,channel2,channel3,channel4);
        break;
        default:
        break;
    }

}
// Called when a WebSocket error occurs
function onError(event) {
  console.log("ERROR: " + event.data);
}



const generateChannelsData=(battery,channel1:string,channel2:string,channel3:string,channel4:string)=>{

}
  

const stats=[
        {name:"channel 1", minTemp:1, maxTemp:200, minTime:"1:23", maxTime:"3:25"},
        {name:"channel 2", minTemp:1, maxTemp:200, minTime:"1:23", maxTime:"3:25"},
        {name:"channel 3", minTemp:1, maxTemp:200, minTime:"1:23", maxTime:"3:25"},
        {name:"channel 4", minTemp:1, maxTemp:200, minTime:"1:23", maxTime:"3:25"}
        ];


const statsSlopes=[
        {name:"channel 1", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
        {name:"channel 2", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
        {name:"channel 3", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
        {name:"channel 4", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"}
        ];


    function generateTemplatesData(data){
        let arrayTemplates= [];
        data.map((e,i)=>{
            arrayTemplates.push({name:e.name});
            return i;
        });
        return arrayTemplates;
    }



const INITIAL_STATE:any= {urlCon:"ws://192.168.4.1:1337/",templates: null, templatesTable: null, statsTable:null,statsSlopesTable:null,oven:null,ovenTable:null, channels:null, battery:null};
const DashBoard:React.FC<IDashBoardProps>=(props)=>{
    var [state,setState]= useState(INITIAL_STATE);

   

    useEffect(()=>{
            getTemplateData().then((data)=>{
                console.log(data); 
                const templates= generateTemplatesData(data);
                let  tableTemplates= <Table buttons={true} titles={["Name", "Action"]}  data={templates} legend="Templates"/>;
                let statsTable= <Table className="data" buttons={false} titles={["Channel", "Min Temp","Max Temp","Min Time","Max Time"]}  data={stats} legend="Statistics"/>;
                let statsSlopesTable= <Table className="data" buttons={false} titles={["Channel", "Zone 1","Zone 2","Zone 3","Zone 4"]}  data={statsSlopes} legend="Slope Statistics"/>;
               
                  getOvenData().then((data)=>{
                        const oven= generateTemplatesData(data);
                        let  ovenTable= <Table buttons={true} titles={["Name", "Action"]}  data={oven} legend="Oven"/>;
                        const newstate= {
                                statsSlopesTable:statsSlopesTable,
                                statsTable:statsTable,
                                templates:templates,
                                templatesTable:tableTemplates,
                                oven:oven,
                                ovenTable:ovenTable
                            };
                        setState(newstate);
                            });
            });


            
     
        },[]);


    return(
        <section className="dashboard">
            <div className="container">
                <CardBoxcontainer />
                <MiniChartsSection channels={null}/>

                {/* Tabs Container Section */}

                <section className="grid-tabs my-1 bg-light">
                  {state.statsTable && 
                    <TabsComponent tabs={["Statistics","Slope Statistics","Zones"]} children={[state.statsTable, state.statsSlopesTable, "hello"]}/>
                  }
                </section>


                <section className="tables-container-grid my-1">
                     {state.templatesTable}
                     {state.ovenTable}
                </section>
            </div>

      
        </section>
    )
}

export default DashBoard;