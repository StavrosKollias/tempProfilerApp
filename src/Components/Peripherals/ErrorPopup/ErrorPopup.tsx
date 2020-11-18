import React from "react";
import Button from "../Button/Button";
import "./ErrorPopup.scss"

interface IErrorPopup{
    message:string;
    handleClickApprove?(e:React.MouseEvent<HTMLButtonElement>):void;
}


const ErrorPopup:React.FC<IErrorPopup>=(props)=>{
    return(
        <section className="error-popup">
            <title>{props.message}</title>
            <Button id="approve-error-btn" title="Approve" innerText="Approve" className="btn-info"/>
        </section>
    )
}

export default ErrorPopup;