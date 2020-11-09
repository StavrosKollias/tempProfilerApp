import React from "react";

interface childElement{
icons:Array<JSX.Element>;
value:string;

}

interface ICardBoxProps{
    
}


const CardBox:React.FC=(props)=>{
    return(
        <div className="card-box">
            <h2 className="card-box-title">I am the title</h2>
            <div className="card-box-item">
              I am element    
            </div>
        </div>
    );
}