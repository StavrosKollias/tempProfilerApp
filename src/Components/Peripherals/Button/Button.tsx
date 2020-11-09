import React from "react";
import { IButtonProps } from "./IButtonProps";
import "./Button.scss"

const Button: React.FC<IButtonProps>=(props)=>{
    return(
        <button
        id={props.id}
        data-role={props.dataRole}
        data-theme={props.dataTheme}
        className={props.className}
        onClick={(e)=>props.handleClick(e)}
      >
        {props.children && props.children.map((e,i)=>{
            return <span key={i}>{e}</span> 
        })}
        {props.innerText}
      </button>
    )
}

export  default Button;