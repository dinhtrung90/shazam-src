/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { RespondentDetailComponent } from 'app/entities/respondent/respondent-detail.component';
import { Respondent } from 'app/shared/model/respondent.model';

describe('Component Tests', () => {
    describe('Respondent Management Detail Component', () => {
        let comp: RespondentDetailComponent;
        let fixture: ComponentFixture<RespondentDetailComponent>;
        const route = ({ data: of({ respondent: new Respondent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [RespondentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RespondentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RespondentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.respondent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
