/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { ResponseChoiceUpdateComponent } from 'app/entities/response-choice/response-choice-update.component';
import { ResponseChoiceService } from 'app/entities/response-choice/response-choice.service';
import { ResponseChoice } from 'app/shared/model/response-choice.model';

describe('Component Tests', () => {
    describe('ResponseChoice Management Update Component', () => {
        let comp: ResponseChoiceUpdateComponent;
        let fixture: ComponentFixture<ResponseChoiceUpdateComponent>;
        let service: ResponseChoiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [ResponseChoiceUpdateComponent]
            })
                .overrideTemplate(ResponseChoiceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ResponseChoiceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResponseChoiceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ResponseChoice(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.responseChoice = entity;
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
                    const entity = new ResponseChoice();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.responseChoice = entity;
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
