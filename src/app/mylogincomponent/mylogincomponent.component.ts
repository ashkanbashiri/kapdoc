// <script src="https://apis.google.com/js/platform.js" async defer></script>
import { Component, OnInit,AfterViewInit } from '@angular/core';

declare const gapi: any;
@Component({
  moduleId: module.id,  // module.id
  selector: 'app-mylogincomponent',
  template: '<div id="google-signin2" class="g-signin2" data-witdh="600" data-hight="50" data-longtitle="true"></div>',
  styleUrls: ['./mylogincomponent.component.css']
})
export class MylogincomponentComponent implements  AfterViewInit {
  //...
  ngAfterViewInit() {
    gapi.signin2.render('google-signin2', {
      'scope': 'profile email',
      'width': 800,
      'height': 50,
      'longtitle': true,
      'onsuccess': param => this.onSignIn(param),
      'onfailure': this.onFailure()
    });
  }
  // ...
  //onSuccess
  public onSignIn(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  //onFailure
  public onFailure() {
    // ...
  }
}
