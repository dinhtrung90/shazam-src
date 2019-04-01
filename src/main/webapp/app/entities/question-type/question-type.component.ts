import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestionType } from 'app/shared/model/question-type.model';
import { AccountService } from 'app/core';
import { QuestionTypeService } from './question-type.service';

@Component({
    selector: 'jhi-question-type',
    templateUrl: './question-type.component.html'
})
export class QuestionTypeComponent implements OnInit, OnDestroy {
    questionTypes: IQuestionType[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected questionTypeService: QuestionTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.questionTypeService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IQuestionType[]>) => res.ok),
                    map((res: HttpResponse<IQuestionType[]>) => res.body)
                )
                .subscribe((res: IQuestionType[]) => (this.questionTypes = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.questionTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IQuestionType[]>) => res.ok),
                map((res: HttpResponse<IQuestionType[]>) => res.body)
            )
            .subscribe(
                (res: IQuestionType[]) => {
                    this.questionTypes = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQuestionTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQuestionType) {
        return item.id;
    }

    registerChangeInQuestionTypes() {
        this.eventSubscriber = this.eventManager.subscribe('questionTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
