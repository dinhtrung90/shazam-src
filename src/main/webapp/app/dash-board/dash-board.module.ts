import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShazamSharedModule } from 'app/shared';
import { DASH_BOARD_ROUTE, DashBoardComponent } from './';

@NgModule({
    imports: [ShazamSharedModule, RouterModule.forChild([DASH_BOARD_ROUTE])],
    declarations: [DashBoardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamDashBoardModule {}
