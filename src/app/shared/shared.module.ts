import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

const ngZorroModuleImport = [
  NzButtonModule,
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzDatePickerModule,
  NzTableModule,
  NzDividerModule,
  NzIconModule, 
  NzLayoutModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...ngZorroModuleImport
  ],
  exports: [...ngZorroModuleImport, ReactiveFormsModule,
    FormsModule,]
})
export class SharedModule { }
