import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { DashboardService } from './../../services/dashboard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-hotel',
  templateUrl: './form-hotel.component.html',
  styleUrls: ['./form-hotel.component.scss'],
})
export class FormHotelComponent implements OnInit {
  form!: UntypedFormGroup;
  mode!: string;
  idHotel!: string;
  destinations$ = new BehaviorSubject<any[]>([]);
  hotelInformation: any;
  filteredOptions!: Observable<any[]>;
  photoFile: any;

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
    this.destinations$.subscribe((data) => {
      if (data)
        this.filteredOptions = this.form?.controls?.[
          'idDestination'
        ].valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        );
    });
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.destinations$.value.filter((option: any) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.photoFile = file;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        this.form.patchValue({
          photo: reader.result,
        });
      }
    };
  }

  openSelectedPhotoAsBlob() {
    const blob = new Blob([this.photoFile], { type: 'image/jpeg' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  continue() {
    if (this.form.valid) {
      const idDestination = this.destinations$.value.filter((option: any) => {
        return option.name === this.form.value.idDestination;
      })[0]?.id;
      const idAgent = localStorage.getItem('idAgent');
      const body = {
        ...this.form.value,
        idAgent: idAgent,
        idDestination: idDestination,
      };
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
