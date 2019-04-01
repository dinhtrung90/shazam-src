import { NgModule } from '@angular/core';

import { ShazamSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ShazamSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ShazamSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ShazamSharedCommonModule {}
