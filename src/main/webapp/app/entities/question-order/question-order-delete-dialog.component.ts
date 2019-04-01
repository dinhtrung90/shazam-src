import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuestionOrder } from 'app/shared/model/question-order.model';
import { QuestionOrderService } from './question-order.service';

@Component({
    selector: 'jhi-question-order-delete-dialog',
    templateUrl: './question-order-delete-dialog.component.html'
})
export class QuestionOrderDeleteDialogComponent {
    questionOrder: IQuestionOrder;

    constructor(
        protected questionOrderService: QuestionOrderService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.questionOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'questionOrderListModification',
                content: 'Deleted an questionOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-question-order-delete-popup',
    template: ''
})
export class QuestionOrderDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ questionOrder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QuestionOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.questionOrder = questionOrder;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/question-order', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/question-order', { outlets: { popup: null } }]);
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
