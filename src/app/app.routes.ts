import { Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.gard";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Profile } from "./pages/profile/profile";


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing-page/landing-page').then(m => m.LandingPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup-page/signup-page').then(m => m.SignupPage)
    },
    { path: 'oauth2/:provider/redirect',
        loadComponent: () => import('./pages/oauth2-redirect-handler/oauth2-redirect-handler').then(m => m.Oauth2RedirectHandler)
    },
    { path: 'oauth2/:provider/signup/redirect',
        loadComponent: () => import('./pages/oauth2-redirect-handler/oauth2-redirect-handler').then(m => m.Oauth2RedirectHandler)
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [AuthGuard],
        children: [
        { path: 'profile/:authProvider', component: Profile, canActivate: [AuthGuard] }
        ]
    }
];
