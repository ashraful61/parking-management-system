import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    SharedModule
  ]
})
export class VehicleModule { }
