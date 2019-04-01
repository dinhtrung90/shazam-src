import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShazamSharedModule } from 'app/shared';
import { SIGN_IN_ROUTE, SignInComponent } from './';

@NgModule({
    imports: [ShazamSharedModule, RouterModule.forChild([SIGN_IN_ROUTE])],
    declarations: [SignInComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShazamSignInModule {}
