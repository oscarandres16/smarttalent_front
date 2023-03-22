import { Injectable } from '@angular/core';
import { SupabaseAuthService } from './../../services/supabase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private supabaseAuthService: SupabaseAuthService) {}

  getDestinos() {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Destinations')
        .select('*')
        .then((data) => {
          resolve(data.data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  getHotelById(idHotel: string) {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Hotels')
        .select('*')
        .eq('id', idHotel)
        .then((data) => {
          resolve(data.data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  addHotel(value: any) {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Hotels')
        .insert([value])
        .then((data) => {
          console.log('data', data);
          resolve(data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  getHotels(value: any) {
    return new Promise((resolve, reject) => {
      if (value.idDestination && value.name) {
        this.supabaseAuthService.supabase
          .from('Hotels')
          .select('*')
          .eq('idDestination', value.idDestination)
          .like('name', value.name)
          .then((data) => {
            console.log('data', data);
            resolve(data.data);
          })
          .then((error) => {
            reject(error);
          });
      } else if (value.idDestination && !value.name) {
        this.supabaseAuthService.supabase
          .from('Hotels')
          .select('*')
          .eq('idDestination', value.idDestination)
          .then((data) => {
            console.log('data', data);
            resolve(data.data);
          })
          .then((error) => {
            reject(error);
          });
      } else if (!value.idDestination && value.name) {
        this.supabaseAuthService.supabase
          .from('Hotels')
          .select('*')
          .like('name', value.name)
          .then((data) => {
            console.log('data', data);
            resolve(data.data);
          })
          .then((error) => {
            reject(error);
          });
      }
    });
  }
}
