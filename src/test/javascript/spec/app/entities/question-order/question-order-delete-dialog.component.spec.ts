/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ShazamTestModule } from '../../../test.module';
import { QuestionOrderDeleteDialogComponent } from 'app/entities/question-order/question-order-delete-dialog.component';
import { QuestionOrderService } from 'app/entities/question-order/question-order.service';

describe('Component Tests', () => {
    describe('QuestionOrder Management Delete Component', () => {
        let comp: QuestionOrderDeleteDialogComponent;
        let fixture: ComponentFixture<QuestionOrderDeleteDialogComponent>;
        let service: QuestionOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [QuestionOrderDeleteDialogComponent]
            })
                .overrideTemplate(QuestionOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuestionOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
