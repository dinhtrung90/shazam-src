/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { SurveyResponseDetailComponent } from 'app/entities/survey-response/survey-response-detail.component';
import { SurveyResponse } from 'app/shared/model/survey-response.model';

describe('Component Tests', () => {
    describe('SurveyResponse Management Detail Component', () => {
        let comp: SurveyResponseDetailComponent;
        let fixture: ComponentFixture<SurveyResponseDetailComponent>;
        const route = ({ data: of({ surveyResponse: new SurveyResponse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [SurveyResponseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SurveyResponseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SurveyResponseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.surveyResponse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
