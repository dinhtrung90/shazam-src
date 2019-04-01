import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShazamSharedModule } from 'app/shared';
import {
    SurveyResponseComponent,
    SurveyResponseDetailComponent,
    SurveyResponseUpdateComponent,
    SurveyResponseDeletePopupComponent,
    SurveyResponseDeleteDialogComponent,
    surveyResponseRoute,
    surveyResponsePopupRoute
} from './';

const ENTITY_STATES = [...surveyResponseRoute, ...surveyResponsePopupRoute];

@NgModule({
    imports: [ShazamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SurveyResponseComponent,
        SurveyResponseDetailComponent,
        SurveyResponseUpdateComponent,
        SurveyResponseDeleteDialogComponent,
        SurveyResponseDeletePopupComponent
    ],
    entryComponents: [
        SurveyResponseComponent,
        SurveyResponseUpdateComponent,
        SurveyResponseDeleteDialogComponent,
        SurveyResponseDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamSurveyResponseModule {}
