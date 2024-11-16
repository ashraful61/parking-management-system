import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Vehicle } from '../../Interface/vehicle.model';

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


  constructor(private fb: NonNullableFormBuilder) {
    this.initForm();
    this.loadSavedData();
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

  submitForm(): void {
    if (this.vehicleForm.valid) {
      const formData: Vehicle = this.vehicleForm.value;
      this.loadSavedData();
      this.savedData.push(formData);
      this.saveToLocalStorage();
      this.vehicleForm.reset();
      alert('Form submitted successfully!');
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
