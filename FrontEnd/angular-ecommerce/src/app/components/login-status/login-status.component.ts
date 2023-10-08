import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFirstName: string = '';

  constructor(
    private oktaAuthStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) { }

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthStateService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        if(this.isAuthenticated)
          this.getUserDetails();
      }
    )
  }

  getUserDetails(): void {
    //Get the User and extract the name
    this.oktaAuth.getUser().then(
      (result) => {
        this.userFirstName = result.name!.split(' ')[0];
      }
    )
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuth.signOut();
  }

}

