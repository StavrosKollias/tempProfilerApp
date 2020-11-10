export interface IButtonProps {
   className: string;
   id: string;
   title:string;
   children?: Array<JSX.Element | string>;
   innerText?: string;
   dataTheme?: string;
   dataRole?: string;
   handleClick?(e: any): void;
}
