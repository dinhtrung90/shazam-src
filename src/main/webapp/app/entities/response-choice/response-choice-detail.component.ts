import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResponseChoice } from 'app/shared/model/response-choice.model';

@Component({
    selector: 'jhi-response-choice-detail',
    templateUrl: './response-choice-detail.component.html'
})
export class ResponseChoiceDetailComponent implements OnInit {
    responseChoice: IResponseChoice;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ responseChoice }) => {
            this.responseChoice = responseChoice;
        });
    }

    previousState() {
        window.history.back();
    }
}
