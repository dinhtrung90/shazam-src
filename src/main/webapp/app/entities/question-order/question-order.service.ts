import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuestionOrder } from 'app/shared/model/question-order.model';

type EntityResponseType = HttpResponse<IQuestionOrder>;
type EntityArrayResponseType = HttpResponse<IQuestionOrder[]>;

@Injectable({ providedIn: 'root' })
export class QuestionOrderService {
    public resourceUrl = SERVER_API_URL + 'api/question-orders';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/question-orders';

    constructor(protected http: HttpClient) {}

    create(questionOrder: IQuestionOrder): Observable<EntityResponseType> {
        return this.http.post<IQuestionOrder>(this.resourceUrl, questionOrder, { observe: 'response' });
    }

    update(questionOrder: IQuestionOrder): Observable<EntityResponseType> {
        return this.http.put<IQuestionOrder>(this.resourceUrl, questionOrder, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQuestionOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuestionOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuestionOrder[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
