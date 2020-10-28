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
            activeSideBar:false,
        }
    }


    changeStateSibeBar(event: EventTarget) {
      let activeSideBar=false;
      this.state.activeSideBar?activeSideBar=false:activeSideBar=true;
        this.setState({
            activeSideBar
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