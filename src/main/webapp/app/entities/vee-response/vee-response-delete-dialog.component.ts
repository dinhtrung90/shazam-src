import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVeeResponse } from 'app/shared/model/vee-response.model';
import { VeeResponseService } from './vee-response.service';

@Component({
    selector: 'jhi-vee-response-delete-dialog',
    templateUrl: './vee-response-delete-dialog.component.html'
})
export class VeeResponseDeleteDialogComponent {
    veeResponse: IVeeResponse;

    constructor(
        protected veeResponseService: VeeResponseService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.veeResponseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'veeResponseListModification',
                content: 'Deleted an veeResponse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vee-response-delete-popup',
    template: ''
})
export class VeeResponseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ veeResponse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VeeResponseDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.veeResponse = veeResponse;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/vee-response', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/vee-response', { outlets: { popup: null } }]);
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
