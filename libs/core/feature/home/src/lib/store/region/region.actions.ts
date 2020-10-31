import { createAction, props } from '@ngrx/store';
import { Country, Region } from './region.model';


// REGIONS
export const loadRegions = createAction('[Regions] Load');

export const loadRegionsSucess = createAction('[Regions] Load Success', props<{ Regions: Region[] }>()
);

export const loadRegionsError = createAction('[Regions] Load Error', props<{ RegionsError: any }>());
// REGIONS


// COUNTRIES
export const loadRegion = createAction('[Region] Load', props<{ code: string }>());

export const loadRegionSucess = createAction('[Region] Load Success', props<{ Countries: Country[] }>()
);

export const loadRegionError = createAction('[Region] Load Error', props<{ CountryError: any }>());
// COUNTRIES

// COUNTRY
export const loadCountry = createAction('[Country] Load', props<{ id: string }>());

export const loadCountrySucess = createAction('[Country] Load Success', props<{ Country: Country }>()
);

export const loadCountryError = createAction('[Country] Load Error', props<{ CountryError: any }>());
// COUNTRY



