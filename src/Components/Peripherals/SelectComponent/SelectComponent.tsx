import React, { useEffect,useState } from "react";
import { generateCustomSelectionButton } from "../../../functions/SelectComponent";
import { ISelectComponentProps } from "./ISelectoComponentProps";
import "./SelectComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
const arrowIcon= <FontAwesomeIcon icon={faAngleDown} className="arrow-down"/>
const SelectComponent:React.FC<ISelectComponentProps>=(props)=>{
const [count,setCount]= useState(0);
          useEffect(() => {
             if(count===0){
                generateCustomSelectionButton();
                setCount(count + 1);
             }
            });   
    return(
        <div className={props.containerClassName?`input-container ${props.containerClassName}`:`input-container`}>
         {props.label && <label htmlFor={props.name}>{props.label}</label>}
         <div className="input-container-sub-select" >
         {arrowIcon}
         <select name={props.name}   
            id={props.id}
            data-role="select-theme"
            className={props.className} 
            onChange={(e)=>props.handleChange(e)}
            >
                {props.options.map((e,i)=>{
                    return   <option key={i} value={i}>{e}</option>
                })}
        </select>
      </div>
        
      </div>

    )
     
}

export default SelectComponent