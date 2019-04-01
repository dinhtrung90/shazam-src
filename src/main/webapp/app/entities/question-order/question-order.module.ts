import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShazamSharedModule } from 'app/shared';
import {
    QuestionOrderComponent,
    QuestionOrderDetailComponent,
    QuestionOrderUpdateComponent,
    QuestionOrderDeletePopupComponent,
    QuestionOrderDeleteDialogComponent,
    questionOrderRoute,
    questionOrderPopupRoute
} from './';

const ENTITY_STATES = [...questionOrderRoute, ...questionOrderPopupRoute];

@NgModule({
    imports: [ShazamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuestionOrderComponent,
        QuestionOrderDetailComponent,
        QuestionOrderUpdateComponent,
        QuestionOrderDeleteDialogComponent,
        QuestionOrderDeletePopupComponent
    ],
    entryComponents: [
        QuestionOrderComponent,
        QuestionOrderUpdateComponent,
        QuestionOrderDeleteDialogComponent,
        QuestionOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamQuestionOrderModule {}
