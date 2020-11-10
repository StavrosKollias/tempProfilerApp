import React from "react";
import CardBoxcontainer from "../CardBox/CardBoxContainer/CardBoxContainer";

interface IDashBoardProps{
    userName:string;
}

const DashBoard:React.FC<IDashBoardProps>=(props)=>{
    return(
        <section className="dashboard">
            <div className="container">
                <CardBoxcontainer />
            </div>
      
        </section>
    )
}

export default DashBoard;