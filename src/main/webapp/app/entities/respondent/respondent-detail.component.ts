import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRespondent } from 'app/shared/model/respondent.model';

@Component({
    selector: 'jhi-respondent-detail',
    templateUrl: './respondent-detail.component.html'
})
export class RespondentDetailComponent implements OnInit {
    respondent: IRespondent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ respondent }) => {
            this.respondent = respondent;
        });
    }

    previousState() {
        window.history.back();
    }
}
