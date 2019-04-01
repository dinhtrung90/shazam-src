import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResponseChoice } from 'app/shared/model/response-choice.model';
import { ResponseChoiceService } from './response-choice.service';

@Component({
    selector: 'jhi-response-choice-delete-dialog',
    templateUrl: './response-choice-delete-dialog.component.html'
})
export class ResponseChoiceDeleteDialogComponent {
    responseChoice: IResponseChoice;

    constructor(
        protected responseChoiceService: ResponseChoiceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.responseChoiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'responseChoiceListModification',
                content: 'Deleted an responseChoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-response-choice-delete-popup',
    template: ''
})
export class ResponseChoiceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ responseChoice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ResponseChoiceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.responseChoice = responseChoice;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/response-choice', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/response-choice', { outlets: { popup: null } }]);
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
