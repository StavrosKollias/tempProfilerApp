import React from "react";

interface IButtonComponentProps{
    className:string;
    id:string;
    children?: Array<JSX.Element>;
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
        {props.children.map((e,i)=>{
            return e
        })}
      </button>
    )
}

export  default ButtonComponent;