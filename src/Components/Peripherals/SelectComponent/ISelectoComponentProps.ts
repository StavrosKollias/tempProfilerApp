export  interface ISelectComponentProps{
    containerClassName?:string;
    className:string;
    id:string;
    handleChange?(e:Event):void;
    name:string;
    label?:string;
    value?:string;
    options:Array<string>
}
