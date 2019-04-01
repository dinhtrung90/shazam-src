/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShazamTestModule } from '../../../test.module';
import { ResponseChoiceComponent } from 'app/entities/response-choice/response-choice.component';
import { ResponseChoiceService } from 'app/entities/response-choice/response-choice.service';
import { ResponseChoice } from 'app/shared/model/response-choice.model';

describe('Component Tests', () => {
    describe('ResponseChoice Management Component', () => {
        let comp: ResponseChoiceComponent;
        let fixture: ComponentFixture<ResponseChoiceComponent>;
        let service: ResponseChoiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [ResponseChoiceComponent],
                providers: []
            })
                .overrideTemplate(ResponseChoiceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ResponseChoiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResponseChoiceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ResponseChoice(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.responseChoices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
