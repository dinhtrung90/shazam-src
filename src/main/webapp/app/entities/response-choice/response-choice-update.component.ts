import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IResponseChoice } from 'app/shared/model/response-choice.model';
import { ResponseChoiceService } from './response-choice.service';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question';

@Component({
    selector: 'jhi-response-choice-update',
    templateUrl: './response-choice-update.component.html'
})
export class ResponseChoiceUpdateComponent implements OnInit {
    responseChoice: IResponseChoice;
    isSaving: boolean;

    questions: IQuestion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected responseChoiceService: ResponseChoiceService,
        protected questionService: QuestionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ responseChoice }) => {
            this.responseChoice = responseChoice;
        });
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
        if (this.responseChoice.id !== undefined) {
            this.subscribeToSaveResponse(this.responseChoiceService.update(this.responseChoice));
        } else {
            this.subscribeToSaveResponse(this.responseChoiceService.create(this.responseChoice));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IResponseChoice>>) {
        result.subscribe((res: HttpResponse<IResponseChoice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
