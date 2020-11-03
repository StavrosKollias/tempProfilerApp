import React from "react";
import LinkComponent from "../../Peripherals/LinkComponent/LinkComponent";
import { ISideBarItemListProps } from "./ISideBarItemListProps";


const SideBarItemList:React.FC<ISideBarItemListProps>=(props)=>{
    return(
     
        <ul className={props.active? `side-bar-item-list active-side-menu`:`side-bar-item-list`}>
            {props.subMenu.map((e,i)=>{
                  return  <li key={i}>
                    <LinkComponent to={`/${props.userName}/${e}`} innerText={e} />
                  </li>
                })}
        </ul>
    )
} 

export default SideBarItemList;