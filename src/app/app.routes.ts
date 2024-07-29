import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { AddSectionComponent } from './modules/admin/pages/docs/add-section/add-section.component';
import { LandingHomeComponent } from './modules/landing/home/home.component';
import { AdminGuard } from './core/auth/guards/Admin.Guard';

export const appRoutes: Route[] = [
    // Redirect empty path to 'home'
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    // Redirect signed-in user to the 'example'
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: { layout: 'empty' },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes') },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') },
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: { layout: 'empty' },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes') },
        ]
    },

    // Landing routes
    {
        path: '',
        canActivate: [NoAuthGuard],
        component: LayoutComponent,
        data: { layout: 'empty' },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes') },
            { path: 'docsLanding', loadChildren: () => import('app/modules/admin/pages/docsLanding/docsLanding.routes') },
            { path: '403', loadChildren: () => import('app/modules/admin/pages/error/error-403/error-403.routes') },
            { path: 'chatinterface', loadChildren: () => import('app/modules/custum-interface/chat-area/chat-area.routes') },
            {path: 'academy', loadChildren: () => import('app/modules/academy/academy.routes')},

        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: { initialData: initialDataResolver },
        children: [
            { path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes') },
            { path: 'docs', loadChildren: () => import('app/modules/admin/pages/docs/docs.routes') },
            { path: 'user', loadChildren: () => import('app/modules/admin/apps/user/user.routes'),canActivate: [AdminGuard]  },
            { path: 'add-section/:categoryId', component: AddSectionComponent },
            { path: 'add-section/:categoryId/:sectionId', component: AddSectionComponent },
            { path: 'appd', loadChildren: () => import('app/modules/admin/application/application.routes'), canActivate: [AdminGuard] },
            { path: 'app', loadChildren: () => import('app/modules/application/application/application.routes') },
            {path: 'project', loadChildren: () => import('app/modules/project/project.routes')},
            {path: 'academyc', loadChildren: () => import('app/modules/academy/academy.routes')},
            { path: 'coming-soon', loadChildren: () => import('app/modules/admin/pages/coming-soon/coming-soon.routes') },

            {
                path: 'error', children: [
                    { path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes') },
                    { path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.routes') }
                ]
            },
            // Default route
            { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
        ]
    }
];
