import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegions from './region.reducer';


export const selectRegionsState = createFeatureSelector<fromRegions.RegionsState>(
  fromRegions.regionsFeatureKey
);

// REGIONS
export const getRegions = createSelector(selectRegionsState,
  (state: fromRegions.RegionsState) => state.Regions
);
// REGIONS

// COUNTRIES
export const getCountries = createSelector(selectRegionsState,
  (state: fromRegions.RegionsState) => state.Countries
);
// COUNTRIES

// COUNTRY
export const getCountry = createSelector(selectRegionsState,
  (state: fromRegions.RegionsState) => state.Country
);
// COUNTRY

