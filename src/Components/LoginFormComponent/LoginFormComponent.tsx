import React from "react";
import ButtonComponent from "../Peripherals/ButtonComponent/ButtonComponent";
import InputComponent from "../Peripherals/InputComponent/InputComponent";
import LinkComponent from "../Peripherals/LinkComponent/LinkComponent";
import "./LoginFormComponent.scss"


const LoginFormComponent:React.FC=(props)=>{

    return(
        <div className="login-form">

                <InputComponent type="text" label="Enter username or Email" className="input-light"  placeholder="Enter UserName"/>
                <InputComponent type="password" label="Password" className="input-light important" placeholder="Enter Password"/>

                <ButtonComponent className="btn-success" id="log-in-btn" innerText="Login"/>
                <LinkComponent className="btn btn-info" id="open-login-btn" innerText="Back" to={"/"}/>
        </div>
    )
}

export default  LoginFormComponent;