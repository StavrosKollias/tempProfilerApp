import React from "react";
import "./Input.scss";
import { IInputProps } from "./IInputProps";

const Input: React.FC<IInputProps> = (props) => {
   return (
      <div className={props.containerClassName ? `input-container ${props.containerClassName}` : `input-container`}>
         {props.label && <label htmlFor={props.name}>{props.label}</label>}

         <div className={props.type==="range"?"input-container-sub-range":"input-container-sub"}>
            {props.icon && props.icon}
            <input
               type={props.type}
               className={props.error?`${props.className} txt-danger`: props.className}
               id={props.id}
               name={props.name}
               placeholder={props.placeholder}
               min={props.min}
               max={props.max}
               step={props.step}
               defaultValue={props.defaultValue}
            
                data-role={props.dataRole}
               onInput={(e:React.ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
            />
            {props.visibilityIcons &&
               props.visibilityIcons.map((e, i) => {
                  return <span key={i}>{e}</span>;
               })}
               {props.strengthIcon &&  props.strengthIcon}
         </div>
         
      </div>
   );
};

export default Input;
