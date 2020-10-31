import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from './ui-table.sortable';

interface SearchResult {
  data: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(data: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return data;
  } else {
    return [...data].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(data: any, term: string, pipe: PipeTransform) {
  const dataList = Object.keys(data);
  let expression = '';
  const lengthData = dataList.length;
  dataList.forEach((key, index) => {
    const element = data[key].toString();
    if (index === (lengthData - 1)) {
      expression += element.toLowerCase().includes(term);
    } else {
      expression += `${element.toLowerCase().includes(term)} || `;
    }
  });
  // tslint:disable-next-line: no-eval
  const evalExpression = eval(expression);
  return evalExpression;
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  public _search$ = new Subject<void>();
  private _titles$ = new BehaviorSubject<any[]>([]);
  private _countries$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public data: any[] = [];
  public titles: any[] = [];

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
  }

  public initTableService() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.data);
      this._total$.next(result.total);
    });

    this._titles$.next(this.titles);
    this._search$.next();
  }

  get data$() { return this._countries$.asObservable(); }
  get titles$() { return this._titles$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let data = sort(this.data, sortColumn, sortDirection);

    // 2. filter
    data = data.filter(dataList => matches(dataList, searchTerm, this.pipe));
    const total = data.length;

    // 3. paginate
    data = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ data, total });
  }
}
