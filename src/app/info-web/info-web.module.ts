import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoWebRoutingModule } from './info-web-routing.module';
import { InfoWebComponent } from './info-web.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    InfoWebComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HotelCardComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    InfoWebRoutingModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatButtonModule,
  ],
})
export class InfoWebModule {}
