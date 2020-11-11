import React from "react";
import {Line, Doughnut} from "react-chartjs-2";
import "./MiniChart.scss";

interface IMiniChartProps{
    data: any;
    options:any;
    type:string;
}

const MiniChart:React.FC<IMiniChartProps>=(props)=>{
    return(
        <div className="mini-chart-container">
           {props.type==="line"   && <Line data={props.data} options={props.options} />} 
           {props.type!=="line" && <Doughnut data={props.data} options={props.options}/>}
        </div>
    )
}

export default MiniChart;