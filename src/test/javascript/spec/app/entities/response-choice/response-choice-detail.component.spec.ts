/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { ResponseChoiceDetailComponent } from 'app/entities/response-choice/response-choice-detail.component';
import { ResponseChoice } from 'app/shared/model/response-choice.model';

describe('Component Tests', () => {
    describe('ResponseChoice Management Detail Component', () => {
        let comp: ResponseChoiceDetailComponent;
        let fixture: ComponentFixture<ResponseChoiceDetailComponent>;
        const route = ({ data: of({ responseChoice: new ResponseChoice(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [ResponseChoiceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ResponseChoiceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ResponseChoiceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.responseChoice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
