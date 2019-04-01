import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ResponseChoice } from 'app/shared/model/response-choice.model';
import { ResponseChoiceService } from './response-choice.service';
import { ResponseChoiceComponent } from './response-choice.component';
import { ResponseChoiceDetailComponent } from './response-choice-detail.component';
import { ResponseChoiceUpdateComponent } from './response-choice-update.component';
import { ResponseChoiceDeletePopupComponent } from './response-choice-delete-dialog.component';
import { IResponseChoice } from 'app/shared/model/response-choice.model';

@Injectable({ providedIn: 'root' })
export class ResponseChoiceResolve implements Resolve<IResponseChoice> {
    constructor(private service: ResponseChoiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResponseChoice> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ResponseChoice>) => response.ok),
                map((responseChoice: HttpResponse<ResponseChoice>) => responseChoice.body)
            );
        }
        return of(new ResponseChoice());
    }
}

export const responseChoiceRoute: Routes = [
    {
        path: '',
        component: ResponseChoiceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResponseChoices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ResponseChoiceDetailComponent,
        resolve: {
            responseChoice: ResponseChoiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResponseChoices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ResponseChoiceUpdateComponent,
        resolve: {
            responseChoice: ResponseChoiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResponseChoices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ResponseChoiceUpdateComponent,
        resolve: {
            responseChoice: ResponseChoiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResponseChoices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const responseChoicePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ResponseChoiceDeletePopupComponent,
        resolve: {
            responseChoice: ResponseChoiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResponseChoices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
