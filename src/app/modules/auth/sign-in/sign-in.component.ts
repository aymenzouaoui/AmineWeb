import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser, SocialAuthServiceConfig, MicrosoftLoginProvider } from "@abacritt/angularx-social-login";
import { NgIf } from '@angular/common';

// Declare the 'google' namespace
declare var google: any;

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})

export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        @Inject(SocialAuthService) private socialAuthService: SocialAuthService
    ) { }

    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['aymen.zouaoui@esprit.tn', [Validators.required, Validators.email]],
            password: ['admin', Validators.required],
            rememberMe: [''],
        });

        google.accounts.id.initialize({
            client_id: '754330445896-dfa97rp7o6u0l2aqoue3ajiq71spukvo.apps.googleusercontent.com',
            callback: this.handleCredentialResponse.bind(this)
        });

    }

    // Callback function to handle Google One Tap response
    handleCredentialResponse(response: any): void {
        // Handle the response as needed
        console.log('Google One Tap response:', response);
        console.log('Attempting onGoogleSignIn');
        console.log(response.credential);
        this._authService.signInWithGoogle(response.credential).subscribe(
            () => {
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
            },
            (error) => {
                console.error('Error signing in with Google:', error);
                this.alert = {
                    type: 'error',
                    message: 'User banned .',
                };
                this.showAlert = true;
            }
        );
    }
    // Sign in
    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();
        this.showAlert = false;

        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                    this._router.navigateByUrl(redirectURL);
                },
                (error) => {
                    this.signInForm.enable();
                    this.signInNgForm.resetForm();
                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password',
                    };
                    this.showAlert = true;
                },
            );
    }





    // Outlook Sign-In
    loginWithOutlook(): void {
        console.log('Attempting Outlook Sign-In');
        this.socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID).then((userData) => {
            // On successful sign-in, you can obtain the user's access token
            console.log('Outlook Sign-In successful');
            console.log(userData);
            const accessToken = userData.authToken;



            this._authService.signInWithOutlook(userData.idToken).subscribe(
                () => {
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                    this._router.navigateByUrl(redirectURL);
                },
                (error) => {
                    console.error('Error signing in with Google:', error);
                    this.alert = {
                        type: 'error',
                        message: 'Failed to sign in with Google.',
                    };
                    this.showAlert = true;
                }
            );
            // Now you can pass this accessToken to your backend to validate it and sign the user in.
        }).catch((error) => {
            console.error('Error signing in with Outlook:', error);
            this.alert = {
                type: 'error',
                message: 'Failed to sign in with Outlook.',
            };
            this.showAlert = true;
        });
    }

    loginWithGitHub(): void {
        // URL de redirection OAuth de GitHub avec votre client_id
        const clientId = 'f57f8ffbe96fb3329f05';
        const redirectUri = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect'; // Doit correspondre à l'URI configurée dans l'application GitHub
        const scope = 'read:user'; // Les scopes que vous souhaitez demander
        const state = 'UNIQUE_STATE_STRING'; // Un état généré pour prévenir les attaques CSRF

        // Construire l'URL d'autorisation OAuth de GitHub
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;

        // Rediriger l'utilisateur vers l'URL d'autorisation
        window.location.href = authUrl;
    }

}
