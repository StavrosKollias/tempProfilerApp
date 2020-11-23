import React from "react";
import { Line } from "react-chartjs-2";
import * as ChartAnnotation from "chartjs-plugin-annotation";
import { IChartData, ITemplate } from "../../interfaces/utils";
import "./TemperatureChart.scss";

interface ITemperatureChartProps{
    data?: IChartData;
    options?:any;
    type?:string;
    template?:ITemplate;
}

const TemperatureChart: React.FC<ITemperatureChartProps>=(props)=>{
    return(
        <div className="chart-container">
            {props.type==="line"   && <Line data={props.data} options={props.options}  plugins={[ChartAnnotation]} />} 
        </div>
    )
}

export default TemperatureChart;