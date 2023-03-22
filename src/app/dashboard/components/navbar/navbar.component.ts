import { SupabaseAuthService } from './../../../services/supabase-auth.service';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  reason: string = '';
  name: string = localStorage.getItem('name') || '';
  mainNavbarRoutes: any[] = [];
  bottomNavbarRoutes: any[] = [];

  constructor(
    private router: Router,
    private supabaseAuthService: SupabaseAuthService
  ) {
    this.setNavbarRoutes();
    this.setBottomNavbarRoutes();
  }

  setBottomNavbarRoutes() {
    this.bottomNavbarRoutes = [
      {
        label: 'Configuración',
        icon: 'settings',
        route: 'configuracion',
      },
    ];
  }

  setNavbarRoutes() {
    this.mainNavbarRoutes = [
      {
        label: 'Reservas',
        icon: 'hotel',
        route: 'home',
      },
      {
        label: 'Hoteles',
        icon: 'hotel_class',
        route: 'hotels',
      },
      {
        label: 'Destinos',
        icon: 'location_on',
        route: 'destinations',
      },
    ];
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  navTo(route: string) {
    this.router.navigate([`/dashboard/${route}`]);
    this.sidenav.close();
  }

  closeSession() {
    this.supabaseAuthService.destroySession();
  }
}
