import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Respondent } from 'app/shared/model/respondent.model';
import { RespondentService } from './respondent.service';
import { RespondentComponent } from './respondent.component';
import { RespondentDetailComponent } from './respondent-detail.component';
import { RespondentUpdateComponent } from './respondent-update.component';
import { RespondentDeletePopupComponent } from './respondent-delete-dialog.component';
import { IRespondent } from 'app/shared/model/respondent.model';

@Injectable({ providedIn: 'root' })
export class RespondentResolve implements Resolve<IRespondent> {
    constructor(private service: RespondentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRespondent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Respondent>) => response.ok),
                map((respondent: HttpResponse<Respondent>) => respondent.body)
            );
        }
        return of(new Respondent());
    }
}

export const respondentRoute: Routes = [
    {
        path: '',
        component: RespondentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Respondents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RespondentDetailComponent,
        resolve: {
            respondent: RespondentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Respondents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RespondentUpdateComponent,
        resolve: {
            respondent: RespondentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Respondents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RespondentUpdateComponent,
        resolve: {
            respondent: RespondentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Respondents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const respondentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RespondentDeletePopupComponent,
        resolve: {
            respondent: RespondentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Respondents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
