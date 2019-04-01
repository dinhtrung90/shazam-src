import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISurveyResponse } from 'app/shared/model/survey-response.model';
import { SurveyResponseService } from './survey-response.service';
import { ISurvey } from 'app/shared/model/survey.model';
import { SurveyService } from 'app/entities/survey';
import { IRespondent } from 'app/shared/model/respondent.model';
import { RespondentService } from 'app/entities/respondent';

@Component({
    selector: 'jhi-survey-response-update',
    templateUrl: './survey-response-update.component.html'
})
export class SurveyResponseUpdateComponent implements OnInit {
    surveyResponse: ISurveyResponse;
    isSaving: boolean;

    surveys: ISurvey[];

    respondents: IRespondent[];
    updated: string;
    startedat: string;
    completedat: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected surveyResponseService: SurveyResponseService,
        protected surveyService: SurveyService,
        protected respondentService: RespondentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ surveyResponse }) => {
            this.surveyResponse = surveyResponse;
            this.updated = this.surveyResponse.updated != null ? this.surveyResponse.updated.format(DATE_TIME_FORMAT) : null;
            this.startedat = this.surveyResponse.startedat != null ? this.surveyResponse.startedat.format(DATE_TIME_FORMAT) : null;
            this.completedat = this.surveyResponse.completedat != null ? this.surveyResponse.completedat.format(DATE_TIME_FORMAT) : null;
        });
        this.surveyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISurvey[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISurvey[]>) => response.body)
            )
            .subscribe((res: ISurvey[]) => (this.surveys = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.respondentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRespondent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRespondent[]>) => response.body)
            )
            .subscribe((res: IRespondent[]) => (this.respondents = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.surveyResponse.updated = this.updated != null ? moment(this.updated, DATE_TIME_FORMAT) : null;
        this.surveyResponse.startedat = this.startedat != null ? moment(this.startedat, DATE_TIME_FORMAT) : null;
        this.surveyResponse.completedat = this.completedat != null ? moment(this.completedat, DATE_TIME_FORMAT) : null;
        if (this.surveyResponse.id !== undefined) {
            this.subscribeToSaveResponse(this.surveyResponseService.update(this.surveyResponse));
        } else {
            this.subscribeToSaveResponse(this.surveyResponseService.create(this.surveyResponse));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISurveyResponse>>) {
        result.subscribe((res: HttpResponse<ISurveyResponse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSurveyById(index: number, item: ISurvey) {
        return item.id;
    }

    trackRespondentById(index: number, item: IRespondent) {
        return item.id;
    }
}
