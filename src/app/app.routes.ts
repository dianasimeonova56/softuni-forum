import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: '/home',
        pathMatch: 'full' //fully check if path is empty
    },
    {
        path: 'home',
        loadComponent: ()=> import('./features/home/home').then(c=> c.Home) 
        // angular will load all features, imgs, text, dependencies ONLY when we are in the desired page
    },
    {
        path: 'login',
        loadComponent: ()=> import('./features/auth/login/login').then(c=> c.Login) 
        // angular will load all features, imgs, text, dependencies ONLY when we are in the desired page
    },
    {
        path: 'register',
        loadComponent: ()=> import('./features/auth/register/register').then(c=> c.Register) 
        // angular will load all features, imgs, text, dependencies ONLY when we are in the desired page
    },
    {
        path: 'profile',
        loadComponent: ()=> import('./features/profile/profile').then(c=> c.Profile) 
        // angular will load all features, imgs, text, dependencies ONLY when we are in the desired page
    },
    {
        path: 'themes',
        loadComponent: ()=> import('./features/themes/theme-board/theme-board').then(c=> c.ThemeBoard) 
        // angular will load all features, imgs, text, dependencies ONLY when we are in the desired page
    },
    {
        path: '**',
        component: NotFound
    }
];
