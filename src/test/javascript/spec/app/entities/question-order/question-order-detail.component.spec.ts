/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { QuestionOrderDetailComponent } from 'app/entities/question-order/question-order-detail.component';
import { QuestionOrder } from 'app/shared/model/question-order.model';

describe('Component Tests', () => {
    describe('QuestionOrder Management Detail Component', () => {
        let comp: QuestionOrderDetailComponent;
        let fixture: ComponentFixture<QuestionOrderDetailComponent>;
        const route = ({ data: of({ questionOrder: new QuestionOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [QuestionOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QuestionOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuestionOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.questionOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
