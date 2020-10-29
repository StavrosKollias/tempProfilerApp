import React from "react";
import "./LinkComponent.scss"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

interface ILinkComponentProps{
    className:string;
    id:string;
    children?: Array<JSX.Element> ;
    innerText?:string;
    dataTheme?: string;
    dataRole?:string;
    handleClick?(e:any):void;
    to?:string;
}

const LinkComponent: React.FC<ILinkComponentProps>=(props)=>{
    return(
        <Link
        to={props.to}
        id={props.id}
        data-role={props.dataRole}
        data-theme={props.dataTheme}
        className={props.className}
        onClick={props.handleClick?(e)=>props.handleClick(e):console.log("I was clicked")}
      >
        {props.children && props.children.map((e,i)=>{
            return <span key={i}>{e}</span> 
        })}
        {props.innerText}
      </Link>
    )
}

export  default LinkComponent;