import React, { useEffect, useState } from "react";
import { generateCustomSelectionButton } from "../../../functions/SelectComponent";
import { ISelectProps } from "./ISelectProps";
import "./Select.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const arrowIcon = <FontAwesomeIcon icon={faAngleDown} className="arrow-down" />;
const Select: React.FC<ISelectProps> = (props) => {
   const [state, setState] = useState<number>(0);
   useEffect(() => {
         const selectElement:HTMLSelectElement= document.querySelector(`#${props.id}`);
            generateCustomSelectionButton(selectElement);
   },[props,state,setState]);

   useEffect(()=>{
      return()=>{}
   });

   return (
      <div className={props.containerClassName ? `input-container ${props.containerClassName}` : `input-container`}>
         {props.label && <label htmlFor={props.name}>{props.label}</label>}
         <div className="input-container-sub-select">
            {arrowIcon}
            <select name={props.name} id={props.id} data-role="select-theme" className={props.className} onChange={(e) => props.handleChange(e)}>
               {props.options.map((e, i) => {
                  return (
                     <option key={i} value={i}>
                        {e}
                     </option>
                  );
               })}
            </select>
         </div>
      </div>
   );
};

export default Select;
