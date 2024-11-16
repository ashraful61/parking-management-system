export interface Vehicle {
    licenseNumber: string;
    vehicleType: 'Micro-bus' | 'Car' | 'Truck' | 'Bike';
    ownerName: string;
    ownerPhone: string;
    status: 'In' | 'Out';
    address: string;
    entryTime: Date;
    exitTime?: Date;
    parkingCharge?: number;
  }
  