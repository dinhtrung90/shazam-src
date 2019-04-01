import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRespondent } from 'app/shared/model/respondent.model';
import { RespondentService } from './respondent.service';

@Component({
    selector: 'jhi-respondent-delete-dialog',
    templateUrl: './respondent-delete-dialog.component.html'
})
export class RespondentDeleteDialogComponent {
    respondent: IRespondent;

    constructor(
        protected respondentService: RespondentService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.respondentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'respondentListModification',
                content: 'Deleted an respondent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-respondent-delete-popup',
    template: ''
})
export class RespondentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ respondent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RespondentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.respondent = respondent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/respondent', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/respondent', { outlets: { popup: null } }]);
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
