import React from "react";
import CardBoxcontainer from "../CardBox/CardBoxContainer/CardBoxContainer";
import MiniChartsSection from "../MiniChartsSection/MiniChartsSection";

interface IDashBoardProps{
    userName:string;
}

const DashBoard:React.FC<IDashBoardProps>=(props)=>{
    return(
        <section className="dashboard">
            <div className="container">
                <CardBoxcontainer />
                <MiniChartsSection/>
            </div>
      
        </section>
    )
}

export default DashBoard;