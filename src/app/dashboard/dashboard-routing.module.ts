import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { FormDestinosComponent } from './pages/form-destinos/form-destinos.component';
import { FormHotelComponent } from './pages/form-hotel/form-hotel.component';
import { FormRoomComponent } from './pages/form-room/form-room.component';
import { HomeComponent } from './pages/home/home.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SettingsComponent } from './pages/settings/settings.component';

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
      { path: 'rooms', component: RoomsComponent },
      {
        path: 'add-room',
        component: FormRoomComponent,
        data: { mode: 'add' },
      },
      {
        path: 'edit-room/:id',
        component: FormRoomComponent,
        data: { mode: 'edit' },
      },
      { path: 'settings', component: SettingsComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
