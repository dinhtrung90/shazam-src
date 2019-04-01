import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IResponseChoice } from 'app/shared/model/response-choice.model';

type EntityResponseType = HttpResponse<IResponseChoice>;
type EntityArrayResponseType = HttpResponse<IResponseChoice[]>;

@Injectable({ providedIn: 'root' })
export class ResponseChoiceService {
    public resourceUrl = SERVER_API_URL + 'api/response-choices';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/response-choices';

    constructor(protected http: HttpClient) {}

    create(responseChoice: IResponseChoice): Observable<EntityResponseType> {
        return this.http.post<IResponseChoice>(this.resourceUrl, responseChoice, { observe: 'response' });
    }

    update(responseChoice: IResponseChoice): Observable<EntityResponseType> {
        return this.http.put<IResponseChoice>(this.resourceUrl, responseChoice, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IResponseChoice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IResponseChoice[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IResponseChoice[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
