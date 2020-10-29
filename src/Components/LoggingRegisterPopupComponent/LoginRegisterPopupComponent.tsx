import React from "react";
import LinkComponent from "../Peripherals/LinkComponent/LinkComponent";

import "./LoginRegisterPopupComponent.scss"


const LoginRegisterPopupComponent: React.FC=(props)=>{
    return(
        <div className="login-popup">
            <div className="buttons-container">
                <h2 className="login-popup-title">Login to use the software</h2>
                <LinkComponent className="btn btn-info" id="open-login-btn" innerText="Login" to={"/Login"}/>
                <h2 className="login-popup-title">Don't have and account? Register as a new user now</h2>
                <LinkComponent className="btn btn-primary" id="open-login-btn" innerText="Register" to={"/Register"}/>
            </div>
        </div>
    )
}

export default LoginRegisterPopupComponent;