import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVeeResponse } from 'app/shared/model/vee-response.model';
import { AccountService } from 'app/core';
import { VeeResponseService } from './vee-response.service';

@Component({
    selector: 'jhi-vee-response',
    templateUrl: './vee-response.component.html'
})
export class VeeResponseComponent implements OnInit, OnDestroy {
    veeResponses: IVeeResponse[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected veeResponseService: VeeResponseService,
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
            this.veeResponseService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IVeeResponse[]>) => res.ok),
                    map((res: HttpResponse<IVeeResponse[]>) => res.body)
                )
                .subscribe((res: IVeeResponse[]) => (this.veeResponses = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.veeResponseService
            .query()
            .pipe(
                filter((res: HttpResponse<IVeeResponse[]>) => res.ok),
                map((res: HttpResponse<IVeeResponse[]>) => res.body)
            )
            .subscribe(
                (res: IVeeResponse[]) => {
                    this.veeResponses = res;
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
        this.registerChangeInVeeResponses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVeeResponse) {
        return item.id;
    }

    registerChangeInVeeResponses() {
        this.eventSubscriber = this.eventManager.subscribe('veeResponseListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
