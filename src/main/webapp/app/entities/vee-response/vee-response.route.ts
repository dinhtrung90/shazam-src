import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VeeResponse } from 'app/shared/model/vee-response.model';
import { VeeResponseService } from './vee-response.service';
import { VeeResponseComponent } from './vee-response.component';
import { VeeResponseDetailComponent } from './vee-response-detail.component';
import { VeeResponseUpdateComponent } from './vee-response-update.component';
import { VeeResponseDeletePopupComponent } from './vee-response-delete-dialog.component';
import { IVeeResponse } from 'app/shared/model/vee-response.model';

@Injectable({ providedIn: 'root' })
export class VeeResponseResolve implements Resolve<IVeeResponse> {
    constructor(private service: VeeResponseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVeeResponse> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VeeResponse>) => response.ok),
                map((veeResponse: HttpResponse<VeeResponse>) => veeResponse.body)
            );
        }
        return of(new VeeResponse());
    }
}

export const veeResponseRoute: Routes = [
    {
        path: '',
        component: VeeResponseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VeeResponses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VeeResponseDetailComponent,
        resolve: {
            veeResponse: VeeResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VeeResponses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VeeResponseUpdateComponent,
        resolve: {
            veeResponse: VeeResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VeeResponses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VeeResponseUpdateComponent,
        resolve: {
            veeResponse: VeeResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VeeResponses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const veeResponsePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VeeResponseDeletePopupComponent,
        resolve: {
            veeResponse: VeeResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VeeResponses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
