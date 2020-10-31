import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'practica-curso-avanzado-angular-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // declarations
  public loading = false;
  public regions = null;
  private compDestroy: Subject<boolean> = new Subject();

  constructor(

  ) { }

  ngOnInit(): void {

  }



}
