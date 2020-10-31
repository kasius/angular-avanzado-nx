import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegionComponent } from './region/region.component';
import { UiModule } from '@practica/ui';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RegionsEffects } from './store/region/region.effects';
import * as fromRegion from './store/region/region.reducer';
import { ContinentComponent } from './continent/continent.component';
import { CountryComponent } from './country/country.component';
import { PaisDetailComponent } from './pais-detail/pais-detail.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', redirectTo: 'continent', pathMatch: 'full' },
          { path: 'continent', pathMatch: 'full', component: ContinentComponent },
          { path: 'region/:code', pathMatch: 'full', component: RegionComponent },
          { path: 'country/:id', pathMatch: 'full', component: CountryComponent },
        ]
      }
    ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([RegionsEffects]),
    StoreModule.forFeature(fromRegion.regionsFeatureKey, fromRegion.reducerRegions)
  ],
  declarations: [HomeComponent, RegionComponent, ContinentComponent, CountryComponent, PaisDetailComponent]
})
export class HomeModule { }
