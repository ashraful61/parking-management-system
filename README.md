## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Parking Management System 🚗🅿️

This is a **Parking Management System** built using **Angular version 18.2.12**. It allows users to manage parking operations efficiently by tracking vehicle information, entry/exit times, and parking charges. The application stores data locally using either Local Storage or JSON files.

"This application is hosted on Netlify, and the link is parkinng-management.netlify.app.

## Features

### 1. **Vehicle Entry Form**
- Capture details such as:
  - Vehicle License Number
  - Vehicle Type (Micro-bus, Car, Truck, Bike)
  - Vehicle Owner Name
  - Vehicle Owner Phone Number
  - Status (In/Out)
  - Vehicle Owner Address
  - Time and Date of Entry
  - Time and Date of Exit
  - Parking Charges (varied based on vehicle type)

### 2. **Data Table**
- Displays all vehicle entries, including:
  - Owner Name
  - Vehicle Type
  - License Number
  - Entry Time
  - Exit Time
  - Status
- Provides an **Edit Button** for updating data. Updates are allowed only when a vehicle exits the parking.

### 3. **Dashboard**
- A date filter that defaults to **today’s information**.
- Summary Cards:
  - Total Cars Parked
  - Total Empty Slots
  - Number of Each Vehicle Type
  - Vehicles Parked for More Than Two Hours
- **Pie Chart** representing the distribution of vehicles currently parked.
- **Line Chart** showing parking trends:
  - Daily, Weekly, and Monthly summaries.
  - **X-axis:** Time
  - **Y-axis:** Number of Vehicles Parked

---

## Installation and Setup

### Prerequisites
- **Node.js** (v14 or above)
- **Angular CLI** (v14 or above)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd parking-management-system
