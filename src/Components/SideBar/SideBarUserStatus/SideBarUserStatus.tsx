import React from "react";
import RoundedImageComponent from "../../Peripherals/RoundedImageComponent/RoundedImageComponent";
import "./SideBarUserStatus.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
const userIcon= <FontAwesomeIcon icon={faUser}/>;

interface ISideBarUserStatusProps{
    active:boolean;
    userName?:string;
}

const SideBarUserStatus:React.FC<ISideBarUserStatusProps>=(props)=>{
    return(
        <div id="media-main-user" className="media-main-user">
          <div className="user-info">
          <RoundedImageComponent icon={userIcon} className="image-user-container-rounded-m"/>
            <div className="user-details">
            <span className="user-info-name">{ props.userName? props.userName:"No User"}</span>
              <span><FontAwesomeIcon className={props.active?"txt-sucess":"txt-warning"} icon={props.active?faCheckCircle:faTimesCircle}/>
                <span>{props.active? "Online": "Offline"}</span></span>
            </div>
          </div>
        </div>
    )
}

export default SideBarUserStatus;