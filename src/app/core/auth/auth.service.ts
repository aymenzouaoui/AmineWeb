import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _isadmin: boolean = false;
    private url = "http://localhost:9090/";
    private _isbaned: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _cookieService: CookieService, private _router: Router,
        private ngZone: NgZone


    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
    get isadmin(): boolean {
        return this._isadmin;
    }

    get isBanned(): boolean {
        return this._isbaned;
    }
    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
        *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post(this.url + 'api/auth/forgotpassword', { email }).pipe(
            catchError((error: any) => {
                if (error.status === 403) {
                    // Use NgZone to ensure navigation is processed within Angular's zone
                    this.ngZone.run(() => {
                        this._router.navigateByUrl('/error/403');
                    });
                    return of(false);
                }
                // Return an observable with a false value to indicate sign-in failure
                return of(false);
            }),
            switchMap((response: any) => {
                // Store the access token in the local storage

                // Return a new observable with the response
                return of(response);
            }),
        );
    }

  /**
     * Reset password
     *
     * @param password New password
     * @param token Reset password token
     */
  resetPassword(password: string, token: string): Observable<any> {
    const requestBody = {
        password: password,
        token: token
    };

    return this._httpClient.post(this.url + 'api/auth/reset-password', requestBody).pipe(
        catchError((error: any) => {
            console.error('Error resetting password:', error);
            return throwError('Failed to reset password.');
        }),
        tap(() => {
            // Navigate to the sign-in page upon successful password reset
            this._router.navigate(['/sign-in']);
        })
    );
}


    signInWithGoogle(credential: string): Observable<any> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post<any>(this.url + 'api/auth/logingoogel', { credential }).pipe(
            catchError((error: any) => {
                if (error.status === 403) {
                    console.log("truuuuuuuuuuuuuuuuuuuu");

                    // Use NgZone to ensure navigation is processed within Angular's zone
                    this.ngZone.run(() => {
                        this._router.navigateByUrl('/error/403');
                    });
                    return of(false);
                }
                // Return an observable with a false value to indicate sign-in failure
                return of(false);
            }),
            map((response: any) => {
                this._isbaned=response.user.isBanned
                this.accessToken = response.accessToken;
                this._cookieService.set('refreshToken', response.refreshToken);
                this._authenticated = true;
                // Store the user on the user service
                console.log("adminnnnnnnnnnn");

                this._userService.user = response.user;
                if (response.user.role ==='admin'){
                    this._isadmin=true;}
                    console.log(this._isadmin);
                return response;

            }),
            catchError(error => {
                console.error('Error during Google sign-in:', error);
                return throwError('Failed to sign in with Google.');
            })
        );
    }
    navigateToSignIn(): void {
        this.ngZone.run(() => {
          this._router.navigate(['/sign-in']);
        });
      }
    signInWithOutlook(credential: string): Observable<any> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post<any>(this.url + 'api/auth/Outlook', { credential }).pipe(
            catchError((error: any) => {
                if (error.status === 403) {
                    // Use NgZone to ensure navigation is processed within Angular's zone
                    this.ngZone.run(() => {
                        this._router.navigateByUrl('/error/403');
                    });
                    return of(false);
                }
                // Return an observable with a false value to indicate sign-in failure
                return of(false);
            }),
            map((response: any) => {
                this._isbaned=response.user.isBanned
                this.accessToken = response.accessToken;
                this._cookieService.set('refreshToken', response.refreshToken);
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;
                console.log("adminnnnnnnnnnn");

                this._userService.user = response.user;
                if (response.user.role ==='admin'){
                    this._isadmin=true;}
                    console.log(this._isadmin);
                return response;
            }),
            catchError(error => {
                console.error('Error during WithOutlook sign-in:', error);
                return throwError('Failed to sign in with Outlook.');
            })
        );
    }
    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this.url + 'api/auth/login', credentials).pipe(
            catchError((error: any) => {
                if (error.status === 403) {
                    // Use NgZone to ensure navigation is processed within Angular's zone
                    this.ngZone.run(() => {
                        this._router.navigateByUrl('/error/403');
                    });
                    return of(false);
                }
                // Return an observable with a false value to indicate sign-in failure
                return of(false);
            }),
            switchMap((response: any) => {
                this._isbaned=response.user.isBanned
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Store the refresh token in cookies
                this._cookieService.set('refreshToken', response.refreshToken);

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response

                console.log("adminnnnnnnnnnn");

                this._userService.user = response.user;
                if (response.user.role ==='admin'){
                    this._isadmin=true;}
                    console.log(this._isadmin);
                return of(response);
            }),
        );
    }


    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {

        // Sign in using the token
        return this._httpClient.post(this.url + 'api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(

            catchError((error: any) => {
                if (error.status === 403) {
                    // Use NgZone to ensure navigation is processed within Angular's zone
                    this.ngZone.run(() => {
                        this._router.navigateByUrl('/error/403');
                    });
                    return of(false);
                }
                // Return an observable with a false value to indicate sign-in failure
                return of(false);
            }),
            switchMap((response: any) => {
                this._isbaned=response.user.isBanned;
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                console.log("adminnnnnnnnnnn ssssssssssssssssssssss");

                this._userService.user = response.user;
                if (response.user.role ==='admin'){
                    this._isadmin=true;}
                    console.log(this._isadmin);

                return of(true);
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {


        // Appel à l'API de déconnexion (facultatif, selon votre backend)
        // Assurez-vous que votre backend prend en charge cette route et gère correctement la déconnexion
        this._httpClient.post(`${this.url}api/auth/sign-out`, {
            accessToken: this.accessToken,
        }).subscribe(
            response => {
                // Supprimer le jeton d'accès du stockage local
                localStorage.removeItem('accessToken');

                // Supprimer le jeton de rafraîchissement du cookie
                this._cookieService.delete('refreshToken');

                // Mettre à jour l'état d'authentification
                this._authenticated = false;
                console.log("ffffffffff");

                this._isadmin=false;

                // Check the access token expire date
                if (AuthUtils.isTokenExpired(this.accessToken)) {
                    return of(false);
                }
                console.log('Successfully signed out'); // Facultatif : traitement du succès
            },
            error => {
                console.error('Error signing out:', error); // Facultatif : traitement des erreurs
            }
        );

        // Retourne un observable pour indiquer que la déconnexion s'est bien passée
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post(this.url + 'api/auth/register', user);
    }


    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post(this.url + 'api/auth/unlock-session', credentials);
    }



    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {

        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
         if (AuthUtils.isAccessTokenExpired(this.accessToken)) {
             return of(false);
         }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
