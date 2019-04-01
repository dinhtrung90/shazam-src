import { Route } from '@angular/router';

import { SignInComponent } from './';

export const SIGN_IN_ROUTE: Route = {
    path: '',
    component: SignInComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome to ShaZam!'
    }
};
