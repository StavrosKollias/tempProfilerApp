import React, { useState } from "react";
import Button from "../Button/Button";
import "./TabsComponent.scss";

interface ITabsComponentProps{
    tabs:Array<string>;
    children:Array<JSX.Element>;
}

const TabsComponent:React.FC<ITabsComponentProps>=(props)=>{
    const [state,setState]= useState<number>(0);

    const hanldeClickTab=(tabNumber:number)=>{
        setState((state)=>tabNumber);
    }


    return(
        <div className="tabs-component">
            <div className="tabs">
                {props.tabs.map((tab,i)=>{
                    return <Button key={i} className={i===state?"tabs-item active":"tabs-item"} id={`tabs-item-${i}`} handleClick={()=>hanldeClickTab(i)} innerText={tab} title={tab}/>
                })}
            </div>
            <div className="tabs-blocks">
                 {props.tabs.map((tab,i)=>{
                    return <div key={i} className={i===state?"tabs-blocks-item active":"tabs-blocks-item"}  id={`tabs-blocks-item-${i}`} title={tab}>{props.children[i]}</div>
                })}
            </div>
        </div>
    )
}

export default TabsComponent