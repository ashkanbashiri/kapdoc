import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';
import { User, Role } from '../_models';

declare const gapi: any;

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  title = 'app works!';
  currentUser: User;
  value = '';
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }
    onEnter(value: string) { this.value = "OK, Thanks!"; }

    logout() {
      try{
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
      console.log('Google user has signed out.');
    });
  }
  catch(err){console.log('Not a google user.')}
  finally{
        this.authenticationService.logout();
        this.router.navigate(['/home']);
  }
    }
    ngOnInit(){

    }

}
