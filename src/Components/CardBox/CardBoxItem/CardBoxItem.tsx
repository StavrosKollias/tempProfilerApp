import React from "react";
import "./CardBoxItem.scss";

interface childElement{
    icon:JSX.Element;
    value:string;
    title:string;
}

interface ICardBoxItemProps{
    items?:Array<childElement>;
    controls?: Array<JSX.Element>;
    title:string;
}


const CardBoxItem:React.FC<ICardBoxItemProps>=(props)=>{
    return(
        <div className="card-box-item">
            <h4 className="card-box-item-title txt-secondary txt-normal">{props.title}</h4>
           {props.items && props.items.map((e,i)=>{
               return(
                  <div key={i} className="card-box-item-section">
                      <div className="card-box-item-section-icon">{e.icon}</div>
                      <div className="card-box-item-section-details">
                        <h5 className="card-box-item-section-title txt-normal">{e.title}</h5>
                        <div className="card-box-item-section-value">{e.value}</div>
                      </div>
               
                  </div>
                )
           })}

           {props.controls && props.controls.map((e,i)=>{
               return <div key={i} className="card-box-item-section-button">{e}</div>
           })}
        </div>
    );
}

export default CardBoxItem