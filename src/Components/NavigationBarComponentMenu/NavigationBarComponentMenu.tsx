import React from "react";
import { INavigationBarComponentMenuProps } from "./INavigationBarComponentMenuProps";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import NavigationBarComponentMenuList from "../NavigationBarComponentMenuList/NavigationBarComponentMenuList";




const NavigationBarComponentMenu: React.FC<INavigationBarComponentMenuProps>=(props)=>{
    return(
        <ul className="nav-bar-menu">
        {props.navMenuItems.map((item,i)=>{
              return  <li key={i}><Link to={item.subMenu?"/":`/${item.label}`}  title={item.label} onClick={()=>console.log("hello")} className={item.active?"current":""}>{item.icon}  {item.subMenu && props.arrowIcon}  </Link>  {item.subMenu &&  <NavigationBarComponentMenuList subMenu={item.subMenu} active={item.active}/>}</li>
            })}
    </ul>
    )
}
export default NavigationBarComponentMenu