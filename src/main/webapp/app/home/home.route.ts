import { Route } from '@angular/router';

import { HomeComponent } from './';
import { AuthGuard } from 'app/core/auth/auth.guard';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Welcome, Java Hipster!'
    }
};
