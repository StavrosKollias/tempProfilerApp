import React from "react";
import { ISideBarMenuSubMenuProps } from "./ISideBarMenuSubMenuProps";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


const SideBarItemMenuSubMenu:React.FC<ISideBarMenuSubMenuProps>=(props)=>{
    return(
     
        <ul className={props.active? `side-bar-item-list active-side-menu`:`side-bar-item-list`}>
            {props.subMenu.map((e,i)=>{
                  return  <li key={i}><Link to="/" >{e}</Link></li>
                })}
        </ul>
    )
} 

export default SideBarItemMenuSubMenu;