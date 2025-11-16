import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  template: `    <nav style="background:#0078d4;color:white;padding:1rem;">
      <button (click)="login()" routerLink="/weather">Sign in</button>
      <button (click)="logout()" routerLink="/home">Sign out</button>
    </nav>

    <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private msal: MsalService) {}

  async ngOnInit() {
    try {
      // handleRedirectPromise processes the redirect response (if any)
      const result = await this.msal.instance.handleRedirectPromise() as AuthenticationResult | null;

      // If we got an AuthenticationResult from the redirect, set that account as active
      if (result?.account) {
        this.msal.instance.setActiveAccount(result.account);
        return;
      }
    } catch (err) {
      console.error('Error handling redirect:', err);
    }
  }

  login() {
    this.msal.loginRedirect({ scopes: ['openid', 'profile', 'email'] });
  }

  logout() {
    this.msal.logoutRedirect({
      // use exactly the same redirectUri that you registered in Azure (match trailing slash)
      postLogoutRedirectUri: environment.azureAd.redirectUri,
      authority: `https://login.microsoftonline.com/${environment.azureAd.tenantId}`
    });
  }
}
