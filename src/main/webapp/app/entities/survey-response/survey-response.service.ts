import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISurveyResponse } from 'app/shared/model/survey-response.model';

type EntityResponseType = HttpResponse<ISurveyResponse>;
type EntityArrayResponseType = HttpResponse<ISurveyResponse[]>;

@Injectable({ providedIn: 'root' })
export class SurveyResponseService {
    public resourceUrl = SERVER_API_URL + 'api/survey-responses';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/survey-responses';

    constructor(protected http: HttpClient) {}

    create(surveyResponse: ISurveyResponse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(surveyResponse);
        return this.http
            .post<ISurveyResponse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(surveyResponse: ISurveyResponse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(surveyResponse);
        return this.http
            .put<ISurveyResponse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISurveyResponse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISurveyResponse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISurveyResponse[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(surveyResponse: ISurveyResponse): ISurveyResponse {
        const copy: ISurveyResponse = Object.assign({}, surveyResponse, {
            updated: surveyResponse.updated != null && surveyResponse.updated.isValid() ? surveyResponse.updated.toJSON() : null,
            startedat: surveyResponse.startedat != null && surveyResponse.startedat.isValid() ? surveyResponse.startedat.toJSON() : null,
            completedat:
                surveyResponse.completedat != null && surveyResponse.completedat.isValid() ? surveyResponse.completedat.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.updated = res.body.updated != null ? moment(res.body.updated) : null;
            res.body.startedat = res.body.startedat != null ? moment(res.body.startedat) : null;
            res.body.completedat = res.body.completedat != null ? moment(res.body.completedat) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((surveyResponse: ISurveyResponse) => {
                surveyResponse.updated = surveyResponse.updated != null ? moment(surveyResponse.updated) : null;
                surveyResponse.startedat = surveyResponse.startedat != null ? moment(surveyResponse.startedat) : null;
                surveyResponse.completedat = surveyResponse.completedat != null ? moment(surveyResponse.completedat) : null;
            });
        }
        return res;
    }
}
