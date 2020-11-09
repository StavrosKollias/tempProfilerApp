export interface ILoginFormState {
   password: string;
   username: string;
   changeStateUserID(e: any): void;
   failed: boolean;
}
