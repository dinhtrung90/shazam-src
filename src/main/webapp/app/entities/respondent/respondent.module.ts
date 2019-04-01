import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShazamSharedModule } from 'app/shared';
import {
    RespondentComponent,
    RespondentDetailComponent,
    RespondentUpdateComponent,
    RespondentDeletePopupComponent,
    RespondentDeleteDialogComponent,
    respondentRoute,
    respondentPopupRoute
} from './';

const ENTITY_STATES = [...respondentRoute, ...respondentPopupRoute];

@NgModule({
    imports: [ShazamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RespondentComponent,
        RespondentDetailComponent,
        RespondentUpdateComponent,
        RespondentDeleteDialogComponent,
        RespondentDeletePopupComponent
    ],
    entryComponents: [RespondentComponent, RespondentUpdateComponent, RespondentDeleteDialogComponent, RespondentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamRespondentModule {}
