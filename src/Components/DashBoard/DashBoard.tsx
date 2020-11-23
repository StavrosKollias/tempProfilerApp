import Chart from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Channel } from "../../classes/channel";
import CardBoxcontainer from "../CardBox/CardBoxContainer/CardBoxContainer";
import ChartContainer from "../ChartContainer/ChartContainer";
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


const initialGenerateChannelsData=(channelsNumber:number)=>{
  let channels=[];
  for (var i=1; i<=channelsNumber; i++){
    const channelItem= new Channel([],[],true,`channel ${i}`);
    channels.push(channelItem);
  }
  return channels
}
  


function generateTemplatesData(data){
        let arrayTemplates= [];
        data.map((e,i)=>{
            arrayTemplates.push({name:e.name});
            return i;
        });
        return arrayTemplates;
    }


 function generateTimeLabel(peviousSampleTime:string ,samplePeriod:number) {
      let  oldMS;
      if(peviousSampleTime==="0"){
        oldMS= parseInt(peviousSampleTime);
      }else{
          const peviousSampleTimeArray= peviousSampleTime.split(":");
        oldMS= parseInt(peviousSampleTimeArray[0])*60*1000+ parseInt(peviousSampleTimeArray[1])*1000+parseInt(peviousSampleTimeArray[2]);

      }
        var t = oldMS+samplePeriod; //adding 100ms or any other sample period
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
      return `${days*24*60+hours*60+minutes}:${seconds}:${Math.abs(minutes*60*1000-Math.abs(seconds*1000-t))}`;
    }




const INITIAL_STATE:any= {
            websocket:null,
            urlCon:"ws://192.168.4.1:1337/",
            templatesDb:null,
            templates: null,
            templatesTable: null,
            statsTable:null,
            statsSlopesTable:null,
            oven:null,
            ovenTable:null,
            channels:null,
            channelNumber: 4,
            profilerType: "",
            battery:"-",
          };


let websocket;

const DashBoard:React.FC<IDashBoardProps>=(props)=>{
    const [state,setState]= useState(INITIAL_STATE);
    const disabledButtons= useRef<boolean>(false);
      const mainChart= useRef<boolean>(false);

      var stats=[
              {name:"channel 1", minTemp:state.channels?Math.min(...state.channels[0].dataLine):"-", maxTemp:state.channels?Math.max(...state.channels[0].dataLine):"-", minTime:"1:23", maxTime:"3:25"},
              {name:"channel 2", minTemp:state.channels?Math.min(...state.channels[1].dataLine):"-", maxTemp:state.channels?Math.max(...state.channels[1].dataLine):"-", minTime:"1:23", maxTime:"3:25"},
              {name:"channel 3", minTemp:state.channels?Math.min(...state.channels[2].dataLine):"-", maxTemp:state.channels?Math.max(...state.channels[2].dataLine):"-", minTime:"1:23", maxTime:"3:25"},
              {name:"channel 4", minTemp:state.channels?Math.min(...state.channels[3].dataLine):"-", maxTemp:state.channels?Math.max(...state.channels[3].dataLine):"-", minTime:"1:23", maxTime:"3:25"}
              ];

      var statsSlopes=[
                      {name:"channel 1", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
                      {name:"channel 2", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
                      {name:"channel 3", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
                      {name:"channel 4", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"}
                    ];


          function wsConnect(url:string) {
            websocket = new WebSocket(url);
              const newstate= {
                      ...state,
                     websocket:websocket
                  };
              setState(newstate);
           
              // Assign callbacks
              websocket.onopen = function (event) {
                console.log("Opened");
              };

            websocket.onclose = function (event) {
                console.log("Error");
                console.log("Disconnected");
              };

            websocket.onmessage = function (event) {
               receiveMSG(event);
              };

            websocket.onerror = function (event) {
                console.log("Error");
                console.log("Disconnected");
              }; 
            }

            // Sends a message to the server (and prints it to the console)
          function doSend(message) {
            console.log("Sending: " + message);
            websocket.send(message);
          }

            function receiveMSG(event){
                console.log("Received Data");
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
                      updateChannelsData(battery,channel1,channel2,channel3,channel4);
                      break;
                      default:
                      break;
                  }
}          // I need to make this more dynamic 



          const updateChannelsData=(battery:string,channel1:string,channel2:string,channel3:string,channel4:string)=>{
           const channels=  state.channels;
           let label;
           channels[0].dataLabels.length==0? label= generateTimeLabel("0",1000) : label= generateTimeLabel(channels[0].dataLabels[channels[0].dataLabels.length-1],1000);
            channels[0].dataLine.push(Number(channel1));
            channels[0].dataLabels.push(label);
            channels[1].dataLine.push(Number(channel2));
            channels[1].dataLabels.push(label);
            channels[2].dataLine.push(Number(channel3));
            channels[2].dataLabels.push(label);
            channels[3].dataLine.push(Number(channel4));
            channels[3].dataLabels.push(label);


          stats=[
              {name:"channel 1", minTemp:Math.min(...channels[0].dataLine), maxTemp:Math.max(...channels[0].dataLine), minTime:"-", maxTime:"3:25"},
              {name:"channel 2", minTemp:Math.min(...channels[1].dataLine), maxTemp:Math.max(...channels[1].dataLine), minTime:"-", maxTime:"3:25"},
              {name:"channel 3", minTemp:Math.min(...channels[2].dataLine), maxTemp:Math.max(...channels[2].dataLine), minTime:"-", maxTime:"3:25"},
              {name:"channel 4", minTemp:Math.min(...channels[3].dataLine), maxTemp:Math.max(...channels[3].dataLine), minTime:"-", maxTime:"3:25"}
              ];


          statsSlopes=[
                      {name:"channel 1", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
                      {name:"channel 2", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
                      {name:"channel 3", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"},
                      {name:"channel 4", zone1:1.5, zone2:200, zone3:"1:23", zone4:"3:25"}
                      ];

              let statsTable= <Table className="data" buttons={false} titles={["Channel", "Min Temp","Max Temp","Min Time","Max Time"]}  data={stats} legend="Statistics"/>;
              let statsSlopesTable= <Table className="data" buttons={false} titles={["Channel", "Zone 1","Zone 2","Zone 3","Zone 4"]}  data={statsSlopes} legend="Slope Statistics"/>;
              const newstate= {
                              ...state,
                              statsSlopesTable:statsSlopesTable,
                              statsTable:statsTable,
                              battery:battery,
                              channels:channels,
                            };
                  setState(newstate);
          }


          useEffect(()=>{
            if(!state.templates){
              const channelsTemplate= initialGenerateChannelsData(state.channelNumber);
                getTemplateData().then((dataTemplate)=>{
                      const templates= generateTemplatesData(dataTemplate);
                        getOvenData().then((data)=>{
                              const oven= generateTemplatesData(data);
                              let  ovenTable= <Table buttons={true} titles={["Name", "Action"]}  data={oven} legend="Oven"/>;
                              let  tableTemplates= <Table buttons={true} titles={["Name", "Action"]}  data={templates} legend="Templates"/>;
                              let statsTable= <Table className="data" buttons={false} titles={["Channel", "Min Temp","Max Temp","Min Time","Max Time"]}  data={stats} legend="Statistics"/>;
                              let statsSlopesTable= <Table className="data" buttons={false} titles={["Channel", "Zone 1","Zone 2","Zone 3","Zone 4"]}  data={statsSlopes} legend="Slope Statistics"/>;
                              const newstate= {
                                      ...state,
                                      statsSlopesTable:statsSlopesTable,
                                      statsTable:statsTable,
                                      templatesDb:dataTemplate,
                                      templates:templates,
                                      templatesTable:tableTemplates,
                                      oven:oven,
                                      ovenTable:ovenTable,
                                      channels:channelsTemplate,
                                  };
                              setState(newstate);
                         });
                  });      
            }
          },[state]);
         
         
         
          const handleCheckActiveChannel=(event:React.FormEvent<HTMLInputElement>)=>{
            const inputChecked= event.currentTarget.checked;
            const label= event.currentTarget.nextElementSibling.textContent;
            const channels= state.channels;
            const   objIndex = channels.findIndex((channel => channel.channelName === label));
            channels[objIndex].active=inputChecked;
              setState((state)=>{
                return{
                  ...state,
                  channels:channels
                }
              })
            }

          const hadleClickStartCapturing=(e)=>{
            doSend("getLEDState");
          }

          const handleClickConnection=()=>{
               wsConnect(state.urlCon);
               disabledButtons.current=true;
          }

          const stopTransmitionWebsocket=()=>{
            websocket.close();
            disabledButtons.current=false;
               setState((state)=>{
                return{
                  ...state,
                }
              });
          }
          const openMainChart=()=>{
            mainChart.current=true;
             setState((state)=>{
                return{
                  ...state,
                }
              })
          }

           const closeMainChart=()=>{
            mainChart.current=false;
             setState((state)=>{
                return{
                  ...state,
                }
              })
          }

          const flagMiniChart= state.channels && !mainChart.current ;

    return(
        <section className="dashboard">
            <div className="container">
               {state.channels && <CardBoxcontainer disabledButtons={disabledButtons.current} battery={state.battery} channels={state.channels} handleClickStartCapturing={(e)=>hadleClickStartCapturing(e)} handleClickConnection={()=>handleClickConnection()} handleClickCheckBoxSelect={(event=>{handleCheckActiveChannel(event)})}  handleClickDownload={()=>{stopTransmitionWebsocket()}} hadleOpenChart={()=>{openMainChart()}} hadleCloseChart={()=>{closeMainChart()}}/>}
                {flagMiniChart && <MiniChartsSection channels={state.channels} template={state.templates[0]}/>}

               { mainChart.current && <ChartContainer channels={state.channels} template={state.templatesDb[0]}/>}

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