import { Routes } from '@angular/router';
//import components to route to
import { Genres } from './genres/genres';
import { Hello } from './hello/hello';

//define the routes
export const routes: Routes = [
    { path: '', pathMatch: 'full', component: Hello }, //default route, loads splash page
    {path: 'genres', component: Genres} //route to genres component
];



