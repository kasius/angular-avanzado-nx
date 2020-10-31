import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as regionsActions from './region.actions';


@Injectable()
export class RegionsEffects {

  private apiConnect = 'http://api.worldbank.org/';


  // REGIONS
  loadRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regionsActions.loadRegions),
      concatMap((form: any) =>
        this.http.get<any>(`${this.apiConnect}v2/region/?format=json`).pipe(map(res =>
          regionsActions.loadRegionsSucess({ Regions: res[1] })
        ),
          catchError(err => of(regionsActions.loadRegionsError({ RegionsError: err }))
          ))))
  );
  // REGIONS

  // COUNTRIES
  loadRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regionsActions.loadRegion),
      concatMap((form: any) =>
        this.http.get<any>(`${this.apiConnect}v2/region/${form.code}/country?per_page=1000&format=json`).pipe(map(res =>
          regionsActions.loadRegionSucess({ Countries: res[1] })
        ),
          catchError(err => of(regionsActions.loadRegionError({ CountryError: err }))
          ))))
  );
  // COUNTRIES

  // COUNTRY
  loadCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regionsActions.loadCountry),
      concatMap((form: any) =>
        this.http.get<any>(`${this.apiConnect}v2/country/${form.id}?format=json`).pipe(map(res =>
          regionsActions.loadCountrySucess({ Country: res[1][0] })
        ),
          catchError(err => of(regionsActions.loadCountryError({ CountryError: err }))
          ))))
  );
  // COUNTRY

  constructor(
    private actions$: Actions,
    private http: HttpClient) { }

}
