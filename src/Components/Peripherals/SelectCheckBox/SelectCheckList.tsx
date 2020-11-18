import React, { useCallback } from "react";
import { closeActiveSelectMenuWindowClick } from "../../../functions/widnowHandlers";
import { IChannelDisplay } from "../../../interfaces/utils";
import "./SelectCheckList.scss";

interface ISelectCheckList{
    title:string;
    icon:JSX.Element;
    labels:Array<IChannelDisplay>;
    className: string;
    handleClickCheckBoxSelect(e: React.FormEvent<HTMLInputElement>):void;
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
                        <li key={i} tabIndex={1} ><input type="checkbox" className="" name={e.name} id={`check-item-${e}`}  checked={e.active} onChange={(event)=>{props.handleClickCheckBoxSelect(event)}}/>
                            <label tabIndex={1} htmlFor={e.name}>{e.name}</label>
                        </li>  
                        )
               
                })}
            </ul>
             
        </div>
    )
}

export default SelectCheckList;

