import { Injectable } from '@angular/core';
import { SupabaseAuthService } from 'src/app/services/supabase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
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
}
