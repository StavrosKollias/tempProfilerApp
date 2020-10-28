import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
} from "@fortawesome/free-solid-svg-icons";
const cubeIcon = <FontAwesomeIcon icon={faCube} />;

const SideBarLogoComponent:React.FC<{}>=(props)=>{
    return(
        <div className="side-bar-logo">
        <div className="logo">{cubeIcon} Profiler</div>
        </div>
    )
}

export default SideBarLogoComponent;