import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestionOrder } from 'app/shared/model/question-order.model';
import { AccountService } from 'app/core';
import { QuestionOrderService } from './question-order.service';

@Component({
    selector: 'jhi-question-order',
    templateUrl: './question-order.component.html'
})
export class QuestionOrderComponent implements OnInit, OnDestroy {
    questionOrders: IQuestionOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected questionOrderService: QuestionOrderService,
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
            this.questionOrderService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IQuestionOrder[]>) => res.ok),
                    map((res: HttpResponse<IQuestionOrder[]>) => res.body)
                )
                .subscribe((res: IQuestionOrder[]) => (this.questionOrders = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.questionOrderService
            .query()
            .pipe(
                filter((res: HttpResponse<IQuestionOrder[]>) => res.ok),
                map((res: HttpResponse<IQuestionOrder[]>) => res.body)
            )
            .subscribe(
                (res: IQuestionOrder[]) => {
                    this.questionOrders = res;
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
        this.registerChangeInQuestionOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQuestionOrder) {
        return item.id;
    }

    registerChangeInQuestionOrders() {
        this.eventSubscriber = this.eventManager.subscribe('questionOrderListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
