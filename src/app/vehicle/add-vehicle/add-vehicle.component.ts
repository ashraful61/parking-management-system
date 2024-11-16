import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Vehicle } from '../../Interface/vehicle.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, SharedModule, JsonPipe],
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
})
export class AddVehicleComponent {
  vehicleForm!: FormGroup;
  savedData: Vehicle[] = [];
  today = new Date();
  timeDefaultValue = new Date();
  licenseNumber: string | null = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the license number from the route params
    this.licenseNumber = this.route.snapshot.paramMap.get('id');
    console.log('License Number:', this.licenseNumber);

    // Initialize the form
    this.initForm();

    // Load saved vehicle data
    this.loadSavedData();

    // Set form data based on license number
    if (this.licenseNumber) {
      this.setFormData(this.licenseNumber);
    }
  }

  initForm(): void {
    this.vehicleForm = this.fb.group({
      licenseNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerPhone: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required],
      entryTime: [this.timeDefaultValue, Validators.required],
      exitTime: [null],
      parkingCharge: [null],
    });
  }

  // Populate the form data based on the license number
  setFormData(licenseNumber: string): void {
    // Find the vehicle by license number
    const vehicle = this.savedData.find(vehicle => vehicle.licenseNumber === licenseNumber);

    if (vehicle) {
      // Populate form with vehicle data
      this.vehicleForm.patchValue({
        licenseNumber: vehicle.licenseNumber,
        vehicleType: vehicle.vehicleType,
        ownerName: vehicle.ownerName,
        ownerPhone: vehicle.ownerPhone,
        status: vehicle.status,
        address: vehicle.address,
        entryTime: new Date(vehicle.entryTime), // Assuming it's in ISO format
        exitTime: vehicle.exitTime ? new Date(vehicle.exitTime) : null,
        parkingCharge: vehicle.parkingCharge,
      });

      // Disable all fields except 'status'
      // Object.keys(this.vehicleForm.controls).forEach(field => {
      //   if (field !== 'status') {
      //     // this.vehicleForm.get(field)?. ();
      //   }  
      // });
    }
  }


  submitForm(): void {
    if (this.vehicleForm.valid) {
      const formData: Vehicle = this.vehicleForm.value;

      if (this.licenseNumber) {
        // if(formData.status === 'In') {
        //  return alert('Please update the status');
        // }
        const index = this.savedData.findIndex(vehicle => vehicle.licenseNumber === formData.licenseNumber);
        if (index !== -1) {
          this.savedData[index] = formData;
          this.saveToLocalStorage();
          this.vehicleForm.reset();
          alert('Form updated successfully!');
        } else {
          alert('Unable to update the vehicle');
        }
      }
      else {
        this.savedData.push(formData);
        this.saveToLocalStorage();
        this.vehicleForm.reset();
        alert('Form submitted successfully!');
      }
    } else {
      Object.values(this.vehicleForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  saveToLocalStorage(): void {
    localStorage.setItem('vehicleData', JSON.stringify(this.savedData));
  }

  loadSavedData = () => {
    const data = localStorage.getItem('vehicleData');
    if (data) {
      this.savedData = JSON.parse(data) as Vehicle[];
    }
  }
}
