/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShazamTestModule } from '../../../test.module';
import { RespondentComponent } from 'app/entities/respondent/respondent.component';
import { RespondentService } from 'app/entities/respondent/respondent.service';
import { Respondent } from 'app/shared/model/respondent.model';

describe('Component Tests', () => {
    describe('Respondent Management Component', () => {
        let comp: RespondentComponent;
        let fixture: ComponentFixture<RespondentComponent>;
        let service: RespondentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [RespondentComponent],
                providers: []
            })
                .overrideTemplate(RespondentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RespondentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RespondentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Respondent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.respondents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
