import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { ISideBarItemListProps } from "./ISideBarItemListProps";


const SideBarItemList:React.FC<ISideBarItemListProps>=(props)=>{
    return(
     
        <ul className={props.active? `side-bar-item-list active-side-menu`:`side-bar-item-list`}>
            {props.subMenu.map((e,i)=>{
                  return  <li key={i}><Link to="/" >{e}</Link></li>
                })}
        </ul>
    )
} 

export default SideBarItemList;