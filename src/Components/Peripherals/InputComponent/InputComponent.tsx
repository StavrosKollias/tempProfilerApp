import React from "react";
import "./InputComponent.scss"
import { IInputComponentProps } from "./IInputComponentProps";

const InputComponent:React.FC<IInputComponentProps>=(props)=>{
    return (
        <div className="input-container">
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} className={props.className} id={props.id} name={props.name} placeholder={props.placeholder} min={props.min} max={props.max} value={props.value}/>
        </div>
    )
}

export default InputComponent;