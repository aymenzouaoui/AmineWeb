import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { UsersComponent } from 'app/modules/admin/apps/user/user.component';
import {UsersListComponent} from 'app/modules/admin/apps/user/list/userlist.component';
//import { ContactsDetailsComponent } from 'app/modules/admin/apps/user/details/details.component';
import {UserService} from "./user.service";
import {inject} from "@angular/core";

const contactResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UserService);
    const router = inject(Router);


};

const canDeactivateContactsDetails = (
    //component: ContactsDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
        nextRoute = nextRoute.firstChild;
    }
    if (!nextState.url.includes('/user')) {
        return true;
    }
    //return component.closeDrawer().then(() => true);
};

export default [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                component: UsersListComponent,
                resolve: {
                    users: () => inject(UserService).getUsers(),
                },
            },
        ],
    },
] as Routes;
