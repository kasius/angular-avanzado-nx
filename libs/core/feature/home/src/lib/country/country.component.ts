import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RegionFacade } from '../store/region/region.facade';
import { Observable, Subject } from 'rxjs';
import { Country } from '../store/region/region.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'practica-curso-avanzado-angular-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryComponent implements OnInit, OnDestroy {

  // declarations
  public id = null;
  public country;
  pais$: Observable<any>;
  private compDestroy: Subject<boolean> = new Subject();

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private regionFacade: RegionFacade
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.initServices();
      }
    });
  }

  ngOnDestroy() {
    this.compDestroy.next(true);
    this.compDestroy.complete();
  }

  private initServices() {
    // OnPush --> Container Present
    this.pais$ = this.regionFacade
      .getCountryDetail$();

    this.regionFacade.loadCountry(this.id);
  }

}
