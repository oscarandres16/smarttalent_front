import { SupabaseAuthService } from './../../../services/supabase-auth.service';
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private supabaseAuthService: SupabaseAuthService) {}

  getAuthentication(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Agents')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .then((data) => {
          resolve(data?.data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }
}
