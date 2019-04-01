/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShazamTestModule } from '../../../test.module';
import { VeeResponseComponent } from 'app/entities/vee-response/vee-response.component';
import { VeeResponseService } from 'app/entities/vee-response/vee-response.service';
import { VeeResponse } from 'app/shared/model/vee-response.model';

describe('Component Tests', () => {
    describe('VeeResponse Management Component', () => {
        let comp: VeeResponseComponent;
        let fixture: ComponentFixture<VeeResponseComponent>;
        let service: VeeResponseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [VeeResponseComponent],
                providers: []
            })
                .overrideTemplate(VeeResponseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VeeResponseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VeeResponseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VeeResponse(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.veeResponses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
