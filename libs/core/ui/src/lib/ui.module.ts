import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common'
import { UiTableComponent } from './ui-table/ui-table.component';
import { NgbdSortableHeaderDirective } from './ui-table/ui-table.sortable';
import { TableService } from './ui-table/ui-table.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { CoreExampleComponent } from './core-example/core-example.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [UiTableComponent, NgbdSortableHeaderDirective, CoreExampleComponent],
  exports: [UiTableComponent, CoreExampleComponent],
  providers: [TableService, DecimalPipe],
  entryComponents: [UiTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiModule { }
