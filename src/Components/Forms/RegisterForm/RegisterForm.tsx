import React from "react";
import {Route} from 'react-router-dom';
import Button from "../../Peripherals/Button/Button";
import Input from "../../Peripherals/Input/Input";
import LinkComponent from "../../Peripherals/LinkComponent/LinkComponent";
import Select from "../../Peripherals/Select/Select";

import { checkForLetterslengthInString, checkForSpecialCharactersLengthInString, setVisibilityToInput, validate } from "../../../functions/toolkit";
import { IRegisterFormState } from "./IRegisterFormState";
import "./RegisterForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faAt, faEye, faEyeSlash,faTimes,faCheck } from "@fortawesome/free-solid-svg-icons";
const remote = window.require("electron").remote;
const createUser = remote.getGlobal("createUser");
const userIcon = <FontAwesomeIcon className="txt-dark" icon={faUser} />;
const lockIcon = <FontAwesomeIcon className="txt-dark" icon={faLock} />;
const atIcon = <FontAwesomeIcon className="txt-dark" icon={faAt} />;
const timesIcon= <FontAwesomeIcon className="txt-danger" icon={faTimes} />;
const checkIcon= <FontAwesomeIcon className="txt-success" icon={faCheck} />;
const eyeSlashIcon = (
   <FontAwesomeIcon className="txt-dark  display-none" data-role="visibility-icon-replace" onClick={(e) => setVisibilityToInput(e)} icon={faEyeSlash} />
);
const eyeIcon = (
   <FontAwesomeIcon
      className="txt-dark"
      data-role="visibility-icon"
      onClick={(e) => {
         setVisibilityToInput(e);
      }}
      icon={faEye}
   />
);




class RegisterForm extends React.Component<{},IRegisterFormState> {
constructor(props:IRegisterFormState){
   super(props);
   this.state={
      userName:"",
      email:"",
      password:"",
      passwordRepeat:"",
      passwordStrength: null,
      passwordMatch:null,
      imageUrl:"",
      type:null,
      success:false
   }
}

changeStateUserName(e:React.ChangeEvent<HTMLInputElement>){
   this.setState({
      userName: e.target.value
   })
}

changeStateEmail(email:string){
   this.setState({
      email
   })
}

handleInputEmail(e:React.ChangeEvent<HTMLInputElement>){
   const emailValidation=validate(e.target.value);
   if(emailValidation){
      this.changeStateEmail(e.target.value)
   }
}

changeStatePassword(password:string,passwordStrength:boolean){
   this.setState({
      password,
      passwordStrength
   })
}

handleInputPassword(e:React.ChangeEvent<HTMLInputElement>){
   const password= e.target.value;
   const specialCharsLength=checkForSpecialCharactersLengthInString(e.target.value);
   const lettersLength=checkForLetterslengthInString(e.target.value);
   password.length>=5 && specialCharsLength>=1 && lettersLength>=1?this.changeStatePassword(password,true):this.changeStatePassword("",false);
}

changeStatePasswordRepeat(passwordRepeat:string,passwordMatch:boolean){
   this.setState({
      passwordRepeat,
      passwordMatch: passwordMatch
   })
}

handleInputPasswordRepeat(e:React.ChangeEvent<HTMLInputElement>){
   const passwordRepeat= e.target.value;
   const password= this.state.password;
   password===passwordRepeat ? this.changeStatePasswordRepeat(passwordRepeat,true): this.changeStatePasswordRepeat("",false)
}

changeStateImageUrl(e:React.ChangeEvent<HTMLInputElement>){
   this.setState({
      imageUrl: e.target.value
   })
}

changeStateType(e:React.ChangeEvent<HTMLSelectElement>){
   console.log(e.target.selectedIndex);
   this.setState({
      type: parseInt(e.target.value)
   })
}

async handleClickRegisterButton(){
  const userNameValue = this.state.userName;
   const emailValue = this.state.email;
   const passwordValue= this.state.password;
   const typeValue= this.state.type;
   const imageUrlValue= this.state.imageUrl;
   const validation = await createUser(userNameValue, emailValue, passwordValue, typeValue, imageUrlValue);
   if (validation.success) this.setState({success:validation.success});
}


   render(){
      return (
            <div className="register-form">
               <h2 className="register-form-title">Register Form</h2>
               <Input type="text" 
                  handleChange={(e)=>this.changeStateUserName(e)} 
                  name="register-name" label="Enter username" 
                  className="input-light" 
                  placeholder="Enter UserName" 
                  containerClassName="important" 
                  icon={userIcon} />
               <Input type="email" 
                  handleChange={(e)=>this.handleInputEmail(e)} 
                  name="register-email" 
                  label="Enter email" 
                  className="input-light" 
                  placeholder="Enter Email" 
                  containerClassName="important" 
                  icon={atIcon} 
                  strengthIcon={this.state.email?checkIcon:timesIcon}
               />
               <Input
                  type="password"
                  handleChange={(e)=>this.handleInputPassword(e)}
                  name="register-password"
                  label="Password"
                  className="input-light"
                  placeholder="Enter Password"
                  containerClassName="important"
                  icon={lockIcon}
                  visibilityIcons={[eyeIcon, eyeSlashIcon]}
                  strengthIcon={this.state.passwordStrength?checkIcon:timesIcon}
               />
               <Input
                  type="password"
                  handleChange={(e)=>this.handleInputPasswordRepeat(e)}
                  label="Repeat Password"
                  name="register-password-repeat"
                  className="input-light"
                  placeholder="Repeat Password"
                  containerClassName="important"
                  icon={lockIcon}
                   strengthIcon={this.state.passwordMatch?checkIcon:timesIcon}
                  visibilityIcons={[eyeIcon, eyeSlashIcon]}
               />
               <Select
               title="Select user type"
                  options={["Select","Operator", "Engineer", "Supervisor"]}
                  className="select-dark"
                  name="select-user-type"
                  id="register-user-type"
                  label="Type"
                  containerClassName="important"
                  handleChange={(e)=>this.changeStateType(e)}
               />
               {/* <------------Need to add some style here--------------------> */}
               <div className="instructions">
                  <ul>
                     <li>Enter At least 1 char in password</li>
                     <li>password minimum length 5</li>
                  </ul>
               </div>
               <div className="form-buttons-container">
                  <Route render={({ history}) => 
                        <Button
                        title="Register Now"
                        className={this.state.type && this.state.userName && this.state.passwordStrength && this.state.passwordMatch?"btn-secondary":"btn-secondary disabled"} 
                        id="register-in-btn" 
                        innerText="Register" 
                        handleClick={(e) => {this.handleClickRegisterButton().then((e)=>{history.push(this.state.success?`/Login`:`/Register`);}); }} 
                        />             
                  } />
                  <LinkComponent className="btn btn-danger" id="open-login-btn" innerText="Back" to={"/"} />
               </div>
            </div>
         );
   }
  
};

export default RegisterForm;
