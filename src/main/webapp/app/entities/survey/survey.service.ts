import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISurvey } from 'app/shared/model/survey.model';

type EntityResponseType = HttpResponse<ISurvey>;
type EntityArrayResponseType = HttpResponse<ISurvey[]>;

@Injectable({ providedIn: 'root' })
export class SurveyService {
    public resourceUrl = SERVER_API_URL + 'api/surveys';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/surveys';

    constructor(protected http: HttpClient) {}

    create(survey: ISurvey): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(survey);
        return this.http
            .post<ISurvey>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(survey: ISurvey): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(survey);
        return this.http
            .put<ISurvey>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISurvey>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISurvey[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISurvey[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(survey: ISurvey): ISurvey {
        const copy: ISurvey = Object.assign({}, survey, {
            updated: survey.updated != null && survey.updated.isValid() ? survey.updated.toJSON() : null,
            openingtime: survey.openingtime != null && survey.openingtime.isValid() ? survey.openingtime.toJSON() : null,
            closingtime: survey.closingtime != null && survey.closingtime.isValid() ? survey.closingtime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.updated = res.body.updated != null ? moment(res.body.updated) : null;
            res.body.openingtime = res.body.openingtime != null ? moment(res.body.openingtime) : null;
            res.body.closingtime = res.body.closingtime != null ? moment(res.body.closingtime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((survey: ISurvey) => {
                survey.updated = survey.updated != null ? moment(survey.updated) : null;
                survey.openingtime = survey.openingtime != null ? moment(survey.openingtime) : null;
                survey.closingtime = survey.closingtime != null ? moment(survey.closingtime) : null;
            });
        }
        return res;
    }
}
