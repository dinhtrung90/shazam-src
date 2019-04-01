import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IRespondent } from 'app/shared/model/respondent.model';
import { RespondentService } from './respondent.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-respondent-update',
    templateUrl: './respondent-update.component.html'
})
export class RespondentUpdateComponent implements OnInit {
    respondent: IRespondent;
    isSaving: boolean;

    users: IUser[];
    birthDay: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected respondentService: RespondentService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ respondent }) => {
            this.respondent = respondent;
            this.birthDay = this.respondent.birthDay != null ? this.respondent.birthDay.format(DATE_TIME_FORMAT) : null;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.respondent.birthDay = this.birthDay != null ? moment(this.birthDay, DATE_TIME_FORMAT) : null;
        if (this.respondent.id !== undefined) {
            this.subscribeToSaveResponse(this.respondentService.update(this.respondent));
        } else {
            this.subscribeToSaveResponse(this.respondentService.create(this.respondent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRespondent>>) {
        result.subscribe((res: HttpResponse<IRespondent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
