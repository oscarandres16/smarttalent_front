import { SupabaseAuthService } from './../../../services/supabase-auth.service';
import { LoginService } from './../services/login.service';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private supabaseAuthService: SupabaseAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['' || null, Validators.required],
      password: ['' || null, Validators.required],
    });
  }

  continue() {
    const { email, password } = this.form.value;
    if (this.form.valid) {
      this.loginService.getAuthentication(email, password).then((data: any) => {
        if (data?.length > 0) {
          this.supabaseAuthService.setSession(data[0].name, data[0].id);
          this.router.navigateByUrl('/dashboard');
        }
      });
    } else this.form.markAsTouched();
  }
}
