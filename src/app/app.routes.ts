import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'vehicles', loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule) },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
