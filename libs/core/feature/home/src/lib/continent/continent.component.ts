import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '@practica/ui';
import { Subject } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { RegionFacade } from '../store/region/region.facade';

@Component({
  selector: 'practica-curso-avanzado-angular-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContinentComponent implements OnInit, OnDestroy {

  // declarations
  public serch = '';
  public regions = [];
  public regionsView = [];
  public loading = false;
  public allRegion = false;
  private compDestroy: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private regionFacade: RegionFacade,
    private dataTablesService: TableService
  ) { }

  ngOnInit(): void {
    this.regionFacade.getRegions$()
      .subscribe(
        regions => {
          if (regions) {
            this.regions = regions;
            this.changeListOfRegions();
            this.initTable();
          }
        }, err => {
          console.log(err);
        });
    this.regionFacade.loadRegions();
  }

  ngOnDestroy() {
    this.compDestroy.next(true);
    this.compDestroy.complete();
  }

  public changeListOfRegions() {
    switch (true) {
      case this.allRegion === false:
        this.regionsView = this.regions.filter(region => region.id !== '');
        break;
      case this.allRegion === true:
        this.regionsView = this.regions;
        break;
    }
    this.initTable();
  }

  private initTable() {
    // parseamos data headers
    this.dataTablesService.titles = [
      {
        sortable: 'code',
        type: 'TEXT',
        slug: 'Código',
        width: 15
      },
      {
        sortable: 'iso2code',
        type: 'TEXT',
        slug: 'Codigo ISO',
        width: 15
      },
      {
        sortable: 'name',
        type: 'TEXT',
        slug: 'Nombre',
        width: 55
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
            slug: 'Detalle Región',
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
              this.router.navigate([`/app/region/${dataElement.code}`]);
            }
          }
        ],
      },
    ];

    // parseamos data body
    this.dataTablesService.data = this.regionsView;

    this.dataTablesService.initTableService();
    this.cdr.detectChanges();
  }
}
