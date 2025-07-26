import { Routes } from '@angular/router';

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
    }
];
