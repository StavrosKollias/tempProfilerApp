export  interface ISelectComponentProps{
    containerClassName?:string;
    className:string;
    id:string;
    handleChange?(e:React.ChangeEvent<HTMLSelectElement>):void;
    name:string;
    label?:string;
    value?:string;
    options:Array<string>
}
