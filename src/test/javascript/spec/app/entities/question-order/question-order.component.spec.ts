/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShazamTestModule } from '../../../test.module';
import { QuestionOrderComponent } from 'app/entities/question-order/question-order.component';
import { QuestionOrderService } from 'app/entities/question-order/question-order.service';
import { QuestionOrder } from 'app/shared/model/question-order.model';

describe('Component Tests', () => {
    describe('QuestionOrder Management Component', () => {
        let comp: QuestionOrderComponent;
        let fixture: ComponentFixture<QuestionOrderComponent>;
        let service: QuestionOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [QuestionOrderComponent],
                providers: []
            })
                .overrideTemplate(QuestionOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuestionOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new QuestionOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.questionOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
