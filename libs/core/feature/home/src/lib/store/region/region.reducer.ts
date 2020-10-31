import { Action, createReducer, on } from '@ngrx/store';
import * as regionsActions from './region.actions';
import { Country, Region } from './region.model';

export const regionsFeatureKey = 'regions';

export interface RegionsState {
  Regions: [];
  Countries: [];
  Country: any;
}

export const initialState: RegionsState = {
  Regions: [],
  Countries: [],
  Country: null
};


export const reducerRegions = createReducer(
  initialState,

  // REGIONS
  on(regionsActions.loadRegions, state => state),
  on(regionsActions.loadRegionsSucess, (state, { Regions: payload }) => {
    return {
      ...state, Regions: payload
    };
  }
  ),
  on(regionsActions.loadRegionsError, (state, payload) => ({
    ...state,
    payload
  })),
  // REGIONS

  // COUNTRIES
  on(regionsActions.loadRegion, state => state),
  on(regionsActions.loadRegionSucess, (state, { Countries: payload }) => {
    return {
      ...state, Countries: payload
    };
  }
  ),
  on(regionsActions.loadRegionError, (state, payload) => ({
    ...state,
    payload
  })),
  // COUNTRIES

  // COUNTRY
  on(regionsActions.loadCountry, state => state),
  on(regionsActions.loadCountrySucess, (state, { Country: payload }) => {
    return {
      ...state, Country: payload
    };
  }
  ),
  on(regionsActions.loadCountryError, (state, payload) => ({
    ...state,
    payload
  }))
  // COUNTRY


);

