import React from "react";
import { INavigationBarMenuListProps } from "./INavigationBarMenuListProps";
import {Link} from "react-router-dom";


const NavigationBarMenuList:React.FC<INavigationBarMenuListProps>=(props)=>{
    return(
    
        <ul className= "nav-bar-menu-list">
            {props.subMenu.map((e,i)=>{
                  return  <li key={i}><Link to={`/${props.userName}/${e}`} >{e}</Link></li>
                })}
        </ul>
    )
} 

export default NavigationBarMenuList;