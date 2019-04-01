/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RespondentService } from 'app/entities/respondent/respondent.service';
import { IRespondent, Respondent, Gender } from 'app/shared/model/respondent.model';

describe('Service Tests', () => {
    describe('Respondent Service', () => {
        let injector: TestBed;
        let service: RespondentService;
        let httpMock: HttpTestingController;
        let elemDefault: IRespondent;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RespondentService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Respondent(0, 'AAAAAAA', 'AAAAAAA', currentDate, Gender.Male);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        birthDay: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Respondent', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        birthDay: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        birthDay: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Respondent(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Respondent', async () => {
                const returnedFromService = Object.assign(
                    {
                        avatarUrl: 'BBBBBB',
                        email: 'BBBBBB',
                        birthDay: currentDate.format(DATE_TIME_FORMAT),
                        gender: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        birthDay: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Respondent', async () => {
                const returnedFromService = Object.assign(
                    {
                        avatarUrl: 'BBBBBB',
                        email: 'BBBBBB',
                        birthDay: currentDate.format(DATE_TIME_FORMAT),
                        gender: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        birthDay: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Respondent', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
