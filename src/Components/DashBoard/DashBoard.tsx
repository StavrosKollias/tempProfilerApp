import React, { useEffect, useState } from "react";
import CardBoxcontainer from "../CardBox/CardBoxContainer/CardBoxContainer";
import MiniChartsSection from "../MiniChartsSection/MiniChartsSection";
import Table from "../Peripherals/Table/Table";
import TabsComponent from "../Peripherals/TabsComponent/TabsComponent";
const remote = window.require("electron").remote;
// const dbInstance = remote.getGlobal("db");
const getTemplates = remote.getGlobal("getTemplate");
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
            arrayTemplates.push({name:e.name})
        });
        return arrayTemplates;
    }



const INITIAL_STATE:any= {templates: null, tableTest: null, statsTable:null,statsSlopesTable:null};
const DashBoard:React.FC<IDashBoardProps>=(props)=>{
    var [state,setState]= useState(INITIAL_STATE);

   

    useEffect(()=>{
            getTemplateData().then((data)=>{
                console.log(data); 
                const templates= generateTemplatesData(data);
                let  tableTemplates= <Table buttons={true} titles={["Name", "Action"]}  data={templates} legend="Templates"/>;
                let statsTable= <Table className="data" buttons={false} titles={["Channel", "Min Temp","Max Temp","Min Time","Max Time"]}  data={stats} legend="Statistics"/>;
                let statsSlopesTable= <Table className="data" buttons={false} titles={["Channel", "Zone 1","Zone 2","Zone 3","Zone 4"]}  data={statsSlopes} legend="Slope Statistics"/>;
                const newstate= {
                        statsSlopesTable:statsSlopesTable,
                        statsTable:statsTable,
                        templates:templates,
                        tableTest:tableTemplates,
                    };
                setState(newstate);
            });
     
        },[]);


    return(
        <section className="dashboard">
            <div className="container">
                <CardBoxcontainer />
                <MiniChartsSection/>

                {/* Tabs Container Section */}

                <section className="grid-tabs my-1 bg-light">
                  {state.statsTable && 
                    <TabsComponent tabs={["Stats","Slope Stats"]} children={[state.statsTable, state.statsSlopesTable]}/>
                  }
                </section>


                <section className="tables-container-grid my-1">
                    {state.tableTest}
                     {state.tableTest}
                </section>
            </div>

      
        </section>
    )
}

export default DashBoard;