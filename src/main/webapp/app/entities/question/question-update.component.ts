import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { IQuestionType } from 'app/shared/model/question-type.model';
import { QuestionTypeService } from 'app/entities/question-type';

@Component({
    selector: 'jhi-question-update',
    templateUrl: './question-update.component.html'
})
export class QuestionUpdateComponent implements OnInit {
    question: IQuestion;
    isSaving: boolean;

    questiontypes: IQuestionType[];
    updated: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected questionService: QuestionService,
        protected questionTypeService: QuestionTypeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ question }) => {
            this.question = question;
            this.updated = this.question.updated != null ? this.question.updated.format(DATE_TIME_FORMAT) : null;
        });
        this.questionTypeService
            .query({ filter: 'question-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IQuestionType[]>) => mayBeOk.ok),
                map((response: HttpResponse<IQuestionType[]>) => response.body)
            )
            .subscribe(
                (res: IQuestionType[]) => {
                    if (!this.question.questionTypeId) {
                        this.questiontypes = res;
                    } else {
                        this.questionTypeService
                            .find(this.question.questionTypeId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IQuestionType>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IQuestionType>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IQuestionType) => (this.questiontypes = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.question.updated = this.updated != null ? moment(this.updated, DATE_TIME_FORMAT) : null;
        if (this.question.id !== undefined) {
            this.subscribeToSaveResponse(this.questionService.update(this.question));
        } else {
            this.subscribeToSaveResponse(this.questionService.create(this.question));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>) {
        result.subscribe((res: HttpResponse<IQuestion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackQuestionTypeById(index: number, item: IQuestionType) {
        return item.id;
    }
}
