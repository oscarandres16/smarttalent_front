import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { DashboardService } from './../../services/dashboard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-hotel',
  templateUrl: './form-hotel.component.html',
  styleUrls: ['./form-hotel.component.css'],
})
export class FormHotelComponent implements OnInit {
  form!: UntypedFormGroup;
  mode!: string;
  idHotel!: string;
  destinations$ = new BehaviorSubject<any[]>([]);
  hotelInformation: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDestinations();
    this.route.data.subscribe((routeData) => {
      this.mode = routeData?.['mode'];
    });
    if (this.mode === 'edit' || this.mode === 'view') {
      this.route.params.subscribe((params) => {
        this.idHotel = params['id'];
        this.getHotelInformation();
      });
    }
    this.buildForm();
  }

  getDestinations() {
    this.dashboardService.getDestinos().then((data: any) => {
      console.log(data);
      this.destinations$.next(data);
    });
  }

  getHotelInformation() {
    this.dashboardService.getHotelById(this.idHotel).then((data: any) => {
      this.hotelInformation = data[0];
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['' || null, Validators.required],
      idDestination: ['' || null, Validators.required],
      state: [true || null],
      photo: ['' || null, Validators.required],
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
      console.log(this.form.value);
      const idAgent = localStorage.getItem('idAgent');
      const body = { ...this.form.value, idAgent: idAgent };
      this.dashboardService.addHotel(body).then((data: any) => {
        if (data.status === 200 || data.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Hotel agreado correctamente!',
            text:
              'Se ha registrado el hotel ' +
              this.form.value.name +
              ' correctamente',
          });
          this.router.navigateByUrl('/dashboard/hotels');
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
