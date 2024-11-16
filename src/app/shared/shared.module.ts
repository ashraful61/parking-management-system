import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

const ngZorroModuleImport = [
  NzButtonModule,
  ReactiveFormsModule, 
  NzButtonModule, 
  NzCheckboxModule, 
  NzFormModule,
  NzInputModule, 
  NzSelectModule,
  NzDatePickerModule,
  NzTableModule,
  NzDividerModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...ngZorroModuleImport
  ],
  exports: [...ngZorroModuleImport]
})
export class SharedModule { }
