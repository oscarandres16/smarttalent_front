import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.scss'],
})
export class FormRoomComponent {
  form!: UntypedFormGroup;
  mode!: string;
  idRoom!: string;
  hotels$ = new BehaviorSubject<any[]>([]);
  roomTypes$ = new BehaviorSubject<any[]>([]);
  roomInformation: any;
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
    this.getHotels();
    this.getRoomTypes();
    this.route.data.subscribe((routeData) => {
      this.mode = routeData?.['mode'];
    });
    if (this.mode === 'edit' || this.mode === 'view') {
      this.route.params.subscribe((params) => {
        this.idRoom = params['id'];
        this.getRoomInformation();
      });
    }
    this.buildForm();
  }

  getRoomTypes() {
    this.dashboardService.getAllRoomTypes().then((data: any) => {
      this.roomTypes$.next(data);
    });
  }

  getHotels() {
    this.dashboardService.getAllHotels().then((data: any) => {
      this.hotels$.next(data);
    });
  }

  getRoomInformation() {
    this.dashboardService.getHotelById(this.idRoom).then((data: any) => {
      this.roomInformation = data[0];
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nro: ['' || null, Validators.required],
      state: [true || null],
      baseCost: ['' || null, Validators.required],
      tax: ['' || null, Validators.required],
      maxSize: ['' || null, Validators.required],
      idHotel: ['' || null, Validators.required],
      idRoomType: ['' || null, Validators.required],
      photos: ['' || null, Validators.required],
    });
    this.hotels$.subscribe((data) => {
      if (data)
        this.filteredOptions = this.form?.controls?.[
          'idHotel'
        ].valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        );
    });
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.hotels$.value.filter((option: any) =>
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
          photos: reader.result,
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
      const idHotel = this.hotels$.value.filter((option: any) => {
        return option.name === this.form.value.idHotel;
      })[0]?.id;
      const body = {
        ...this.form.value,
        idHotel: idHotel,
      };
      this.dashboardService.addRoom(body).then((data: any) => {
        if (data.status === 200 || data.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Habitación agreada correctamente!',
            text:
              'Se ha registrado la habitación ' +
              this.form.value.nro +
              ' correctamente al hotel ' +
              this.form.value.idHotel,
          });
          this.router.navigateByUrl('/dashboard/rooms');
        }
      });
    }
  }

  cleanForm() {
    this.form.controls['nro'].reset();
    this.form.controls['nro'].setErrors(null);
    this.form.controls['state'].reset();
    this.form.controls['state'].setValue(true);
    this.form.controls['state'].setErrors(null);
    this.form.controls['baseCost'].reset();
    this.form.controls['baseCost'].setErrors(null);
    this.form.controls['tax'].reset();
    this.form.controls['tax'].setErrors(null);
    this.form.controls['maxSize'].reset();
    this.form.controls['maxSize'].setErrors(null);
    this.form.controls['idHotel'].reset();
    this.form.controls['idHotel'].setErrors(null);
    this.form.controls['idRoomType'].reset();
    this.form.controls['idRoomType'].setErrors(null);
    this.form.controls['photos'].reset();
    this.form.controls['photos'].setErrors(null);
    this.photoFile = null;
  }

  return() {
    this.location.back();
  }
}
