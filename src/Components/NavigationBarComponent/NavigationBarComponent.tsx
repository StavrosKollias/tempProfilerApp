import React from "react";
import NavigationBarComponentMenu from "../NavigationBarComponentMenu/NavigationBarComponentMenu";
import ButtonComponent from "../Peripherals/ButtonComponent/ButtonComponent";


import "./NavigationBarComponent.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComment,
  faAngleDown,  
  faBookOpen,
  faBellSlash
} from "@fortawesome/free-solid-svg-icons";


const userIcon= <FontAwesomeIcon icon={faUser}/>;
const docIcon= <FontAwesomeIcon icon={faBookOpen}/>;
const arrowDownIcon= <FontAwesomeIcon icon={faAngleDown}/>;
const commentIcon= <FontAwesomeIcon icon={faComment}/>;
const bellSlashIcon= <FontAwesomeIcon icon={faBellSlash}/>;

interface INavigationBarComponentProps{
    activeSideBar:boolean
    changeStateSideBar?(e:EventTarget):void;
    userID:string;
}



const NavigationBarComponent:React.FC<INavigationBarComponentProps>=(props)=>{
    const menuArray= [
        {label:"Alert", icon:bellSlashIcon,active:false},
        {label:"Notes", icon:commentIcon,active:false},
        {label:"Language", icon:docIcon,active:false, subMenu:["English", "Polish"]},
        {label:"User",icon: userIcon ,active:false, subMenu:["SignIn", "Login", "Create New Account"] }
        ];

    return(
        <nav data-theme="light" data-role="nav-bar"  className={props.userID?"nav-bar":"nav-bar noPointerEvents"} >
            <ButtonComponent handleClick={e=>props.changeStateSideBar(e)} className={props.activeSideBar?"nav-bar-button":"nav-bar-button active-side-left"} id="nav-bar-button" dataTheme="light" children={[<div></div>]}/>
            <NavigationBarComponentMenu navMenuItems={menuArray} arrowIcon={arrowDownIcon}/>
        </nav>
    )
}

export default NavigationBarComponent;