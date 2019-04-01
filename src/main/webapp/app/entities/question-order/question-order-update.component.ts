import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestionOrder } from 'app/shared/model/question-order.model';
import { QuestionOrderService } from './question-order.service';
import { ISurvey } from 'app/shared/model/survey.model';
import { SurveyService } from 'app/entities/survey';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question';

@Component({
    selector: 'jhi-question-order-update',
    templateUrl: './question-order-update.component.html'
})
export class QuestionOrderUpdateComponent implements OnInit {
    questionOrder: IQuestionOrder;
    isSaving: boolean;

    surveys: ISurvey[];

    questions: IQuestion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected questionOrderService: QuestionOrderService,
        protected surveyService: SurveyService,
        protected questionService: QuestionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ questionOrder }) => {
            this.questionOrder = questionOrder;
        });
        this.surveyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISurvey[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISurvey[]>) => response.body)
            )
            .subscribe((res: ISurvey[]) => (this.surveys = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.questionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IQuestion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IQuestion[]>) => response.body)
            )
            .subscribe((res: IQuestion[]) => (this.questions = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.questionOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.questionOrderService.update(this.questionOrder));
        } else {
            this.subscribeToSaveResponse(this.questionOrderService.create(this.questionOrder));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionOrder>>) {
        result.subscribe((res: HttpResponse<IQuestionOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackQuestionById(index: number, item: IQuestion) {
        return item.id;
    }
}
