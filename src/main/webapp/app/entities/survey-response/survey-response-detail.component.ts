import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISurveyResponse } from 'app/shared/model/survey-response.model';

@Component({
    selector: 'jhi-survey-response-detail',
    templateUrl: './survey-response-detail.component.html'
})
export class SurveyResponseDetailComponent implements OnInit {
    surveyResponse: ISurveyResponse;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ surveyResponse }) => {
            this.surveyResponse = surveyResponse;
        });
    }

    previousState() {
        window.history.back();
    }
}
