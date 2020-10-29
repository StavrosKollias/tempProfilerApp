import React from "react";
import NavigationBarComponent from "../NavigationBarComponent/NavigationBarComponent";
import SideBarComponent from "../SideBar/SideBarComponent/SideBarComponent";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import './MainContainerComponent.scss';
import LoginRegisterPopupComponent from "../LoggingRegisterPopupComponent/LoginRegisterPopupComponent";
import LoginFormComponent from "../Forms/LoginFormComponent/LoginFormComponent";
import RegisterFormComponent from "../Forms/RegisterFormComponent/RegisterFormComponent";
import { generateCustomSelectionButton } from "../../functions/SelectComponent";

interface IMainContainerComponentState{
    activeSideBar:boolean;
    userID:string;
}

class MainContainerComponent extends React.Component<{},IMainContainerComponentState>{
    constructor(props:IMainContainerComponentState){
        super(props);
        this.state={
            activeSideBar:false,
            userID:""
        }
    }


    changeStateSibeBar(event: EventTarget) {
      let activeSideBar=false;
      this.state.activeSideBar?activeSideBar=false:activeSideBar=true;
        this.setState({
            activeSideBar
         });
    }

    changeStateUserID(userID: string) {
          this.setState({
            userID
           });
    }

     componentDidMount(){
         window.addEventListener("resize",(e)=>{
            this.changeStateSliderDependingClientWidth();
         });
         this.changeStateSliderDependingClientWidth();

   
     }

     changeStateSliderDependingClientWidth(){
        document.documentElement.clientWidth<1400?this.setState({activeSideBar:false}): this.setState({activeSideBar:true});
     }


    render(){
    return(
        <div className="main-wrapper flex-row" data-role="page" data-theme="light">
         <Router>
         {/* {!this.state.userID && } */}

           <SideBarComponent active={this.state.activeSideBar} userID={this.state.userID}/>
           <div className="main-wrapper-right" data-role="page-sub-content" >
               <NavigationBarComponent activeSideBar={this.state.activeSideBar} changeStateSideBar={(e)=>this.changeStateSibeBar(e)} userID={this.state.userID} />
                     <Switch>
                        <Route path="/" exact render={() =>  <LoginRegisterPopupComponent />} />
                        <Route path="/Register" exact render={() =>  <RegisterFormComponent />} />
                        <Route path="/Login" exact render={() => <LoginFormComponent />} />
                        {/* <Route path="/Product/:section/:product" render={({ match }) => <ProductDetails url={this.changeView.bind(this)} match={match} />} /> */}
                     </Switch>
           </div>
           </Router> 
        </div>
    )
}
} 


export default MainContainerComponent