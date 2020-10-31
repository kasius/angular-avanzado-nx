import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as regionsActions from './region.actions';
import * as regionsSelectors from './region.selectors';
import { Country, Region } from './region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionFacade {
  constructor(
    private store: Store<Region>) { }


  // REGIONS
  public loadRegions() {
    this.store.dispatch(regionsActions.loadRegions());
  }

  public loadRegionsSuccess(regions: Region[]) {
    this.store.dispatch(regionsActions.loadRegionsSucess({
      Regions: { ...regions }
    })
    );
  }

  public loadRegionsError(RegionsError: any) {
    this.store.dispatch(regionsActions.loadRegionsError({
      RegionsError: RegionsError
    })
    );
  }

  public getRegions$(): Observable<Region[]> {
    return this.store.select(regionsSelectors.getRegions);
  }
  // REGIONS


  // REGION
  public loadRegion(code: string) {
    this.store.dispatch(regionsActions.loadRegion({ code: code }));
  }

  public loadRegionSuccess(region: Country[]) {
    this.store.dispatch(regionsActions.loadRegionSucess({
      Countries: { ...region }
    })
    );
  }

  public loadRegionError(CountryError: any) {
    this.store.dispatch(regionsActions.loadRegionError({
      CountryError: CountryError
    })
    );
  }

  public getCountries$(): Observable<Country[]> {
    return this.store.select(regionsSelectors.getCountries);
  }
  // REGION


  // COUNTRY
  public loadCountry(id: string) {
    this.store.dispatch(regionsActions.loadCountry({ id: id }));
  }

  public loadCountrySuccess(country: Country) {
    this.store.dispatch(regionsActions.loadCountrySucess({
      Country: { ...country }
    })
    );
  }

  public loadCountryError(CountryError: any) {
    this.store.dispatch(regionsActions.loadCountryError({
      CountryError: CountryError
    })
    );
  }

  public getCountryDetail$(): Observable<Country> {
    return this.store.select(regionsSelectors.getCountry);
  }
  // COUNTRY

}
