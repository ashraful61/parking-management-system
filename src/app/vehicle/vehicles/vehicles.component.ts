import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Vehicle } from '../../Interface/vehicle.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [RouterLink, SharedModule, DatePipe],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  vehicles: Vehicle[] = [];

  constructor(private router: Router){

  }

  ngOnInit() {
    this.loadSavedData();
  }

  loadSavedData = () => {
    const data = localStorage.getItem('vehicleData');
    if (data) {
      this.vehicles = JSON.parse(data) as Vehicle[];
    }
  }

  deleteData = (data: Vehicle) => {
    // Remove the selected entry from vehicles
    this.vehicles = this.vehicles.filter(item => item !== data);
    this.saveToLocalStorage();
  }



  saveToLocalStorage(): void {
    localStorage.setItem('vehicleData', JSON.stringify(this.vehicles));
  }

}
