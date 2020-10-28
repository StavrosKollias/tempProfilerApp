import React from "react";
import RoundedImageComponent from "../RoundedImageComponent/RoundedImageComponent";
import "./SideBarUserStatus.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
const userIcon= <FontAwesomeIcon icon={faUser}/>;
const checkCircleIcon= <FontAwesomeIcon icon={faCheckCircle}/>

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
              <span className="bg-sucess"><FontAwesomeIcon className={props.active?"bg-sucess":"bg-warning"} icon={faCheckCircle}/>
                <span>Online</span></span>
            </div>
          </div>
        </div>
    )
}

export default SideBarUserStatus;