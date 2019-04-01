/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ShazamTestModule } from '../../../test.module';
import { ResponseChoiceDeleteDialogComponent } from 'app/entities/response-choice/response-choice-delete-dialog.component';
import { ResponseChoiceService } from 'app/entities/response-choice/response-choice.service';

describe('Component Tests', () => {
    describe('ResponseChoice Management Delete Component', () => {
        let comp: ResponseChoiceDeleteDialogComponent;
        let fixture: ComponentFixture<ResponseChoiceDeleteDialogComponent>;
        let service: ResponseChoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [ResponseChoiceDeleteDialogComponent]
            })
                .overrideTemplate(ResponseChoiceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ResponseChoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResponseChoiceService);
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
