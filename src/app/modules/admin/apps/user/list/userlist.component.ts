import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, Subscription, map } from 'rxjs';

import { UserService } from 'app/modules/admin/apps/user/user.service';
import { User } from 'app/modules/admin/apps/user/user.model';
import { AsyncPipe, CommonModule, I18nPluralPipe, NgClass } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDrawerMode, MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
    selector: 'user-list',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.css'], // Corrected property name
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        RouterLink,
        NgClass,
        AsyncPipe,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        I18nPluralPipe,
        MatSidenavModule,
        CommonModule,
        RouterOutlet,
        MatButtonModule,
        FormsModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {
    users$: Observable<User[]>;
    userss: any[] = [];
    usersCount: number = 0;
    drawerMode: MatDrawerMode;
    searchInputControl: FormControl = new FormControl('');
    selectedUser: User | null = null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @Output() userClicked = new EventEmitter<User>();
    @ViewChild('matDrawer') matDrawer: MatSidenav;
    showUpdateForm: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _router: Router
    ) { }

    ngOnInit(): void {
       this.loadUsers();
       this.filteredUsers = this.userss;
        this.users$ = this._userService.getUsers();

        this.users$.subscribe(
            users => {
                console.log('Users received:', users);
                this.usersCount = users.length;
                this._changeDetectorRef.markForCheck();
            },
            error => {
                console.error('Error fetching users:', error);
                // Handle error (e.g., display error message to user)
            }
        );
    }
    private usersSubscription: Subscription;
    loadUsers() {
        // Subscribe to the getUsers() observable
        this.usersSubscription = this._userService.getUsers().subscribe(
            users => {
                // Assign the fetched users to filteredUsers
                this.filteredUsers = users;
            },
            error => {
                console.error('Error loading users:', error);
                // Handle error (e.g., display error message to user)
            }
        );
    }

    ngOnDestroy(): void {
        // @ts-ignore
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onBackdropClicked(): void {
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    onUserClicked(user: User): void {
        this.selectedUser = user;
        this.matDrawer.open();
    }

    toggleUpdateForm() {
        this.showUpdateForm = !this.showUpdateForm;
    }

    updateUser(user: User) {
        this._userService.updateUserById(user.userID, user).subscribe(updatedUser => {
            // Handle success, e.g., show a success message
            this.showUpdateForm = false;
            console.log('User updated successfully:', updatedUser);
        }, error => {
            // Handle error, e.g., show an error message
            console.error('Error updating user:', error);
        });
    }

    searchTerm: string = ''; // Propriété pour stocker le terme de recherche
    filteredUsers: User[] = []; // Propriété pour stocker les applications filtrées

    search(): void {
        console.log('Search term:', this.searchTerm);
        this.filteredUsers = this.userss.filter(user =>
            user.username && user.email &&
            user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        console.log(this.filteredUsers);
    }

}
