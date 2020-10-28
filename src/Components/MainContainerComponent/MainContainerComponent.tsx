import React from "react";
import NavigationBarComponent from "../NavigationBarComponent/NavigationBarComponent";
import SideBarComponent from "../SideBarComponent/SideBarComponent";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './MainContainerComponent.scss';

interface IMainContainerComponentState{
    activeSideBar:boolean;
}

class MainContainerComponent extends React.Component<{},IMainContainerComponentState>{
    constructor(props:IMainContainerComponentState){
        super(props);
        this.state={
            activeSideBar:true,
        }
    }


    changeStateSibeBar(event: EventTarget) {
      let activeSideBar=false;
      this.state.activeSideBar?activeSideBar=false:activeSideBar=true;
        this.setState({
            activeSideBar
         });
     }


    render(){
    return(
        <div className="main-wrapper flex-row" data-role="page" data-theme="light">
         <Router>
       
           <SideBarComponent active={this.state.activeSideBar}/>
           <div className="main-wrapper-right" data-role="page-sub-content" >
               <NavigationBarComponent activeSideBar={this.state.activeSideBar} changeStateSideBar={(e)=>this.changeStateSibeBar(e)} />
           </div>
           </Router> 
        </div>
    )
}
} 


export default MainContainerComponent