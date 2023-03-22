import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tienes permisos para ingresar a esta ruta!',
      });
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
