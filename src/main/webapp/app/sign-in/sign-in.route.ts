import { Route } from '@angular/router';

import { SignInComponent } from './';
import { UserRouteAccessService } from 'app/core';

export const SIGN_IN_ROUTE: Route = {
    path: 'sign-in',
    component: SignInComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome to ShaZam!'
    }
};
