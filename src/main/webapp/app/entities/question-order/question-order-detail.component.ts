import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestionOrder } from 'app/shared/model/question-order.model';

@Component({
    selector: 'jhi-question-order-detail',
    templateUrl: './question-order-detail.component.html'
})
export class QuestionOrderDetailComponent implements OnInit {
    questionOrder: IQuestionOrder;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ questionOrder }) => {
            this.questionOrder = questionOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
