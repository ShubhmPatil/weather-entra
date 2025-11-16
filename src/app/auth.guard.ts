// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private interactionFinished = false;
  constructor(private msal: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router) {
        // Listen for MSAL login-app-complete:
    this.msalBroadcastService.inProgress$.subscribe((status: InteractionStatus) => {
      this.interactionFinished = (status === InteractionStatus.None);
    });
  }


canActivate(): boolean {
  const instance = this.msal.instance;
  let account = instance.getActiveAccount();
  debugger
  if (!account) {
    const accounts = instance.getAllAccounts();
    if (accounts && accounts.length === 1) {
      // if only one account exists, promote it to active
      instance.setActiveAccount(accounts[0]);
      account = accounts[0];
    }
  }

  if (account) return true;

  // no account -> start interactive login
  this.msal.loginRedirect({ scopes: ['openid', 'profile', 'email'] });
  return false;
}
}
