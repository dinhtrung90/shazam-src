/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { VeeResponseDetailComponent } from 'app/entities/vee-response/vee-response-detail.component';
import { VeeResponse } from 'app/shared/model/vee-response.model';

describe('Component Tests', () => {
    describe('VeeResponse Management Detail Component', () => {
        let comp: VeeResponseDetailComponent;
        let fixture: ComponentFixture<VeeResponseDetailComponent>;
        const route = ({ data: of({ veeResponse: new VeeResponse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [VeeResponseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VeeResponseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VeeResponseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.veeResponse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
