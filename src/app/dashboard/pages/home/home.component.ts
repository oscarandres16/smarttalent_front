import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  form!: UntypedFormGroup;
  destinations$ = new BehaviorSubject<any[]>([]);
  hotels$ = new BehaviorSubject<any[]>([]);
  results$ = new BehaviorSubject<any>(null);
  optionsTable: any = {};
  filteredOptions!: Observable<any[]>;
  filteredOptionsHotel!: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDestinations();
    this.getHotels();
    this.buildForm();
  }

  getHotels() {
    this.dashboardService.getAllHotels().then((data: any) => {
      this.hotels$.next(data);
    });
  }

  getDestinations() {
    this.dashboardService.getDestinos().then((data: any) => {
      this.destinations$.next(data);
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: ['' || null],
      dateFrom: ['' || null],
      dateTo: ['' || null],
      noPeople: ['' || null],
      email: ['' || null],
      idRoom: ['' || null],
      idHotel: ['' || null],
      idDestination: ['' || null],
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
    this.hotels$.subscribe((data) => {
      if (data)
        this.filteredOptionsHotel = this.form?.controls?.[
          'idHotel'
        ].valueChanges.pipe(
          startWith(''),
          map((value) => this._filterHotel(value || ''))
        );
    });
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.destinations$.value.filter((option: any) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  _filterHotel(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.hotels$.value.filter((option: any) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  cleanForm() {
    this.form.reset();
    this.results$.next(null);
  }

  continue() {
    const { name, idHotel, idDestination } = this.form.value;
    this.results$.next(null);
    if (name || idHotel || idDestination) {
      this.getBookings();
    } else {
      this.form.setErrors({ oneRequired: true });
      this.form.markAsTouched();
    }
  }

  addBooking() {
    this.router.navigateByUrl('/dashboard/add-room');
  }

  getBookings() {
    this.dashboardService.getAllBookings().then(async (data: any) => {
      if (data?.length > 0) {
        const filteredData = await this.filterBookingData(data);
        this.results$.next(filteredData);
        this.setOptionsTable(filteredData);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se han encontrado resultados!',
        });
      }
    });
  }

  async filterBookingData(data: any) {
    const { name, idDestination } = this.form.value;
    const idHotel = this.hotels$.value.filter((option: any) => {
      return option.name === this.form.value.idHotel;
    })[0]?.id;
    return data
      .filter((item: any) => {
        return name
          ? item.name.includes(name)
          : true || idHotel
          ? item.idHotel === idHotel
          : true || idDestination
          ? item.idDestination === idDestination
          : true;
      })
      .map((item: any) => {
        return {
          ...item,
          nameHotel: this.hotels$.value.filter((option: any) => {
            return option.id === item.idHotel;
          })[0]?.name,
          nameDestination: this.hotels$.value.filter((option: any) => {
            return option.id === item.idHotel;
          })[0]?.Destinations?.name,
        };
      });
  }

  setOptionsTable(dataSource: any[] = []) {
    this.optionsTable = {
      titleTable: 'Resultado consulta',
      columnLabels: ['Id', 'Nro', 'Hotel', 'Destino'],
      columnKeys: ['id', 'nro', 'nameHotel', 'nameDestination'],
      dataSource: dataSource,
      hasTopButtons: false,
    };
  }
}
