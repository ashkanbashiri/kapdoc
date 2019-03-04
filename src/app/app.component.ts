import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
