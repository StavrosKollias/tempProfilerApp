export interface INavigationBarComponentProps{
    activeSideBar:boolean
    changeStateSideBar?(e:EventTarget):void;
    userID:string;
}