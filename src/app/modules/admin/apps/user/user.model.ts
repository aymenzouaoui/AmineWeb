import {Observable} from "rxjs";

export interface User {
    userID: string;
    firstname: string;
    lastname: string;
    username:string;
    email: string;
    password: string;
    refreshToken?: string;
    phone?: string;
    avatar?: string;
    isBanned?: boolean;
    role?: string;

    asObservable(): Observable<User>;
}
