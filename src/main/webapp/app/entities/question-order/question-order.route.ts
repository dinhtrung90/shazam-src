import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QuestionOrder } from 'app/shared/model/question-order.model';
import { QuestionOrderService } from './question-order.service';
import { QuestionOrderComponent } from './question-order.component';
import { QuestionOrderDetailComponent } from './question-order-detail.component';
import { QuestionOrderUpdateComponent } from './question-order-update.component';
import { QuestionOrderDeletePopupComponent } from './question-order-delete-dialog.component';
import { IQuestionOrder } from 'app/shared/model/question-order.model';

@Injectable({ providedIn: 'root' })
export class QuestionOrderResolve implements Resolve<IQuestionOrder> {
    constructor(private service: QuestionOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuestionOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QuestionOrder>) => response.ok),
                map((questionOrder: HttpResponse<QuestionOrder>) => questionOrder.body)
            );
        }
        return of(new QuestionOrder());
    }
}

export const questionOrderRoute: Routes = [
    {
        path: '',
        component: QuestionOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: QuestionOrderDetailComponent,
        resolve: {
            questionOrder: QuestionOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: QuestionOrderUpdateComponent,
        resolve: {
            questionOrder: QuestionOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: QuestionOrderUpdateComponent,
        resolve: {
            questionOrder: QuestionOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionOrders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const questionOrderPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: QuestionOrderDeletePopupComponent,
        resolve: {
            questionOrder: QuestionOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'QuestionOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
