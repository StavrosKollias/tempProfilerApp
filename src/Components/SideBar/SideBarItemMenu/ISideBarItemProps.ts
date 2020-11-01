export interface ISideBarItemProps {
   sideBarItems: Array<IMenuObject>;
   arrowIcon: JSX.Element;
   userName: string;
}

export interface IMenuObject {
   label: string;
   icon: JSX.Element;
   subMenu?: Array<string>;
   active: boolean;
}
