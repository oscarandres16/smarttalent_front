import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-form-destinos',
  templateUrl: './form-destinos.component.html',
  styleUrls: ['./form-destinos.component.css'],
})
export class FormDestinosComponent {
  form!: UntypedFormGroup;
  mode!: string;
  destinationInformation: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((routeData) => {
      this.mode = routeData?.['mode'];
    });
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['' || null, Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.form.patchValue({
        photo: file,
      });
    }
  }

  continue() {
    if (this.form.valid) {
      this.dashboardService
        .addDestination(this.form.value.name)
        .then((data: any) => {
          if (data.status === 200 || data.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Destino agreado correctamente!',
              text:
                'Se ha registrado el Destino ' +
                this.form.value.name +
                ' correctamente',
            });
            this.router.navigateByUrl('/dashboard/destionations');
          }
        });
    }
  }

  cleanForm() {
    this.form.reset();
  }

  return() {
    this.location.back();
  }
}
