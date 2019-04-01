import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'survey',
                loadChildren: './survey/survey.module#ShazamSurveyModule'
            },
            {
                path: 'question-order',
                loadChildren: './question-order/question-order.module#ShazamQuestionOrderModule'
            },
            {
                path: 'question',
                loadChildren: './question/question.module#ShazamQuestionModule'
            },
            {
                path: 'question-type',
                loadChildren: './question-type/question-type.module#ShazamQuestionTypeModule'
            },
            {
                path: 'response-choice',
                loadChildren: './response-choice/response-choice.module#ShazamResponseChoiceModule'
            },
            {
                path: 'vee-response',
                loadChildren: './vee-response/vee-response.module#ShazamVeeResponseModule'
            },
            {
                path: 'survey-response',
                loadChildren: './survey-response/survey-response.module#ShazamSurveyResponseModule'
            },
            {
                path: 'respondent',
                loadChildren: './respondent/respondent.module#ShazamRespondentModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamEntityModule {}
