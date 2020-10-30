export interface IInputComponentProps {
   containerClassName?: string;
   className: string;
   id?: string;
   handleChange?(e: React.ChangeEvent<HTMLInputElement>): void;
   name: string;
   label: string;
   type: string;
   min?: number;
   max?: number;
   value?: string;
   placeholder?: string;
   icon?: JSX.Element;
   strengthIcon?:JSX.Element
   visibilityIcons?: Array<JSX.Element>;
   error?:boolean;
}
