
import React from "react";
import {Line, Doughnut} from "react-chartjs-2";
import { IChartData, ITemplate } from "../../../interfaces/utils";
import "./MiniChart.scss";

interface IMiniChartProps{
    data?: IChartData;
    options?:any;
    type:string;
    template?:ITemplate;
}


const MiniChart:React.FC<IMiniChartProps>=(props)=>{


    return(
        <div className="mini-chart-container">
           {/* {props.template && <h2>{props.template.name}</h2>} */}
           {props.type==="line"   && <Line data={props.data} options={props.options} />} 
           {props.type!=="line" && <Doughnut data={props.data} options={props.options}/>}
        </div>
    )
}

export default MiniChart;