import { ApplicationConfig, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ApplicationService } from 'app/core/applicationKey/application.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
/**
 * @title Stepper overview
 */
@Component({
    selector: 'stepper-overview-example',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss'],
    standalone: true,
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [FormsModule,
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, NgFor, NgIf, MatSelectModule, MatOptionModule, TitleCasePipe
    ]
})
export class StepperOverviewExample implements OnInit {
    applications: any[] = [];
    programmingLanguages: string[] = ['Android', 'Flutter', 'Swift', 'React Native', 'iOS', 'Java', 'Kotlin', 'Objective-C'];

    searchTerm: string = ''; // Propriété pour stocker le terme de recherche
    filteredApplications: any[] = []; // Propriété pour stocker les applications filtrées

    selectedFileName: string;
    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
        languageOfDevelopment: ['', Validators.required],
    });
    isLinear = false;

    constructor(private _fuseConfirmationService: FuseConfirmationService, private clipboard: Clipboard, private _formBuilder: FormBuilder, private _applicationService: ApplicationService,) { }
    ngOnInit(): void {
        this.loadApplications();
        this.filteredApplications = this.applications
    }

    // Méthode pour effectuer la recherche
    search(): void {
        // Filtrer les applications en fonction du terme de recherche
        this.filteredApplications = this.applications.filter(application =>
            application && application.name &&
            application.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }


    onLogoSelected(event): void {

        console.log("ssssssssss");

        const file: File = event.target.files[0];
        this.selectedFileName = file.name;
        console.log(file.name);

        // Here you can handle the file upload logic
    }

    // Function to add a new application
    addApplication(): void {
        const formData = {
            name: this.firstFormGroup.get('firstCtrl').value,
            logo: this.selectedFileName,
            languageOfDevelopment:this. secondFormGroup.get('flanguageOfDevelopment').value,

        };

        this._applicationService.createApplication(formData).subscribe(
            response => {
                console.log('Application added successfully:', response);
                // Ajouter la nouvelle application à la liste sans recharger la page
                this.applications.push(response);
                // Réinitialiser les champs du formulaire après l'ajout
                this.firstFormGroup.reset();
                this.selectedFileName = ''; // Réinitialiser le nom du fichier sélectionné
            },
            error => {
                console.error('Failed to add application:', error);
            }
        );
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }



    loadApplications(): void {
        this._applicationService.getAllApplications().subscribe(
            applications => {

                // Assign the fetched applications to a property
                this.applications = applications;
                this.filteredApplications = applications
            },
            error => {
                console.error('Failed to fetch applications:', error);
            }
        );
    }

    toggleSecretVisibility(application: any) {
        application.showSecret = !application.showSecret;
    }
    copySecret(secretKey: string) {
        this.clipboard.copy(secretKey);
    }
    deleteApplication(applicationToDelete: any): void {
        // Ouvrir la boîte de dialogue de confirmation
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete product',
            message: 'Are you sure you want to remove this product? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
                cancel: {
                    label: 'Cancel',
                },
            }
        });

        // Attendre la réponse de la boîte de dialogue de confirmation
        confirmation.afterClosed().subscribe(confirmed => {
            if (confirmed === 'confirmed') {
                // Si l'utilisateur a confirmé la suppression, supprimer l'application
                // Filtrer les applications pour ne pas inclure celle que vous voulez supprimer
                this.applications = this.applications.filter(application => application !== applicationToDelete);
                this.filteredApplications = this.filteredApplications.filter(application => application !== applicationToDelete);

                // Appeler votre service pour supprimer l'application du backend (si nécessaire)
                this._applicationService.deleteApplication(applicationToDelete._id).subscribe(
                    response => {
                        console.log('Application deleted successfully:', response);
                    },
                    error => {
                        console.error('Failed to delete application:', error);
                    }
                );
            } else {
                // Si l'utilisateur a annulé, ne rien faire
                console.log('User cancelled the deletion');
            }
        });
    }


}
