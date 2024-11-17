import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../Interface/vehicle.model'; // Assuming you have this model
import { DatePipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, NgxChartsModule],
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
  lineChartData = [
    {
      "name": "Guadeloupe",
      "series": [
        { "name": "2016-09-16", "value": 3593 },
        { "name": "2016-09-17", "value": 2411 },
        { "name": "2016-09-19", "value": 5203 },
        { "name": "2016-09-21", "value": 2478 },
        { "name": "2016-09-12", "value": 6088 }
      ]
    },
    {
      "name": "Ukraine",
      "series": [
        { "name": "2016-09-16", "value": 5059 },
        { "name": "2016-09-17", "value": 5746 },
        { "name": "2016-09-19", "value": 6142 },
        { "name": "2016-09-21", "value": 3602 },
        { "name": "2016-09-12", "value": 2546 }
      ]
    },
    {
      "name": "Lebanon",
      "series": [
        { "name": "2016-09-16", "value": 3044 },
        { "name": "2016-09-17", "value": 5296 },
        { "name": "2016-09-19", "value": 4299 },
        { "name": "2016-09-21", "value": 4286 },
        { "name": "2016-09-12", "value": 2007 }
      ]
    },
    {
      "name": "Kyrgyzstan",
      "series": [
        { "name": "2016-09-16", "value": 6201 },
        { "name": "2016-09-17", "value": 6723 },
        { "name": "2016-09-19", "value": 2828 },
        { "name": "2016-09-21", "value": 3205 },
        { "name": "2016-09-12", "value": 4207 }
      ]
    },
    {
      "name": "United States",
      "series": [
        { "name": "2016-09-16", "value": 3837 },
        { "name": "2016-09-17", "value": 2051 },
        { "name": "2016-09-19", "value": 6949 },
        { "name": "2016-09-21", "value": 2793 },
        { "name": "2016-09-12", "value": 4375 }
      ]
    }
  ];
  radioValue = 'Today';

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
    this.totalEmptySlots = this.totalParkingSlots - this.parkingCars.length;


    this.vehicleTypeInfo = this.parkingCars.reduce((acc: any[], vehicle) => {
      const found = acc.find((item) => item.name === vehicle.vehicleType);
      if (found) {
        found.value += 1;
      } else {
        acc.push({ name: vehicle.vehicleType, value: 1 });
      }
      return acc;
    }, []);

    console.log('cccc', this.vehicleTypeInfo);



    // Vehicles parked for more than 2 hours
    this.vehiclesParkedMoreThan2Hours = this.parkingCars.filter(vehicle => {
      const entryTime = new Date(vehicle.entryTime);
      return (this.today.getTime() - entryTime.getTime()) / (1000 * 60 * 60) > 2;
    });

    this.getLineChartData()
  }

  getLineChartData() {

    // Get today's date in a comparable format (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    // Filter the data to get entries for today
    const filteredData = this.parkingCars.filter((item: any) => item.entryTime.split('T')[0] === today);

    // Initialize an object to hold counts for each vehicle type and entry time
    const vehicleCounts: any = {};

    // Helper function to format time to AM/PM
    const formatTime = (time: Date) => {
      const date = new Date(time);
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    // Process filtered data
    filteredData.forEach(item => {
      const vehicleType = item.vehicleType;
      const entryTimeFormatted = formatTime(item.entryTime);

      // If this vehicle type is not in the counts object, initialize it
      if (!vehicleCounts[vehicleType]) {
        vehicleCounts[vehicleType] = [];
      }

      // Check if the entry time is already recorded for this vehicle type
      const existingEntry = vehicleCounts[vehicleType].find((entry: any) => entry.name === entryTimeFormatted);

      if (existingEntry) {
        existingEntry.value++;
      } else {
        vehicleCounts[vehicleType].push({ name: entryTimeFormatted, value: 1 });
      }
    });

    // Convert the vehicle counts to the format needed for the line chart
    this.lineChartData = Object.keys(vehicleCounts).map(vehicleType => ({
      name: vehicleType,
      series: vehicleCounts[vehicleType]
    }));

    console.log('ddds',this.lineChartData);
  }

  getLineWeekyChartData() {

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
  
    // Get the date for 6 days ago (the start of the week)
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6); // 6 days ago
    const weekStartDate = weekStart.toISOString().split('T')[0];
  
    // Filter data for today and the past 6 days
    const filteredData = this.parkingCars.filter((item: any) => {
      const entryDate = item.entryTime.split('T')[0];
      return entryDate >= weekStartDate && entryDate <= today; // Include dates within this range
    });
  
    // Initialize an object to hold counts for each vehicle type and entry date
    const vehicleCounts: any = {};
  
    // Helper function to format date (e.g., "17/11/2024")
    const formatDate = (date: Date) => {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleDateString('en-GB'); // Format date as "DD/MM/YYYY"
    };
  
    // Process filtered data
    filteredData.forEach(item => {
      const vehicleType = item.vehicleType;
      const entryDateFormatted = formatDate(item.entryTime);
  
      // If this vehicle type is not in the counts object, initialize it
      if (!vehicleCounts[vehicleType]) {
        vehicleCounts[vehicleType] = [];
      }
  
      // Check if the entry date is already recorded for this vehicle type
      const existingEntry = vehicleCounts[vehicleType].find((entry: any) => entry.name === entryDateFormatted);
  
      if (existingEntry) {
        existingEntry.value++;
      } else {
        vehicleCounts[vehicleType].push({ name: entryDateFormatted, value: 1 });
      }
    });
    // Convert the vehicle counts to the format needed for the line chart
    this.lineChartData = Object.keys(vehicleCounts).map(vehicleType => ({
      name: vehicleType,
      series: vehicleCounts[vehicleType]
    }));
  
    console.log('Weekly data:', this.lineChartData);
  }

  getLineChartDataMonthly() {

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const currentMonth = today.getMonth(); // Current month index (0 = January, 1 = February, etc.)
    const currentYear = today.getFullYear();
  
    // Filter data for the current month
    const filteredData = this.parkingCars.filter((item: any) => {
      const entryDate = new Date(item.entryTime);
      return entryDate.getFullYear() === currentYear && entryDate.getMonth() === currentMonth;
    });
  
    // Initialize an object to hold counts for each vehicle type and entry month
    const vehicleCounts: any = {};
  
    // Helper function to get month name
    const getMonthName = (monthIndex: number) => {
      const months = [
        "January", "February", "March", "April", "May", "June", "July", 
        "August", "September", "October", "November", "December"
      ];
      return months[monthIndex];
    };
  
    // Process filtered data
    filteredData.forEach(item => {
      const vehicleType = item.vehicleType;
      const entryDate = new Date(item.entryTime);
      const monthName = getMonthName(entryDate.getMonth());
  
      // If this vehicle type is not in the counts object, initialize it
      if (!vehicleCounts[vehicleType]) {
        vehicleCounts[vehicleType] = [];
      }
  
      // Check if the month is already recorded for this vehicle type
      const existingEntry = vehicleCounts[vehicleType].find((entry: any) => entry.name === monthName);
  
      if (existingEntry) {
        existingEntry.value++;
      } else {
        vehicleCounts[vehicleType].push({ name: monthName, value: 1 });
      }
    });
  
    // Convert the vehicle counts to the format needed for the line chart
    this.lineChartData = Object.keys(vehicleCounts).map((vehicleType: any) => ({
      name: vehicleType,
      series: vehicleCounts[vehicleType]
    }));
  
    console.log('Monthly data:', this.lineChartData);
  }
  

  onChanngeLineChart(event: string){
    console.log('event', event);
    if(event.toLowerCase() === 'today'){
      this.getLineChartData();
    }
    else if(event.toLowerCase() == 'weekly'){
      this.getLineWeekyChartData();
    }
    else if(event.toLowerCase() == 'monthly'){
      this.getLineChartDataMonthly()
    }
  }
  

}
