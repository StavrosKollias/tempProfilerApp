import React from "react";

import "./ButtonComponent.scss"

interface IButtonComponentProps{
    className:string;
    id:string;
    children?: Array<JSX.Element> ;
    innerText?:string;
    dataTheme?: string;
    dataRole?:string;
    handleClick?(e:any):void;
}

const ButtonComponent: React.FC<IButtonComponentProps>=(props)=>{
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

export  default ButtonComponent;