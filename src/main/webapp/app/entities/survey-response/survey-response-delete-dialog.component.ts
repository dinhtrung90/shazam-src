import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISurveyResponse } from 'app/shared/model/survey-response.model';
import { SurveyResponseService } from './survey-response.service';

@Component({
    selector: 'jhi-survey-response-delete-dialog',
    templateUrl: './survey-response-delete-dialog.component.html'
})
export class SurveyResponseDeleteDialogComponent {
    surveyResponse: ISurveyResponse;

    constructor(
        protected surveyResponseService: SurveyResponseService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.surveyResponseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'surveyResponseListModification',
                content: 'Deleted an surveyResponse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-survey-response-delete-popup',
    template: ''
})
export class SurveyResponseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ surveyResponse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SurveyResponseDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.surveyResponse = surveyResponse;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/survey-response', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/survey-response', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
