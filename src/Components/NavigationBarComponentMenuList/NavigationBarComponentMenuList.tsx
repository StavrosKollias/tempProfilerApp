import React from "react";
import { INavigationBarComponentMenuListProps } from "./INavigationBarComponentMenuListProps";
import {Link} from "react-router-dom";


const NavigationBarComponentMenuList:React.FC<INavigationBarComponentMenuListProps>=(props)=>{
    return(
    
        <ul className= "nav-bar-menu-list">
            {props.subMenu.map((e,i)=>{
                  return  <li key={i}><Link to={`/${props.userName}/${e}`} >{e}</Link></li>
                })}
        </ul>
    )
} 

export default NavigationBarComponentMenuList;