export interface IUser {
    username: string;
    token: string;
    displayName: string;
    image?: string;
    
}

export interface IUserFormValues {
    email:string;
    password:string;
    displayName?:string;
    username?:string;
}