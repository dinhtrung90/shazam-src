/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ShazamTestModule } from '../../../test.module';
import { VeeResponseUpdateComponent } from 'app/entities/vee-response/vee-response-update.component';
import { VeeResponseService } from 'app/entities/vee-response/vee-response.service';
import { VeeResponse } from 'app/shared/model/vee-response.model';

describe('Component Tests', () => {
    describe('VeeResponse Management Update Component', () => {
        let comp: VeeResponseUpdateComponent;
        let fixture: ComponentFixture<VeeResponseUpdateComponent>;
        let service: VeeResponseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ShazamTestModule],
                declarations: [VeeResponseUpdateComponent]
            })
                .overrideTemplate(VeeResponseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VeeResponseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VeeResponseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VeeResponse(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.veeResponse = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VeeResponse();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.veeResponse = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
