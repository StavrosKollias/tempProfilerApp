import React from "react";

interface ISidebarItemProps{
    sidebarItems:Array<string>
}



const SideBarItemMenu:React.FC<ISidebarItemProps>=(props:ISidebarItemProps)=>{
    return(
        <ul className="side-bar-item">
            {
                props.sidebarItems.map((e,i)=>{
                    <li key={i}></li>
                })
            }
            
            <li></li>
        </ul>
    )
} 