import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { HttpClient } from '@angular/common/http';

declare const gapi: any;


@Component({ templateUrl: 'login.component.html'
, styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit, AfterViewInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    value='';
    name='';
    ngAfterViewInit() {
      gapi.signin2.render('google-signin2', {
        'scope': 'profile email',
        'width': 300,
        'height': 50,
        'longtitle': true,
        'onsuccess': param => this.onSignIn(param),
        'onfailure': this.onFailure()
      });
    }
    // ...
    //onSuccess
    public onSignIn(googleUser) {

      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      var id_token = googleUser.getAuthResponse().id_token;
      console.log('checking the token...');
      this.authenticationService.googleLogin(id_token)
      .pipe(first())
      .subscribe(
          data => {
            console.log('successful log in.');
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.error = error;
              this.loading = false;
              console.log(error);
          });
    }
    //onFailure
    public onFailure() {
      console.log('SignIn Failed!');
      // ...
    }
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private http: HttpClient
    ) {
      // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    private theuser;
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

}
