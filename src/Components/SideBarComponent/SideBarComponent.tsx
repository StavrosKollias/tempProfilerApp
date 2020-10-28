
import React from "react";
import SideBarItemMenu from "../SideBarItemMenu/SideBarItemMenu";
import SideBarLogoComponent from "../SideBarLogoComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faPager,
  faUser,
  faTimes,
  faDesktop,
  faCogs,
  faAngleDown,
  faBookOpen
} from "@fortawesome/free-solid-svg-icons";

import "./SideBarComponent.scss"

interface ISideBarComponentState{
    active:boolean;
}

const slidersIcon= <FontAwesomeIcon icon={faSlidersH} />;
const arrowDownIcon= <FontAwesomeIcon icon={faAngleDown} />;
const pagerIcon= <FontAwesomeIcon icon={faPager}/>;
const userIcon= <FontAwesomeIcon icon={faUser}/>;
const docIcon= <FontAwesomeIcon icon={faBookOpen}/>;
const optionsIcon= <FontAwesomeIcon icon={faCogs}/>;

class  SideBarComponent extends React.Component<{},ISideBarComponentState>{
    constructor(props:ISideBarComponentState ){
        super(props);
        this.state={
            active:true,
        }
    }

    render(){
        const menuArray= [
            {label:"DashBoard", icon:slidersIcon,active:false},
            {label:"Pages", icon:pagerIcon, subMenu:["Temperature", "Zones"],active:false},
            {label:"Documentation", icon:docIcon, subMenu:["Temperature", "Zones"],active:false},
            {label:"Options",icon:optionsIcon, subMenu:["Temperature", "Zones"],active:false},
            {label:"User", icon:userIcon,active:false },
            ];
        return(
            <section className="side-bar toggle-left" data-role="side-bar" data-theme="dark" >
                <div className="container">
                    <SideBarLogoComponent/>
                    <h2 className="side-bar-section-title">Menu</h2>
                    <SideBarItemMenu arrowIcon={arrowDownIcon} sideBarItems={menuArray}/>
                </div>
            </section>

        )
    }
}


export default SideBarComponent;