import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor(private router: Router) {}

  setSession(name: string, idAgent: number) {
    const token = new Date().getTime();
    localStorage.setItem('name', name);
    localStorage.setItem('idAgent', idAgent.toString());
    localStorage.setItem('token', token.toString());
  }

  destroySession() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
