import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IResponseChoice } from 'app/shared/model/response-choice.model';
import { AccountService } from 'app/core';
import { ResponseChoiceService } from './response-choice.service';

@Component({
    selector: 'jhi-response-choice',
    templateUrl: './response-choice.component.html'
})
export class ResponseChoiceComponent implements OnInit, OnDestroy {
    responseChoices: IResponseChoice[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected responseChoiceService: ResponseChoiceService,
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
            this.responseChoiceService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IResponseChoice[]>) => res.ok),
                    map((res: HttpResponse<IResponseChoice[]>) => res.body)
                )
                .subscribe((res: IResponseChoice[]) => (this.responseChoices = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.responseChoiceService
            .query()
            .pipe(
                filter((res: HttpResponse<IResponseChoice[]>) => res.ok),
                map((res: HttpResponse<IResponseChoice[]>) => res.body)
            )
            .subscribe(
                (res: IResponseChoice[]) => {
                    this.responseChoices = res;
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
        this.registerChangeInResponseChoices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IResponseChoice) {
        return item.id;
    }

    registerChangeInResponseChoices() {
        this.eventSubscriber = this.eventManager.subscribe('responseChoiceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
