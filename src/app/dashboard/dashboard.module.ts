import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { MatSelectModule } from '@angular/material/select';
import { FormHotelComponent } from './pages/form-hotel/form-hotel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormDestinosComponent } from './pages/form-destinos/form-destinos.component';
import { SettinsComponent } from './pages/settins/settins.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    HotelsComponent,
    DestinationsComponent,
    FormHotelComponent,
    TableComponent,
    FormDestinosComponent,
    SettinsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
})
export class DashboardModule {}
