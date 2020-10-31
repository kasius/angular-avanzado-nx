export interface Region {
  id: string;
  code: string;
  iso2code: string;
  name: string;
}

export interface RegionSingle {
  id: string;
  iso2code: string;
  value: string;
}

export interface Country {
  id: string;
  code: string;
  iso2code: string;
  name: string;
  region: RegionSingle;
  adminregion: RegionSingle;
  incomeLevel: RegionSingle;
  lendingType: RegionSingle;
  capitalCity: string;
  longitude: string;
  latitude: string;

}


