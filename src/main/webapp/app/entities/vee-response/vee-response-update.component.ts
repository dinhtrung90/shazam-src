import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVeeResponse } from 'app/shared/model/vee-response.model';
import { VeeResponseService } from './vee-response.service';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question';
import { IRespondent } from 'app/shared/model/respondent.model';
import { RespondentService } from 'app/entities/respondent';

@Component({
    selector: 'jhi-vee-response-update',
    templateUrl: './vee-response-update.component.html'
})
export class VeeResponseUpdateComponent implements OnInit {
    veeResponse: IVeeResponse;
    isSaving: boolean;

    questions: IQuestion[];

    respondents: IRespondent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected veeResponseService: VeeResponseService,
        protected questionService: QuestionService,
        protected respondentService: RespondentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ veeResponse }) => {
            this.veeResponse = veeResponse;
        });
        this.questionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IQuestion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IQuestion[]>) => response.body)
            )
            .subscribe((res: IQuestion[]) => (this.questions = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.veeResponse.id !== undefined) {
            this.subscribeToSaveResponse(this.veeResponseService.update(this.veeResponse));
        } else {
            this.subscribeToSaveResponse(this.veeResponseService.create(this.veeResponse));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVeeResponse>>) {
        result.subscribe((res: HttpResponse<IVeeResponse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackQuestionById(index: number, item: IQuestion) {
        return item.id;
    }

    trackRespondentById(index: number, item: IRespondent) {
        return item.id;
    }
}
