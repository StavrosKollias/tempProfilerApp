export interface ILoginFormComponentState {
   password: string;
   username: string;
   changeStateUserID(e: any): void;
   failed: boolean;
}
