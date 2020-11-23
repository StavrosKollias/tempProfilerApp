import React from "react";
import CardBoxItem from "../CardBoxItem/CardBoxItem";
import "./CardBoxContainer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryFull,
//   faBatteryEmpty,
//   faBatteryHalf,
//   faBatteryThreeQuarters,
//   faBatteryQuarter,
  faQrcode,
  faWifi,  
faAngleDown,
faChartLine,
//   faBellSlash
faDownload,
faPrint,
faSync,
faPlayCircle,
faCheckCircle,
faChartArea
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Peripherals/Button/Button";
import Select from "../../Peripherals/Select/Select";
import SelectCheckList from "../../Peripherals/SelectCheckBox/SelectCheckList";
import { IChannel, IChannelDisplay } from "../../../interfaces/utils";
import { average } from "../../../functions/toolkit";

// first grid
const batteryFullIcon= <FontAwesomeIcon icon={faBatteryFull} className="txt-success" rotation={270} />;
// const batteryEmptyIcon= <FontAwesomeIcon icon={faBatteryEmpty} className="txt-danger"/>;
// const batteryHalfIcon=<FontAwesomeIcon icon={faBatteryHalf} className="txt-info"/>
// const batteryThreeQuartersIcon=<FontAwesomeIcon icon={faBatteryThreeQuarters} className="txt-info"/>
// const batteryQuarterIcon=<FontAwesomeIcon icon={faBatteryQuarter} className="txt-danger"/>
const qrIcon= <FontAwesomeIcon icon={faQrcode} className="txt-secondary"/>
const wifiSuccessIcon=  <FontAwesomeIcon icon={faWifi} className="txt-success"/>
// const wifiDangerIcon=  <FontAwesomeIcon icon={faWifi} className="txt-danger"/>

// Buttons Controls
const arrowDownIcon= <FontAwesomeIcon icon={faAngleDown}/>
const calibrationIcon= <FontAwesomeIcon icon={faCheckCircle}   className="txt-success"/>
const downloadIcon= <FontAwesomeIcon icon={faDownload}/>
const printIcon= <FontAwesomeIcon icon={faPrint}/>
const connectionIcon= <FontAwesomeIcon icon={faSync}/>
const startCapturingIcon= <FontAwesomeIcon icon={faPlayCircle}/>
// third grid
const pwiIcon= <FontAwesomeIcon icon={faChartArea} className="txt-danger"/>
const tempIcon= <FontAwesomeIcon icon={faChartLine} className="txt-danger"/>



interface ICardBoxcontainerProps{
    max?:number;
    min?:number;
    pwi?:number;
    avg?:number;
    battery:string;
    calibration?:string;
    sn?:string;
    connection?:boolean;
    channels:Array<IChannel>;
    type?:string;
    disabledButtons:boolean;
    handleChangeChannelNumber?(e:any):void;
    hadleOpenChart?(e:any):void;
    hadleCloseChart?(e:any):void;
    handleClickDownload?(e:any):void;
    handleClickStartCapturing?(e:any):void;
     handleClickConnection?(e:any):void;
    handleClickCheckBoxSelect?(e:React.FormEvent<HTMLInputElement>):void;
}


interface ChildElement{
    icon:JSX.Element;
    value:string;
    title:string;
}

 

 

 
const CardBoxcontainer:React.FC<ICardBoxcontainerProps>=(props)=>{
 
    let channelNames:Array<IChannelDisplay>= [];
    props.channels.map((e:IChannel,i:number)=>{
    channelNames.push({name:e.channelName,active:e.active});
    })

       const controlElements= [
        <Button id="connection-btn" className="btn-primary" title="connect" children={[connectionIcon]} handleClick={(e)=>props.handleClickConnection(e)}/>,
        <Button id="start-btn" className="btn-success" title="start capturing"  children={[startCapturingIcon]} handleClick={(e)=>props.handleClickStartCapturing(e)}/>,
        <Button id="download-btn" className="btn-info"  title="download"  innerText="" children={[downloadIcon]} handleClick={(e)=>props.handleClickDownload(e)}/>,
        <Button id="print-btn" className="btn-secondary"  title="Open-Chart" children={["Open"]} handleClick={(e)=>props.hadleOpenChart(e)}/>,
        <Button id="print-btn" className="btn-danger"  title="close-Chart" children={["close"]} handleClick={(e)=>props.hadleCloseChart(e)}/>,
        // <Select title="select channels" className="select-dark" id="channels-select" name="select-channels" handleChange={()=>console.log("hey")} label="Select channels" options={["6 channel", "9 channel","12 channel"]}/>,
        <SelectCheckList title="Select Channels" className={props.disabledButtons?"noPointerEvents btn-primary":"btn-primary"} tabIndex={props.disabledButtons? -1: 1}  icon={arrowDownIcon} handleClickCheckBoxSelect={(event)=>{props.handleClickCheckBoxSelect(event)}} labels={channelNames}/>,
    ];

    const generateStats=(channels)=>{
    let max=null;
    let min= null;
    let avg= null;
    if(channels[0].dataLine.length>0){ 
        channels.map((e:IChannel,i:number)=>{
            const maxDataSetData= Math.max(...e.dataLine);
            const minDataSetData= Math.min(...e.dataLine);
            
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
                
            
                if(avg){
                    avg+=average(e.dataLine)
                }else{
                    avg=average(e.dataLine)
                }
            
            

            });
         avg=avg/channels.length;
    }else{
        max=0;
        min= 0;
        avg= 0;
     }

    return {
        max:max,
        min:min,
        avg:avg,
    }
    }


      const itemsDisplayedGrid1:Array<ChildElement>=[
        {icon:batteryFullIcon, value:props.battery,title:"Battery"},
        {icon:calibrationIcon, value:"09/12/2020",title:"Calibration"},
        {icon:qrIcon, value:"123",title:"S/N"},
        {icon:wifiSuccessIcon, value:"On",title:"Connection"},
       
    ];

   const itemsDisplayedGrid2:Array<ChildElement>=[
        {icon:tempIcon, value:`${generateStats(props.channels).min.toString()} \xB0C`,title:"Avg Temp"},
         {icon:tempIcon, value:`${generateStats(props.channels).max.toString()} \xB0C`,title:"Max Temp"},
        {icon:tempIcon, value:`${generateStats(props.channels).min.toString()} \xB0C`,title:"Min Temp"},
        {icon:pwiIcon, value:"2.6 C",title:"PWI"},
    ];



    return(
        <section className="card-box-container my-1">
            <CardBoxItem title="Profiler Details" items={itemsDisplayedGrid1}/>
            <CardBoxItem title="Profiler Controls" controls={controlElements}/>
            <CardBoxItem title="Profiler Stats" items={itemsDisplayedGrid2}/>
        </section>
    )
}

export default CardBoxcontainer;