import { LOCALE_ID, Inject, Component, QueryList, ViewChildren, OnInit, Input, OnDestroy, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { getLocaleDateFormat, getLocaleDateTimeFormat, getLocaleTimeFormat, FormatWidth, DecimalPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { TableService } from './ui-table.service';
import { NgbdSortableHeaderDirective, SortEvent } from './ui-table.sortable';

@Component({
  selector: 'practica-curso-avanzado-angular-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class UiTableComponent implements OnInit, OnDestroy, OnChanges {

  // declaraciones
  public heading: any;
  public data: any[] = [];
  // public titles: any[] = [];
  public widthContainer = '';
  public titles$: Observable<any[]>;
  public bodyList$: Observable<any[]>;
  public total$: Observable<number>;
  public loading2 = null
  private compDestroy: Subject<boolean> = new Subject();
  @Input() public config = null;
  @Input() public loading = false;
  @Input() public search = '';
  @Input() public footerOption = {
    pagination: true,
    setCount: true
  };
  @Input() results: Observable<string>;
  // @ts-ignore
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  constructor(
    // @Inject(LOCALE_ID) private locale: string,
    public service: TableService) {
    this.bodyList$ = service.data$;
    this.titles$ = service.titles$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.data = [];
  }

  ngOnDestroy(): void {
    this.data = [];
    this.compDestroy.next(true);
    this.compDestroy.complete();
  }

  ngOnChanges(changes) {
    if (changes['search']) {
      this.service.searchTerm = changes['search'].currentValue;
    }
  }

  public getDateFormat() {
    // return getLocaleDateFormat(this.locale, FormatWidth.Short);
  }

  public getTimeFormat() {
    // return getLocaleTimeFormat(this.locale, FormatWidth.Medium);
  }

  public getDateTimeFormat() {
    return (this.getDateFormat() + " " + this.getTimeFormat());
  }

  setData(setData: any) {
    this.widthContainer = setData.widthContainer;
    this.heading = setData.header;
    // this.titles = setData.headers;
    this.service.data = setData.data;
    this.service.initTableService();
  }

  onSort({ column, direction }: SortEvent) {
    // // resetting other headers
    // this.headers.forEach(header => {
    //   if (header.sortable !== column) {
    //     header.direction = '';
    //   }
    // });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  public validateConditional(conditionals: any, data: any): boolean {
    const countData = conditionals.length;
    const typeObject = typeof countData;
    if (typeObject === 'number') {
      let state = 0;
      conditionals.forEach(condi => {
        if (condi.operation) {
          if (condi.condition !== data[condi.key]) {
            state = state + 1;
          }
        } else {
          if (condi.condition === data[condi.key]) {
            state = state + 1;
          }
        }
      });

      if (+state === +conditionals.length) {
        return true;
      } else {
        return false;
      }
    } else {
      if (conditionals.condition === data[conditionals.key]) {
        return true;
      } else {
        return false;
      }
    }
  }

}
