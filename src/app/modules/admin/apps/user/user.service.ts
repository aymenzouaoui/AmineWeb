import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDrawerMode } from '@angular/material/sidenav';
import { User } from './user.model';
import { user } from "../../../../mock-api/common/user/data";

@Injectable({ providedIn: 'root' })
export class UserService {

    private userSubject: BehaviorSubject<User | null> = new BehaviorSubject(null);
    user$: Observable<User | null> = this.userSubject.asObservable();
    matDrawer: MatDrawerMode;

    constructor(private httpClient: HttpClient) { }


    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    getUsers(): Observable<User[]> {
        console.log(this.accessToken);

        // Append the token to the request headers
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.accessToken}`
        });

        return this.httpClient.get<{ Users: User[] }>('http://localhost:9090/user', { headers }).pipe(
            map(response => response.Users),
            catchError(error => {
                console.error('Error getting users:', error);
                throw error; // Rethrow the error to propagate it to the subscriber
            })
        );
    }
    getUserById(userId: string): Observable<User> {
        const url = `http://localhost:9090/user/${userId}`;
        return this.httpClient.get<{ user: User }>(url).pipe(
            map(response => response.user)
        );
    }

    updateUserById(userId: string, userData: Partial<User>): Observable<User> {
        const url = `http://localhost:9090/user/${userId}`;
        return this.httpClient.put<User>(url, userData);
    }



}
