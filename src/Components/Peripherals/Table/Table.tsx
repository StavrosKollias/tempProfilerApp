import React from "react";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faSave, } from "@fortawesome/free-solid-svg-icons";
import "./Table.scss";
const trashIcon = <FontAwesomeIcon className="txt-light" icon={faTrashAlt} />;
const pencilIcon = <FontAwesomeIcon className="txt-light" icon={faPencilAlt} />;
const saveIcon = <FontAwesomeIcon className="txt-light" icon={faSave} />;




interface  ITableProps{
    data:any;
    titles: Array<string>
    legend:string;
    buttons:boolean;
    className?:string;
}


const Table:React.FC<ITableProps>=(props)=>{

    return(
        <div className="table-container bg-light">
            <legend>{props.legend}</legend>
            <table className={props.className?`table ${props.className}`:"table"}>
                <tbody>
                    <tr>
                        {props.titles.map((e,i)=>{
                            return <th key={i}>{e}</th> 
                        })}
                    </tr>
                    {props.data && props.data.map((e,j)=>{
                                let row=<tr key={j}>{Object.keys(e).map(function(key,k) {
                                        return <td key={k} >{e[key]}</td>
                                    })}
                    {props.buttons &&  <td key={props.data.length+1}><Button  id={`edit-${j}`} className="btn-success" title="Edit" children={[pencilIcon]}/>  <Button id={`save-${j}`} className="btn-info" title="Save" children={[saveIcon]}/> <Button id={`edit-${j}`} className="btn-danger" title="Delete" children={[trashIcon]}/> </td>}
                                    </tr>
                        return row;
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;