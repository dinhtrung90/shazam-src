import { Route } from '@angular/router';

import { DashBoardComponent } from './';

export const DASH_BOARD_ROUTE: Route = {
    path: 'dashboard',
    component: DashBoardComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Dashboard ShaZam!'
    }
};
