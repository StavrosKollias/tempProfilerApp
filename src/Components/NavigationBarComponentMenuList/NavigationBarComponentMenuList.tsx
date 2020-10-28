import React from "react";
import { INavigationBarComponentMenuListProps } from "./INavigationBarComponentMenuListProps";
import {
    BrowserRouter as Router,  Link} from "react-router-dom";


const NavigationBarComponentMenuList:React.FC<INavigationBarComponentMenuListProps>=(props)=>{
    return(
     
        <ul className= "nav-bar-menu-list">
            {props.subMenu.map((e,i)=>{
                  return  <li key={i}><Link to="/" >{e}</Link></li>
                })}
        </ul>
    )
} 

export default NavigationBarComponentMenuList;