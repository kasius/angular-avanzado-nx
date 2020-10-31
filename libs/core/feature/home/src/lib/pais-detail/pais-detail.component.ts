import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'practica-curso-avanzado-angular-pais-detail',
  templateUrl: './pais-detail.component.html',
  styleUrls: ['./pais-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaisDetailComponent implements OnInit {

  // declarations
  public title = 'shop';
  @Input() public pais = null;

  constructor() { }

  ngOnInit(): void {
  }

}
