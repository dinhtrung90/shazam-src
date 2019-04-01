import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ISurvey } from 'app/shared/model/survey.model';
import { SurveyService } from './survey.service';

@Component({
    selector: 'jhi-survey-update',
    templateUrl: './survey-update.component.html'
})
export class SurveyUpdateComponent implements OnInit {
    survey: ISurvey;
    isSaving: boolean;
    updated: string;
    openingtime: string;
    closingtime: string;

    constructor(protected surveyService: SurveyService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ survey }) => {
            this.survey = survey;
            this.updated = this.survey.updated != null ? this.survey.updated.format(DATE_TIME_FORMAT) : null;
            this.openingtime = this.survey.openingtime != null ? this.survey.openingtime.format(DATE_TIME_FORMAT) : null;
            this.closingtime = this.survey.closingtime != null ? this.survey.closingtime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.survey.updated = this.updated != null ? moment(this.updated, DATE_TIME_FORMAT) : null;
        this.survey.openingtime = this.openingtime != null ? moment(this.openingtime, DATE_TIME_FORMAT) : null;
        this.survey.closingtime = this.closingtime != null ? moment(this.closingtime, DATE_TIME_FORMAT) : null;
        if (this.survey.id !== undefined) {
            this.subscribeToSaveResponse(this.surveyService.update(this.survey));
        } else {
            this.subscribeToSaveResponse(this.surveyService.create(this.survey));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISurvey>>) {
        result.subscribe((res: HttpResponse<ISurvey>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
