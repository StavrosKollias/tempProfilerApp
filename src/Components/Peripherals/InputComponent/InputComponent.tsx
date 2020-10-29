import React from "react";
import "./InputComponent.scss"
import { IInputComponentProps } from "./IInputComponentProps";

const InputComponent:React.FC<IInputComponentProps>=(props)=>{
    return (
        <div className={props.containerClassName?`input-container ${props.containerClassName}`:`input-container`}>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}

            <div className="input-container-sub" >
            {props.icon && props.icon}
            <input type={props.type} className={props.className} id={props.id} name={props.name} placeholder={props.placeholder} min={props.min} max={props.max} value={props.value}/>
            {props.visibilityIcons && props.visibilityIcons.map(e=>{
                return e
            })}
            </div>
        </div>
    )
}

export default InputComponent;