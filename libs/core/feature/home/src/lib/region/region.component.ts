import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '@practica/ui';
import { Subject } from 'rxjs';
import { RegionFacade } from '../store/region/region.facade';

@Component({
  selector: 'home-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionComponent implements OnInit, OnDestroy {

  // declarations
  public search = '';
  public code = null;
  public region = null;
  public countries = [];
  public countriesView = [];
  public loading = false;
  private compDestroy: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private regionFacade: RegionFacade,
    private dataTablesService: TableService
  ) {
    this.route.params.subscribe(params => {
      this.code = params['code'];
      if (this.code) {
        this.initServices();
      }
    });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.compDestroy.next(true);
    this.compDestroy.complete();
  }

  private initServices() {
    this.regionFacade.getCountries$()
      .subscribe(
        countries => {
          if (countries) {
            this.countries = countries;
            this.countriesView = countries;
            if (this.countriesView.length > 0) {
              this.region = this.countriesView[0];
            }
            this.initTable();
          }
        }, err => {
          console.log(err);
        });
    this.regionFacade.loadRegion(this.code);
  }

  private initTable() {
    // parseamos data headers
    this.dataTablesService.titles = [
      {
        sortable: 'iso2Code',
        type: 'TEXT',
        slug: 'Código',
        width: 10
      },
      {
        sortable: 'name',
        type: 'TEXT',
        slug: 'Nombre',
        width: 25
      },
      {
        sortable: 'capitalCity',
        type: 'TEXT',
        slug: 'Capital',
        width: 25
      },
      {
        sortable: 'longitude',
        type: 'TEXT',
        slug: 'Longitud',
        width: 15
      },
      {
        sortable: 'latitude',
        type: 'TEXT',
        slug: 'Latitud',
        width: 15
      },
      {
        sortable: null,
        type: 'ICON',
        slug: 'Acciones',
        class: 'text-center',
        width: 10,
        conditional: [
          {
            key: 'id',
            condition: '',
            operation: '!=='
          }
        ],
        buttons: [
          {
            text: '',
            slug: 'Detalle País',
            icon: 'btn-icon-wrapper',
            btn: 'btn-outline-info m0 btn-xs mr5',
            link: '',
            download: '',
            class: '',
            conditional: [
              {
                key: 'id',
                condition: '',
                operation: '!=='
              }
            ],
            onClick: (dataElement) => {
              this.router.navigate([`/app/country/${dataElement.id}`]);
            }
          }
        ],
      },
    ];

    // parseamos data body
    this.dataTablesService.data = this.countriesView;

    this.dataTablesService.initTableService();
    // this.cdr.detectChanges();
  }
}
