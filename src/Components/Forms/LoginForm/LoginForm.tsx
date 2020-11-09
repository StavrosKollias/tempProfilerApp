import React from "react";
import { Route } from "react-router-dom";
import Button from "../../Peripherals/Button/Button";
import Input from "../../Peripherals/Input/Input";
import LinkComponent from "../../Peripherals/LinkComponent/LinkComponent";
import { setVisibilityToInput } from "../../../functions/toolkit";
import "./LoginForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ILoginFormState } from "./ILoginFormState";

const remote = window.require("electron").remote;
const validateUser = remote.getGlobal("validateUser");

const userIcon = <FontAwesomeIcon className="txt-dark" icon={faUser} />;
const lockIcon = <FontAwesomeIcon className="txt-dark" icon={faLock} />;
const eyeIcon = <FontAwesomeIcon className="txt-dark" data-role="visibility-icon" onClick={(e) => setVisibilityToInput(e)} icon={faEye} />;
const eyeSlashIcon = <FontAwesomeIcon className="txt-dark display-none" data-role="visibility-icon-replace" onClick={(e) => setVisibilityToInput(e)} icon={faEyeSlash} />;

class LoginForm extends React.Component<{ changeStateUserID(e: any): void; failed: boolean }, ILoginFormState> {
   constructor(props: ILoginFormState) {
      super(props);
      this.state = {
         password: "",
         username: "",
         changeStateUserID: this.props.changeStateUserID,
         failed: this.props.failed,
      };
   }

   async handleClickLoginButton(e) {
      const userNameValue = this.state.username;
      const passwordValue = this.state.password;
      const validation = await validateUser(userNameValue, passwordValue);
      if (validation.success) this.props.changeStateUserID(validation.userId);
      console.log(validation.success);
      this.setState({ failed: !validation.success });
   }

   handleChangeInputUserName(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
         username: e.target.value,
      });
   }

   handleChangeInputPassWord(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
         password: e.target.value,
      });
   }

   render() {
      return (
         <div className="login-form">
            <h2 className="login-form-title">Login Form</h2>
            <Input
               type="text"
               name="login-username"
               label="Enter username or Email"
               className="input-light"
               placeholder="Enter Username"
               containerClassName="important"
               id="username-login"
               icon={userIcon}
               handleChange={(e) => this.handleChangeInputUserName(e)}
               error={this.state.failed}
            />
            <Input
               type="password"
               name="password-username"
               label="Password"
               className="input-light important"
               placeholder="Enter Password"
               containerClassName="important"
               id="password-login"
               icon={lockIcon}
               visibilityIcons={[eyeIcon, eyeSlashIcon]}
               handleChange={(e) => this.handleChangeInputPassWord(e)}
               error={this.state.failed}
            />

            <div className="txt-danger">{this.state.failed && "Error Login"}</div>
            <div className="form-buttons-container">
               <Route
                  render={({ history }) => (
                     <Button
                        className="btn btn-primary"
                        id="log-in-btn"
                        innerText="Login"
                        handleClick={(e) => {
                           this.handleClickLoginButton(e).then((e) => {
                              history.push(this.state.failed ? `/Login` : `/${this.state.username}/dashboard`);
                           });
                        }}
                        // to={this.state.failed ? `/Login` : this.state.username?`/${this.state.username}`: `/Login`}
                     />
                  )}
               />
               <LinkComponent className="btn btn-danger" id="open-login-btn" innerText="Back" to={"/"} />
            </div>
         </div>
      );
   }
}

export default LoginForm;
