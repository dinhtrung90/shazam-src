import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVeeResponse } from 'app/shared/model/vee-response.model';

@Component({
    selector: 'jhi-vee-response-detail',
    templateUrl: './vee-response-detail.component.html'
})
export class VeeResponseDetailComponent implements OnInit {
    veeResponse: IVeeResponse;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ veeResponse }) => {
            this.veeResponse = veeResponse;
        });
    }

    previousState() {
        window.history.back();
    }
}
