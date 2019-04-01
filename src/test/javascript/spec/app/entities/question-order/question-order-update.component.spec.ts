/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { QuestionOrderUpdateComponent } from 'app/entities/question-order/question-order-update.component';
import { QuestionOrderService } from 'app/entities/question-order/question-order.service';
import { QuestionOrder } from 'app/shared/model/question-order.model';

describe('Component Tests', () => {
    describe('QuestionOrder Management Update Component', () => {
        let comp: QuestionOrderUpdateComponent;
        let fixture: ComponentFixture<QuestionOrderUpdateComponent>;
        let service: QuestionOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [QuestionOrderUpdateComponent]
            })
                .overrideTemplate(QuestionOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuestionOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionOrderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QuestionOrder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.questionOrder = entity;
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
                    const entity = new QuestionOrder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.questionOrder = entity;
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
