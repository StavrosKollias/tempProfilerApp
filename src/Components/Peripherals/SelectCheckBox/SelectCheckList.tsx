import React, { useCallback, useEffect, useState } from "react";
import { createConstructor } from "typescript";
import { closeActiveSelectMenuWindowClick } from "../../../functions/widnowHandlers";
import Input from "../Input/Input";
import "./SelectCheckList.scss";

interface ISelectCheckList{
    title:string;
    icon:JSX.Element;
    labels:Array<string>;
    className: string;
}


const SelectCheckList:React.FC<ISelectCheckList>=(props)=>{
        const hadleClickButton=useCallback((event: React.MouseEvent<HTMLButtonElement>)=>{
            event.stopPropagation();
            event.preventDefault();
             const activeSelect = document.querySelector(".active-options-list");
            closeActiveSelectMenuWindowClick(activeSelect);
        },[]);



    return(
        <div className="select-check-list-container">
            <button onClick={(event)=>hadleClickButton(event)}   className={`${props.className} select-check-list`}><span>{props.title}</span> {props.icon}
            </button>
             <ul >
                {props.labels.map((e,i)=>{
                  return (
                        <li key={i} tabIndex={1} ><input type="checkbox" className="" name={e} id={`check-item-${e}`} onChange={(event)=>{event.stopPropagation(); console.log("hey")}}/>
                            <label tabIndex={1} htmlFor={e}>{e}</label>
                        </li>  
                        )
               
                })}
            </ul>
             
        </div>
    )
}

export default SelectCheckList;

