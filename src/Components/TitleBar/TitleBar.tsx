import React, {useState} from "react";
import "./TitleBar.scss";
import Button from "../Peripherals/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faMinus,
  faTools,
  faTimes,
  faWindowMaximize,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";

const elementCogs = <FontAwesomeIcon icon={faCogs} />;
const elementTools = <FontAwesomeIcon icon={faTools} />;
const minimizeIcon = <FontAwesomeIcon icon={faMinus} />;
const timesIcon = <FontAwesomeIcon icon={faTimes} />;
const elementMaximaze = <FontAwesomeIcon icon={faWindowMaximize} />;
const elementRestore = <FontAwesomeIcon icon={faWindowRestore} />;
const ipcRenderer = window.require("electron").ipcRenderer;

const TitleBar:React.FC=()=>{
    const [minimize,SetMinimize]= useState(0); // 0 full 1 max
    const [restore,SetRestore]= useState(0);
//     ipcRenderer.send("maximize-window");
//  ipcRenderer.send("restore-window");

const hanldeRestore=(e)=>{
    if(restore){
        SetRestore(restore-1);
    }else{
        SetRestore(restore+1);
    }
  
// ipcRenderer.send("maximize-window");
}



    return(
        <header className="title-bar">
            <div className="Name"> <img src="../../../public/favicon.ico" alt=""/> Profiler</div>
            <ul className="title-bar-menu">
                 <li className="title-bar-menu-item">
                    <Button className="title-bar-btn" title="Minimize" id="minimize" children={[minimizeIcon]} handleClick={()=>{ ipcRenderer.send("restore-window")}}/>
                </li>
                
                <li className="title-bar-menu-item">
                    <Button className="title-bar-btn" title="Maximize" id="maximise" children={restore?[elementMaximaze]:[elementRestore]}  handleClick={(e)=>{hanldeRestore(e)}}/>
                </li>
                 <li className="title-bar-menu-item">
                    <Button className="title-bar-btn" title="Close" id="Close" children={[timesIcon]} handleClick={()=>{ ipcRenderer.send("restore-window")}}/>
                </li>
               
            </ul>

        </header>
    )
}

export default TitleBar;
