/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ShazamTestModule } from '../../../test.module';
import { VeeResponseDeleteDialogComponent } from 'app/entities/vee-response/vee-response-delete-dialog.component';
import { VeeResponseService } from 'app/entities/vee-response/vee-response.service';

describe('Component Tests', () => {
    describe('VeeResponse Management Delete Component', () => {
        let comp: VeeResponseDeleteDialogComponent;
        let fixture: ComponentFixture<VeeResponseDeleteDialogComponent>;
        let service: VeeResponseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [VeeResponseDeleteDialogComponent]
            })
                .overrideTemplate(VeeResponseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VeeResponseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VeeResponseService);
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
