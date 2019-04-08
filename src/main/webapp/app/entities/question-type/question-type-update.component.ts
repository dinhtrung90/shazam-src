import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IQuestionType } from 'app/shared/model/question-type.model';
import { QuestionTypeService } from './question-type.service';

@Component({
    selector: 'jhi-question-type-update',
    templateUrl: './question-type-update.component.html'
})
export class QuestionTypeUpdateComponent implements OnInit {
    questionType: IQuestionType;
    isSaving: boolean;

    constructor(protected questionTypeService: QuestionTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ questionType }) => {
            this.questionType = questionType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.questionType.id !== undefined) {
            this.subscribeToSaveResponse(this.questionTypeService.update(this.questionType));
        } else {
            this.subscribeToSaveResponse(this.questionTypeService.create(this.questionType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionType>>) {
        result.subscribe((res: HttpResponse<IQuestionType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
