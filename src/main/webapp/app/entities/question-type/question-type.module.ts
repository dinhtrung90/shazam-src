import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShazamSharedModule } from 'app/shared';
import {
    QuestionTypeComponent,
    QuestionTypeDetailComponent,
    QuestionTypeUpdateComponent,
    QuestionTypeDeletePopupComponent,
    QuestionTypeDeleteDialogComponent,
    questionTypeRoute,
    questionTypePopupRoute
} from './';

const ENTITY_STATES = [...questionTypeRoute, ...questionTypePopupRoute];

@NgModule({
    imports: [ShazamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuestionTypeComponent,
        QuestionTypeDetailComponent,
        QuestionTypeUpdateComponent,
        QuestionTypeDeleteDialogComponent,
        QuestionTypeDeletePopupComponent
    ],
    entryComponents: [
        QuestionTypeComponent,
        QuestionTypeUpdateComponent,
        QuestionTypeDeleteDialogComponent,
        QuestionTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamQuestionTypeModule {}
