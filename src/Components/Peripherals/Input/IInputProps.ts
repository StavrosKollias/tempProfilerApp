export interface IInputProps {
   containerClassName?: string;
   className: string;
   id?: string;
   handleChange?(e: React.ChangeEvent<HTMLInputElement>): void;
   name: string;
   label?: string;
   type: string;
   min?: string;
   max?: string;
   step?:string;
   defaultValue?: string;
   placeholder?: string;
   icon?: JSX.Element;
   strengthIcon?:JSX.Element
   visibilityIcons?: Array<JSX.Element>;
   error?:boolean;
   dataRole?:string;
}
