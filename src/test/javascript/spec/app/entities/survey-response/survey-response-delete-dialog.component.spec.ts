/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ShazamTestModule } from '../../../test.module';
import { SurveyResponseDeleteDialogComponent } from 'app/entities/survey-response/survey-response-delete-dialog.component';
import { SurveyResponseService } from 'app/entities/survey-response/survey-response.service';

describe('Component Tests', () => {
    describe('SurveyResponse Management Delete Component', () => {
        let comp: SurveyResponseDeleteDialogComponent;
        let fixture: ComponentFixture<SurveyResponseDeleteDialogComponent>;
        let service: SurveyResponseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [SurveyResponseDeleteDialogComponent]
            })
                .overrideTemplate(SurveyResponseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SurveyResponseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SurveyResponseService);
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
