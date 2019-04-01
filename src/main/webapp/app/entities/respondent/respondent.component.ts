import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRespondent } from 'app/shared/model/respondent.model';
import { AccountService } from 'app/core';
import { RespondentService } from './respondent.service';

@Component({
    selector: 'jhi-respondent',
    templateUrl: './respondent.component.html'
})
export class RespondentComponent implements OnInit, OnDestroy {
    respondents: IRespondent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected respondentService: RespondentService,
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
            this.respondentService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IRespondent[]>) => res.ok),
                    map((res: HttpResponse<IRespondent[]>) => res.body)
                )
                .subscribe((res: IRespondent[]) => (this.respondents = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.respondentService
            .query()
            .pipe(
                filter((res: HttpResponse<IRespondent[]>) => res.ok),
                map((res: HttpResponse<IRespondent[]>) => res.body)
            )
            .subscribe(
                (res: IRespondent[]) => {
                    this.respondents = res;
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
        this.registerChangeInRespondents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRespondent) {
        return item.id;
    }

    registerChangeInRespondents() {
        this.eventSubscriber = this.eventManager.subscribe('respondentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
