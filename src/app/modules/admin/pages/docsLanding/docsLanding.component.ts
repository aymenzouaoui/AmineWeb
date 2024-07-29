import { NgClass, NgFor, NgSwitch, NgSwitchCase, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { UserComponent } from 'app/layout/common/user/user.component';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Section } from 'app/modules/admin/pages/docs/section.types'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector       : 'docsLanding',
    templateUrl    : './docsLanding.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone     : true,
    imports        : [MatSidenavModule, MatButtonModule, MatIconModule, NgFor, NgClass, RouterLink, NgSwitch, NgSwitchCase, CommonModule, HttpClientModule, FormsModule, UserComponent],
})
export class DocsLandingComponent implements OnInit, OnDestroy
{
    filteredSectionsVisible: boolean = false; // Property to control visibility of filtered sections
     searchTerm: string = '';
    isEditMode: boolean = false; // Track whether the form is in "Edit" mode
    categoryIdBeingEdited: string | null = null; 
    sectionDetails: any;
    newCategoryName: string = '';
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    selectedLanguage: string = 'Kotlin'; // Default selected language

    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'account';
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    categoryId: any;
    user: User;
    sections: any;
    Section: Section;
    filteredSections: Section[] = [];
    searchQuery: string = '';

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private http: HttpClient,
        private router: Router, 
        private activatedRoute: ActivatedRoute, // Inject ActivatedRoute
        private _userService: UserService,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef,


    )
    {
    }
    
  
    
    
    processDescriptionF(description: string): string {
        if (!description) return '';
    
        let processedDescription = description;
    
        // Replace <codebox> tags with <div class="code-box">
        processedDescription = processedDescription.replace(/<codebox>(.*?)<\/codebox>/g, '<div class="code-box"><div class="code-box-title">Code</div>$1</div>');
    
        // Replace <blue> tags with <span> tags styled with blue color
        processedDescription = processedDescription.replace(/<blue>(.*?)<\/blue>/g, '<span style="color: blue;">$1</span>');
    
        // Replace <red> tags with <span> tags styled with red color if present
        processedDescription = processedDescription.replace(/<red>(.*?)<\/red>/g, '<span class="red-text">$1</span>');
    
        // Replace <green> tags with <span> tags styled with green color
        processedDescription = processedDescription.replace(/<green>(.*?)<\/green>/g, '<span class="green-text">$1</span>');
    
        // Replace <yellow> tags with <span> tags styled with yellow color
        processedDescription = processedDescription.replace(/<yellow>(.*?)<\/yellow>/g, '<span class="yellow-text">$1</span>');
    
        // Replace <b> tags with <b> tags to ensure bold styling
        processedDescription = processedDescription.replace(/<b>(.*?)<\/b>/g, '<b>$1</b>');
    
        return processedDescription;
    }
    
    

    
    searchSections(searchTerm: string): Section[] {
        console.log('Search value:', searchTerm); // Log the search value
        this.searchTerm = searchTerm;
    
        // If the search term is empty, reset filteredSections to display all sections
        if (!searchTerm.trim()) {
            this.filteredSections = this.getAllSections();
            return this.filteredSections;
        }
    
        // Ensure that this.panels is defined before trying to filter it
        if (!this.panels || !Array.isArray(this.panels)) {
            console.log('Filtered sections empty'); // Log the final list of filtered sections
            return []; // Return an empty array if this.panels is not defined
        }
    
        // Flatten the sections from all categories and then filter
        const allSections = this.panels.flatMap(category => category.sections || []);
        const filteredSections = allSections.filter(section => section.title.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log('Filtered sections:', filteredSections); // Log the final list of filtered sections
    
        return filteredSections; // Return the filtered sections
    }
    
    getAllSections(): Section[] {
        return this.panels.flatMap(category => category.sections || []);
    }
    navigateToSection(sectionId: string) {
        // Reset the search query
        this.searchQuery = '';
        
        // Navigate to the section URL with the sectionId parameter using Angular Router
        this.router.navigate(['/docsLanding'], { queryParams: { sectionId: sectionId } });

        // Close the filtered sections container
        this.filteredSectionsVisible = false;
    }
    
      
    

    
    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Fetch categories and sections when the component initializes
        this.fetchCategories();
    
        // Subscribe to route query parameters to fetch section details if available
        this.activatedRoute.queryParams.subscribe((params) => {
            const sectionId = params['sectionId'];
            if (sectionId) {
                this.fetchSectionDetails(sectionId);
            }
        });
    
        // Subscribe to user changes
        this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: User) => {
            this.user = user;
        });
    
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened based on the media breakpoints
            if (matchingAliases.includes('lg')) {
                this.drawerMode = 'side';
                this.drawerOpened = true;
            } else {
                this.drawerMode = 'over';
                this.drawerOpened = false;
            }
    
            // Trigger change detection
            this._changeDetectorRef.markForCheck();
        });
    }
    
    fetchCategories(): void {
        this.http.get<any>('http://127.0.0.1:9090/category').subscribe(
            (response) => {
                console.log('Categories response:', response);
                this.panels = response.map(category => ({
                    id: category?._id,
                    name: category?.name,
                    sections: category?.sections.map(section => ({
                        id: section.section?._id, // Adjusted to access the nested section object
                        title: section.section?.title // Adjusted to access the nested section object
                    }))
                }));
                console.log('Panels:', this.panels); // Log the updated panels array
                // Trigger change detection
                this._changeDetectorRef.detectChanges();
            },
            (error) => {
                console.error('Error fetching categories:', error);
            }
        );
    }
    
    
    
    fetchSectionDetails(sectionId: string): void {
        // Make an HTTP request to fetch section details by ID
        this.http.get<any>(`http://127.0.0.1:9090/section/${sectionId}`).subscribe(
            (sectionDetails) => {
                console.log('Section details:', sectionDetails);
                this.sectionDetails = sectionDetails; // Assign fetched section details to the property
            },
            (error) => {
                console.error('Error fetching section details:', error);
            }
        );
    }
    
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to the panel
     *
     * @param panel
     */
    goToPanel(sectionId: string): void {
        // Update the URL with the section ID
        this.router.navigate([], { queryParams: { sectionId: sectionId } });
    }
      
      search(searchTerm: string): void {
        this.filteredSections = this.searchSections(searchTerm);
        this.filteredSectionsVisible = this.filteredSections.length > 0; // Update filteredSectionsVisible based on the number of filtered sections
        // Trigger change detection after performing search operation
        this.cdr.detectChanges();
    }
    
  
    /**
     * Get the details of the panel
     *
     * @param id
     */
    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
    
    
}