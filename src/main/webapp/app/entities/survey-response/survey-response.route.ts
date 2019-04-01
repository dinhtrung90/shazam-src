import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SurveyResponse } from 'app/shared/model/survey-response.model';
import { SurveyResponseService } from './survey-response.service';
import { SurveyResponseComponent } from './survey-response.component';
import { SurveyResponseDetailComponent } from './survey-response-detail.component';
import { SurveyResponseUpdateComponent } from './survey-response-update.component';
import { SurveyResponseDeletePopupComponent } from './survey-response-delete-dialog.component';
import { ISurveyResponse } from 'app/shared/model/survey-response.model';

@Injectable({ providedIn: 'root' })
export class SurveyResponseResolve implements Resolve<ISurveyResponse> {
    constructor(private service: SurveyResponseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISurveyResponse> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SurveyResponse>) => response.ok),
                map((surveyResponse: HttpResponse<SurveyResponse>) => surveyResponse.body)
            );
        }
        return of(new SurveyResponse());
    }
}

export const surveyResponseRoute: Routes = [
    {
        path: '',
        component: SurveyResponseComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'SurveyResponses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SurveyResponseDetailComponent,
        resolve: {
            surveyResponse: SurveyResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SurveyResponses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SurveyResponseUpdateComponent,
        resolve: {
            surveyResponse: SurveyResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SurveyResponses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SurveyResponseUpdateComponent,
        resolve: {
            surveyResponse: SurveyResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SurveyResponses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const surveyResponsePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SurveyResponseDeletePopupComponent,
        resolve: {
            surveyResponse: SurveyResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SurveyResponses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
