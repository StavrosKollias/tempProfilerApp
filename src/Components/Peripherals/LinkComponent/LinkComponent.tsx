import React from "react";
import "./LinkComponent.scss"
import { ILinkComponentProps } from "./ILinkComponentProps";
import {
    Link
  } from "react-router-dom";


const LinkComponent: React.FC<ILinkComponentProps>=(props)=>{
    return(
        <Link
        to={props.to}
        id={props.id}
        data-role={props.dataRole}
        data-theme={props.dataTheme}
        className={props.className}
        onClick={props.handleClick?(e)=>props.handleClick(e):null}
      >
        {props.children && props.children.map((e,i)=>{
            return <span key={i}>{e}</span> 
        })}
        {props.innerText}
      </Link>
    )
}

export  default LinkComponent;