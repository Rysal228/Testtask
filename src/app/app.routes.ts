import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

export const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Shop page',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Product details',
    },
];

//export default routeConfig;