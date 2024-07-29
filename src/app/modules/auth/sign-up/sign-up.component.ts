import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            company: [''],
            role: [''],
            agreements: ['', Validators.requiredTrue],
        },
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Ne rien faire si le formulaire est invalide
        if (this.signUpForm.invalid) {
            return;
        }

        // Désactiver le formulaire
        this.signUpForm.disable();

        // Masquer l'alerte
        this.showAlert = false;

        // Inscription
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {
                    // Naviguer vers la page de confirmation requise
                    this._router.navigateByUrl('/confirmation-required');
                },
                (error) => {
                    // Vérifier si l'erreur est due à un utilisateur déjà existant
                    if (error && error.error && error.error.message === 'User already exists.') {
                        // Afficher un message indiquant que l'utilisateur existe déjà
                        this.alert = {
                            type: 'error',
                            message: 'User already exists.',
                        };
                    } else {
                        // Réactiver le formulaire
                        this.signUpForm.enable();

                        // Réinitialiser le formulaire
                        this.signUpNgForm.resetForm();

                        // Afficher un message d'erreur par défaut
                        this.alert = {
                            type: 'error',
                            message: error.error.message || 'Something went wrong, please try again.',
                        };
                    }

                    // Afficher l'alerte
                    this.showAlert = true;
                }
            );
    }

}
