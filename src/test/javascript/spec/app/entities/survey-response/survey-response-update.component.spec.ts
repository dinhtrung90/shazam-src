/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { SurveyResponseUpdateComponent } from 'app/entities/survey-response/survey-response-update.component';
import { SurveyResponseService } from 'app/entities/survey-response/survey-response.service';
import { SurveyResponse } from 'app/shared/model/survey-response.model';

describe('Component Tests', () => {
    describe('SurveyResponse Management Update Component', () => {
        let comp: SurveyResponseUpdateComponent;
        let fixture: ComponentFixture<SurveyResponseUpdateComponent>;
        let service: SurveyResponseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [SurveyResponseUpdateComponent]
            })
                .overrideTemplate(SurveyResponseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SurveyResponseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SurveyResponseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SurveyResponse(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.surveyResponse = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SurveyResponse();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.surveyResponse = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
