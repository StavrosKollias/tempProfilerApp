export interface INavigationBarProps{
    activeSideBar:boolean
    changeStateSideBar?(e:EventTarget):void;
    userName:string;
}