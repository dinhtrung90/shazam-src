import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShazamSharedModule } from 'app/shared';
import {
    VeeResponseComponent,
    VeeResponseDetailComponent,
    VeeResponseUpdateComponent,
    VeeResponseDeletePopupComponent,
    VeeResponseDeleteDialogComponent,
    veeResponseRoute,
    veeResponsePopupRoute
} from './';

const ENTITY_STATES = [...veeResponseRoute, ...veeResponsePopupRoute];

@NgModule({
    imports: [ShazamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VeeResponseComponent,
        VeeResponseDetailComponent,
        VeeResponseUpdateComponent,
        VeeResponseDeleteDialogComponent,
        VeeResponseDeletePopupComponent
    ],
    entryComponents: [VeeResponseComponent, VeeResponseUpdateComponent, VeeResponseDeleteDialogComponent, VeeResponseDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamVeeResponseModule {}
