import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRespondent } from 'app/shared/model/respondent.model';

type EntityResponseType = HttpResponse<IRespondent>;
type EntityArrayResponseType = HttpResponse<IRespondent[]>;

@Injectable({ providedIn: 'root' })
export class RespondentService {
    public resourceUrl = SERVER_API_URL + 'api/respondents';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/respondents';

    constructor(protected http: HttpClient) {}

    create(respondent: IRespondent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(respondent);
        return this.http
            .post<IRespondent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(respondent: IRespondent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(respondent);
        return this.http
            .put<IRespondent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRespondent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRespondent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRespondent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(respondent: IRespondent): IRespondent {
        const copy: IRespondent = Object.assign({}, respondent, {
            birthDay: respondent.birthDay != null && respondent.birthDay.isValid() ? respondent.birthDay.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.birthDay = res.body.birthDay != null ? moment(res.body.birthDay) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((respondent: IRespondent) => {
                respondent.birthDay = respondent.birthDay != null ? moment(respondent.birthDay) : null;
            });
        }
        return res;
    }
}
