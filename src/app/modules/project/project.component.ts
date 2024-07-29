import { CurrencyPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { Clipboard } from '@angular/cdk/clipboard';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from './project.service';
import { ApplicationService } from 'app/core/applicationKey/application.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { UserService } from 'app/core/user/user.service';
import { User } from '../admin/apps/user/user.model';
import { UserComponent } from 'app/layout/common/user/user.component';
declare var cloudinary: any;
@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule,
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        UserComponent, NgIf,
        MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, NgFor, NgIf, MatSelectModule, MatOptionModule, TitleCasePipe,
        TranslocoModule, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass, CurrencyPipe],
})
export class ProjectComponent implements OnInit, OnDestroy {
    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;
    uploadedImageUrl: string;
    selectedProject: string = 'Flutter SDK';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    applications: any;
    filteredApplications: any;
    isCenteredDivVisible: boolean;
    searchTerm: any;
    programmingLanguages: string[] = ['Flutter', 'Swift', 'Android'];
    user: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _projectService: ProjectService,
        private _router: Router,
        private _applicationService: ApplicationService,
        private _fuseConfirmationService: FuseConfirmationService,
        private clipboard: Clipboard,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loadApplications();
        this.filteredApplications = this.applications;
        this.isCenteredDivVisible = false;

         // Subscribe to the user service
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: any) =>
            {
                this.user = user;
            });

        // Get the data
        this._projectService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                },
            },
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }





    loadApplications(): void {
        this._applicationService.getApplicationsByUserId().subscribe(
            applications => {

                // Assign the fetched applications to a property
                this.applications = applications;
                this.filteredApplications = applications;
                this.isCenteredDivVisible = false;
            },
            error => {
                console.error('Failed to fetch applications:', error);
            }
        );
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

                // Déclencher la détection des changements ici
                this._changeDetectorRef.detectChanges();
            } else {
                // Si l'utilisateur a annulé, ne rien faire
                console.log('User cancelled the deletion');
            }
        });
    }

    toggleSecretVisibility(application: any) {
        application.showSecret = !application.showSecret;
    }
    copySecret(secretKey: string) {
        this.clipboard.copy(secretKey);
    }
    // Méthode pour effectuer la recherche
    search(): void {
        this.isCenteredDivVisible = false;
        // Filtrer les applications en fonction du terme de recherche
        this.filteredApplications = this.applications.filter(application =>
            application && application.name &&
            application.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
    selectedFileName: string;
    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
        languageOfDevelopment: [''] // Define the languageOfDevelopment form control here
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });

    // Function to add a new application
    addApplication(): void {
        const formData = {
            name: this.firstFormGroup.get('firstCtrl').value,
            logo: this.secondFormGroup.get('secondCtrl').value,
            languageOfDevelopment: this.firstFormGroup.get('languageOfDevelopment').value


        };

        // Vérifier si le champ du nom est vide
        if (!formData.name || formData.name.trim() === '' || formData.languageOfDevelopment.trim() === '') {
            console.error('Name cannot be empty. Application not added.');
            return; // Arrêter l'exécution de la méthode
        };
        this._applicationService.createApplication(formData).subscribe(
            response => {
                console.log('Application added successfully:', response);
                // Ajouter la nouvelle application à la liste sans recharger la page
                this.applications.push(response);
                // Réinitialiser les champs du formulaire après l'ajout
                this.firstFormGroup.reset();
                this.selectedFileName = '';
                this.isCenteredDivVisible = false; // Réinitialiser le nom du fichier sélectionné
            },
            error => {
                console.error('Failed to add application:', error);
            }
        );
        this.loadApplications();
    }

    openCloudinaryWidget() {
        cloudinary.openUploadWidget({
            cloudName: 'dznvwntjn',
            uploadPreset: 'ilhoqrza',
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Upload successful:', result.info);
                this.uploadedImageUrl = result.info.url;
                // Update form control or state as necessary
                this.secondFormGroup.get('secondCtrl').setValue(this.uploadedImageUrl);
            }
        });
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
            });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        // Github issues
        this.chartGithubIssues = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            colors: ['#64748B', '#94A3B8'],
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0],
                background: {
                    borderWidth: 0,
                },
            },
            grid: {
                borderColor: 'var(--fuse-border)',
            },
            labels: this.data.githubIssues.labels,
            legend: {
                show: false,
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                },
            },
            series: this.data.githubIssues.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            stroke: {
                width: [3, 0],
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    color: 'var(--fuse-border)',
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    offsetX: -16,
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
            },
        };

        // Task distribution
        this.chartTaskDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'polarArea',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            labels: this.data.taskDistribution.labels,
            legend: {
                position: 'bottom',
            },
            plotOptions: {
                polarArea: {
                    spokes: {
                        connectorColors: 'var(--fuse-border)',
                    },
                    rings: {
                        strokeColor: 'var(--fuse-border)',
                    },
                },
            },
            series: this.data.taskDistribution.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            stroke: {
                width: 2,
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#93C5FD',
                    shadeIntensity: 0.75,
                    shadeTo: 'dark',
                },
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
            },
        };

        // Budget distribution
        this.chartBudgetDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'radar',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#818CF8'],
            dataLabels: {
                enabled: true,
                formatter: (val: number): string | number => `${val}%`,
                textAnchor: 'start',
                style: {
                    fontSize: '13px',
                    fontWeight: 500,
                },
                background: {
                    borderWidth: 0,
                    padding: 4,
                },
                offsetY: -15,
            },
            markers: {
                strokeColors: '#818CF8',
                strokeWidth: 4,
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: 'var(--fuse-border)',
                        connectorColors: 'var(--fuse-border)',
                    },
                },
            },
            series: this.data.budgetDistribution.series,
            stroke: {
                width: 2,
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: (val: number): string => `${val}%`,
                },
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '12px',
                        fontWeight: '500',
                    },
                },
                categories: this.data.budgetDistribution.categories,
            },
            yaxis: {
                max: (max: number): number => parseInt((max + 10).toFixed(0), 10),
                tickAmount: 7,
            },
        };

        // Weekly expenses
        this.chartWeeklyExpenses = {
            chart: {
                animations: {
                    enabled: false,
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#22D3EE'],
            series: this.data.weeklyExpenses.series,
            stroke: {
                curve: 'smooth',
            },
            tooltip: {
                theme: 'dark',
            },
            xaxis: {
                type: 'category',
                categories: this.data.weeklyExpenses.labels,
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`,
                },
            },
        };

        // Monthly expenses
        this.chartMonthlyExpenses = {
            chart: {
                animations: {
                    enabled: false,
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#4ADE80'],
            series: this.data.monthlyExpenses.series,
            stroke: {
                curve: 'smooth',
            },
            tooltip: {
                theme: 'dark',
            },
            xaxis: {
                type: 'category',
                categories: this.data.monthlyExpenses.labels,
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`,
                },
            },
        };

        // Yearly expenses
        this.chartYearlyExpenses = {
            chart: {
                animations: {
                    enabled: false,
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#FB7185'],
            series: this.data.yearlyExpenses.series,
            stroke: {
                curve: 'smooth',
            },
            tooltip: {
                theme: 'dark',
            },
            xaxis: {
                type: 'category',
                categories: this.data.yearlyExpenses.labels,
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`,
                },
            },
        };
    }

}
