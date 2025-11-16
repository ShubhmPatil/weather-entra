import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MsalInterceptor,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import {
  MSALInstanceFactory,
  MSALGuardConfigFactory,
  MSALInterceptorConfigFactory
} from './msal-config';
import { WeatherComponent } from './weather/weather.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { AuthErrorInterceptor } from './auth-error.interceptor';

export function initializeMsal(msalService: MsalService) {
  return async () => {
    const instance = msalService.instance;
    if (!(instance as any)._initialized) {
      await instance.initialize();
      (instance as any)._initialized = true;
    }
  };
}


@NgModule({
  declarations: [AppComponent, WeatherComponent, ForbiddenComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    AppRoutingModule,
    MsalModule.forRoot(
      MSALInstanceFactory(),
      MSALGuardConfigFactory(),
      MSALInterceptorConfigFactory()
    ),
  ],
  providers: [
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeMsal, deps: [MsalService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
