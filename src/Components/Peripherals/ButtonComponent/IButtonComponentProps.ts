export interface IButtonComponentProps {
   className: string;
   id: string;
   children?: Array<JSX.Element | string>;
   innerText?: string;
   dataTheme?: string;
   dataRole?: string;
   handleClick?(e: any): void;
}
