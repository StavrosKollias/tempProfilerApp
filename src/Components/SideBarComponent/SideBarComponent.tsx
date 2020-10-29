
import React from "react";
import SideBarItemMenu from "../SideBarItemMenu/SideBarItemMenu";
import { ISideBarComponentState } from "./ISideBarComponentState";
import SideBarLogoComponent from "../SideBarLogoComponent/SideBarLogoComponent";
import "./SideBarComponent.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faPager,
  faUser,
  faCogs,
  faAngleDown,
  faBookOpen
} from "@fortawesome/free-solid-svg-icons";
import SideBarUserStatus from "../SideBarUserStatus/SideBarUserStatus";


const slidersIcon= <FontAwesomeIcon icon={faSlidersH} />;
const arrowDownIcon= <FontAwesomeIcon icon={faAngleDown} />;
const pagerIcon= <FontAwesomeIcon icon={faPager}/>;
const userIcon= <FontAwesomeIcon icon={faUser}/>;
const docIcon= <FontAwesomeIcon icon={faBookOpen}/>;
const optionsIcon= <FontAwesomeIcon icon={faCogs}/>;

interface ISideBarComponentProps{
    active:boolean;
}


class  SideBarComponent extends React.Component<{active:boolean ,userID:string},ISideBarComponentState>{
    constructor(props:ISideBarComponentState ){
        super(props);
        this.state={
            active:this.props.active,
            userID:this.props.userID,
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
            <section className={this.props.active? this.props.userID?"side-bar":"side-bar noPointerEvents":this.props.userID?"side-bar toggled-left":"side-bar toggled-left noPointerEvents"} data-role="side-bar" data-theme="dark" >
                <div className="container">
                    <SideBarLogoComponent/>
                    <h2 className="side-bar-section-title">Menu</h2>
                    <SideBarItemMenu arrowIcon={arrowDownIcon} sideBarItems={menuArray}/>

                    <SideBarUserStatus active={false}/>
                </div>
            </section>

        )
    }
}


export default SideBarComponent;