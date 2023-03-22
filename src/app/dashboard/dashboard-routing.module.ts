import { SettinsComponent } from './pages/settins/settins.component';
import { FormDestinosComponent } from './pages/form-destinos/form-destinos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { FormHotelComponent } from './pages/form-hotel/form-hotel.component';
import { HomeComponent } from './pages/home/home.component';
import { HotelsComponent } from './pages/hotels/hotels.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'hotels', component: HotelsComponent },
      {
        path: 'add-hotel',
        component: FormHotelComponent,
        data: { mode: 'add' },
      },
      {
        path: 'edit-hotel/:id',
        component: FormHotelComponent,
        data: { mode: 'edit' },
      },
      { path: 'destinations', component: DestinationsComponent },
      {
        path: 'add-destionation',
        component: FormDestinosComponent,
        data: { mode: 'add' },
      },
      {
        path: 'edit-destionation/:id',
        component: FormDestinosComponent,
        data: { mode: 'edit' },
      },
      { path: 'settings', component: SettinsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
