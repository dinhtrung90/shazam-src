import { Component, AfterViewInit, Renderer, ElementRef, OnInit } from '@angular/core';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@Component({
    selector: 'jhi-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../../content/css/sb-admin-2.css']
})
export class SignInComponent implements OnInit {
    username: string;
    password: string;
    rememberMe: boolean;
    authenticationError: boolean;
    credentials: any;

    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef,
        private loginService: LoginService,
        private router: Router,
        private eventManager: JhiEventManager,
        private stateStorageService: StateStorageService
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;

                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                this.router.navigate(['']);
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }
}
