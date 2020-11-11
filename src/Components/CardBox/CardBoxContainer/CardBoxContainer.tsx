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


interface Channel{
    name:string;
    active:boolean;
}

interface ICardBoxcontainerProps{
    max:number;
    min:number;
    pwi:number;
    avg:number;
    battery:number;
    calibration:string;
    sn:string;
    connection:boolean;
    channels:Array<Channel>;
    type:string;
    
}


interface ChildElement{
    icon:JSX.Element;
    value:string;
    title:string;
}

   const itemsDisplayedGrid1:Array<ChildElement>=[
        {icon:batteryFullIcon, value:"80%",title:"Battery"},
         {icon:calibrationIcon, value:"09/12/2020",title:"Calibration"},
        {icon:qrIcon, value:"123",title:"S/N"},
        {icon:wifiSuccessIcon, value:"On",title:"Connection"},
       
    ];

    const controlElements= [
        <Button id="connection-btn" className="btn-primary" title="connect" children={[connectionIcon]} handleClick={(e)=>console.log(e)}/>,
        <Button id="connection-btn" className="btn-success" title="start capturing"  children={[startCapturingIcon]} handleClick={(e)=>console.log(e)}/>,
        <Button id="connection-btn" className="btn-info"  title="download"  innerText="" children={[downloadIcon]} handleClick={(e)=>console.log(e)}/>,
        <Button id="connection-btn" className="btn-secondary"  title="print" children={[printIcon]} handleClick={(e)=>console.log(e)}/>,
        <Select title="select channels" className="select-dark" id="channels-select" name="select-channels" handleChange={()=>console.log("hey")} label="Select channels" options={["6 channel", "9 channel","12 channel"]}/>,
        <SelectCheckList title="Select Check" className="btn-secondary" icon={arrowDownIcon} labels={["Select 1", "Select 2", "Select 3", "Select 4"] }/>,
        <SelectCheckList title="Select Channels" className="btn-primary" icon={arrowDownIcon} labels={["Channel 1", "Channel 2", "Channel 3", "Channel 4"] }/>,
    ]

    const itemsDisplayedGrid2:Array<ChildElement>=[
        {icon:tempIcon, value:"10",title:"Avg Temp"},
         {icon:tempIcon, value:`250 C`,title:"Max Temp"},
        {icon:tempIcon, value:`123 C`,title:"Loss Temp"},
        {icon:pwiIcon, value:"2.6 C",title:"PWI"},
       
    ];

const CardBoxcontainer:React.FC=(props)=>{
 
    return(
        <section className="card-box-container my-1">
            <CardBoxItem title="Profiler Details" items={itemsDisplayedGrid1}/>
            <CardBoxItem title="Profiler Controls" controls={controlElements}/>
            <CardBoxItem title="Profiler Stats" items={itemsDisplayedGrid2}/>
        </section>
    )
}

export default CardBoxcontainer;