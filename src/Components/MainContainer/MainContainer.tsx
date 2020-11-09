import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import SideBarComponent from "../SideBar/SideBarComponent/SideBarComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./MainContainer.scss";
import LogInRegisterPopup from "../LogInRegisterPopup/LogInRegisterPopup";
import LoginForm from "../Forms/LoginForm/LoginForm";
import RegisterForm from "../Forms/RegisterForm/RegisterForm";
import { addWindowHandlers } from "../../functions/widnowHandlers";
// import TitleBar from "../TitleBar/TitleBar";
import Test from "../TestCommunication/Test";


const remote = window.require("electron").remote;
const getUserByID = remote.getGlobal("getUserByID");

interface IMainContainerState {
   activeSideBar: boolean;
   userID: string;
   userName: string;
}

class MainContainer extends React.Component<{}, IMainContainerState> {
   constructor(props: IMainContainerState) {
      super(props);
      this.state = {
         activeSideBar: false,
         userID: "",
         userName: "",
      };
   }

   changeStateSibeBar(event: EventTarget) {
      let activeSideBar = false;
      this.state.activeSideBar ? (activeSideBar = false) : (activeSideBar = true);
      this.setState({
         activeSideBar,
      });
   }

   changeStateUserID(userID: string) {
      this.setState({
         userID,
      });
         this.getUserLoggedIn();
   }

   changeStateUseName(userName: any) {
      this.setState({
         userName,
      });

   
   }

   componentDidMount() {
      console.log("MainComponent mounted");
      addWindowHandlers();
      window.addEventListener("resize", (e) => {
         this.changeStateSliderDependingClientWidth();
      });
      this.changeStateSliderDependingClientWidth();
   }

   async getUserLoggedIn() {
      let user;
      if(this.state.userID) user = await getUserByID(this.state.userID);
      if (user) this.changeStateUseName(user.proxies[0].username);
   }

   changeStateSliderDependingClientWidth() {
      document.documentElement.clientWidth < 1400 ? this.setState({ activeSideBar: false }) : this.setState({ activeSideBar: true });
   }

   render() {
      return (

         <div className="Widnow">
            {/* <TitleBar/> */}
         <div className="main-wrapper flex-row" data-role="page" data-theme="light">

            <Router>
               <SideBarComponent active={this.state.activeSideBar} userName={this.state.userName} />
               <div className="main-wrapper-right" data-role="page-sub-content">
                  <NavigationBar activeSideBar={this.state.activeSideBar} changeStateSideBar={(e) => this.changeStateSibeBar(e)} userName={this.state.userName} />
                  <Switch>
                     <Route path="/" exact  render={() => <LogInRegisterPopup/>} />
                     <Route path="/Register"  render={() => <RegisterForm />} />
                     <Route path="/Login"  render={() => <LoginForm changeStateUserID={(e) => this.changeStateUserID(e)} failed={false} />} />
                     <Route
                        path="/:username/Testing com"
                        render={() => (
                           <Test userName={this.state.userName} result0="I am the result from #00# request"  result1="I am the result from #01# request" result2="I am the result from #02# request" result3="I am the result from #03# request" />
                     
                        )}
                     />

                     {/* <Route path="/Product/:section/:product" render={({ match }) => <ProductDetails url={this.changeView.bind(this)} match={match} />} /> */}
                     {/* <Route path="/:username" render={({ match }) => <ResourcesContainer url={this.changeView.bind(this)} match={match} />} /> */}
                  </Switch>
               </div>
            </Router>
         </div>

             </div>
      );
   }
}

export default MainContainer;
