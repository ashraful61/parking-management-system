import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../Interface/vehicle.model'; // Assuming you have this model
import { DatePipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule,NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  savedData: Vehicle[] = [];
  today: Date = new Date();
  totalEmptySlots: number = 0;
  vehicleTypeInfo: { name: string, value: number }[] = [];
  vehiclesParkedMoreThan2Hours: Vehicle[] = [];
  selectedDate = this.today;
  totalParkingSlots = 50;
  parkingCars: Vehicle[] = [];
  pieChartData: { name: string, value: number }[] = [];;
  width: number = window.innerWidth - 120; 

  constructor() { }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.width = window.innerWidth - 120; // Adjust width on window resize
  }


  ngOnInit(): void {
    this.width = window.innerWidth - 120; // Initial width calculation
    this.loadSavedData();
    this.calculateDashboardData();
  }

  loadSavedData(): void {
    const data = localStorage.getItem('vehicleData');
    if (data) {
      this.savedData = JSON.parse(data) as Vehicle[];
    }
  }

  calculateDashboardData(): void {

    this.parkingCars = this.savedData.filter(vehicle => vehicle.status === 'In');

    // Total Empty Slots
    this.totalEmptySlots = this.totalParkingSlots -  this.parkingCars.length;


    this.vehicleTypeInfo = this.parkingCars.reduce((acc: any[], vehicle) => {
      const found = acc.find((item) => item.name === vehicle.vehicleType);
      if (found) {
        found.value += 1;
      } else {
        acc.push({ name: vehicle.vehicleType, value: 1 });
      }
      return acc;
    }, []);
    
    console.log('cccc',this.vehicleTypeInfo);



    // Vehicles parked for more than 2 hours
    this.vehiclesParkedMoreThan2Hours = this.parkingCars.filter(vehicle => {
      const entryTime = new Date(vehicle.entryTime);
      return (this.today.getTime() - entryTime.getTime()) / (1000 * 60 * 60) > 2;
    })
  }

}
