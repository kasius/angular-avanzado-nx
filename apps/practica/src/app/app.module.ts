import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { routerReducer, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'app',
          pathMatch: 'full',
        },
        {
          path: 'app',
          loadChildren: () =>
            import('@practica/home').then(
              (module) => module.HomeModule
            ),
        }
      ],
      { initialNavigation: 'enabled' }
    ),
    HttpClientModule,
    StoreModule.forRoot(
      { router: routerReducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
