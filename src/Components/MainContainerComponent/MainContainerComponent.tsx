import React from "react";
import NavigationBarComponent from "../NavigationBarComponent/NavigationBarComponent";
import SideBarComponent from "../SideBar/SideBarComponent/SideBarComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./MainContainerComponent.scss";
import LoginRegisterPopupComponent from "../LoggingRegisterPopupComponent/LoginRegisterPopupComponent";
import LoginFormComponent from "../Forms/LoginFormComponent/LoginFormComponent";
import RegisterFormComponent from "../Forms/RegisterFormComponent/RegisterFormComponent";
import LinkComponent from "../Peripherals/LinkComponent/LinkComponent";
import { addWindowHandlers } from "../../functions/widnowHandlers";
const remote = window.require("electron").remote;
const getUserByID = remote.getGlobal("getUserByID");

interface IMainContainerComponentState {
   activeSideBar: boolean;
   userID: string;
   userName: string;
}

class MainContainerComponent extends React.Component<{}, IMainContainerComponentState> {
   constructor(props: IMainContainerComponentState) {
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
         <div className="main-wrapper flex-row" data-role="page" data-theme="light">
            <Router>
               {/* {!this.state.userID && } */}

               <SideBarComponent active={this.state.activeSideBar} userName={this.state.userName} />
               <div className="main-wrapper-right" data-role="page-sub-content">
                  <NavigationBarComponent activeSideBar={this.state.activeSideBar} changeStateSideBar={(e) => this.changeStateSibeBar(e)} userName={this.state.userName} />
                  <Switch>
                     <Route path="/" exact render={() => <LoginRegisterPopupComponent />} />
                     <Route path="/Register" exact render={() => <RegisterFormComponent />} />
                     <Route path="/Login" exact render={() => <LoginFormComponent changeStateUserID={(e) => this.changeStateUserID(e)} failed={false} />} />
                     <Route
                        path="/:username"
                        render={({ match }) => (
                           <div>
                              
                              You Are Logged In Congrats <LinkComponent   innerText="Back Login" to="/Login" handleClick={(e) => console.log("heu")}  />{" "}
                           </div>
                        )}
                     />

                     {/* <Route path="/Product/:section/:product" render={({ match }) => <ProductDetails url={this.changeView.bind(this)} match={match} />} /> */}
                     {/* <Route path="/:username" render={({ match }) => <ResourcesContainer url={this.changeView.bind(this)} match={match} />} /> */}
                  </Switch>
               </div>
            </Router>
         </div>
      );
   }
}

export default MainContainerComponent;
