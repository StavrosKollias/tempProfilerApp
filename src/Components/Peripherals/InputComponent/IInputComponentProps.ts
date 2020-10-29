export interface IInputComponentProps{
    containerClassName?:string;
    className?:string;
    id?:string;
    handleChange?(e:Event):void;
    name?:string;
    label?:string;
    type:string;
    min?:number;
    max?:number;
    value?:string;
    placeholder?:string;
    icon?:JSX.Element;
    visibilityIcon?:JSX.Element;
   }
   