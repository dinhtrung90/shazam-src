import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShazamSharedModule } from 'app/shared';
import {
    ResponseChoiceComponent,
    ResponseChoiceDetailComponent,
    ResponseChoiceUpdateComponent,
    ResponseChoiceDeletePopupComponent,
    ResponseChoiceDeleteDialogComponent,
    responseChoiceRoute,
    responseChoicePopupRoute
} from './';

const ENTITY_STATES = [...responseChoiceRoute, ...responseChoicePopupRoute];

@NgModule({
    imports: [ShazamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ResponseChoiceComponent,
        ResponseChoiceDetailComponent,
        ResponseChoiceUpdateComponent,
        ResponseChoiceDeleteDialogComponent,
        ResponseChoiceDeletePopupComponent
    ],
    entryComponents: [
        ResponseChoiceComponent,
        ResponseChoiceUpdateComponent,
        ResponseChoiceDeleteDialogComponent,
        ResponseChoiceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamResponseChoiceModule {}
