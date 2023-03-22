import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { DashboardService } from './../../services/dashboard.service';

@Component({
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  form!: UntypedFormGroup;
  destinations$ = new BehaviorSubject<any[]>([]);
  results$ = new BehaviorSubject<any>(null);
  optionsTable: any = {};
  filteredOptions!: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDestinations();
    this.buildForm();
  }

  getDestinations() {
    this.dashboardService.getDestinos().then((data: any) => {
      this.destinations$.next(data);
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['' || null],
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
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.destinations$.value.filter((option: any) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  cleanForm() {
    this.form.reset();
    this.results$.next(null);
  }

  continue() {
    const { name, idDestination } = this.form.value;
    this.results$.next(null);
    if (name || idDestination) {
      this.getHotels();
    } else {
      this.form.setErrors({ oneRequired: true });
      this.form.markAsTouched();
    }
  }

  addHotel() {
    this.router.navigateByUrl('/dashboard/add-hotel');
  }

  getHotels() {
    const idDestination = this.destinations$.value.filter((option: any) => {
      return option.name === this.form.value.idDestination;
    })[0]?.id;
    const { name } = this.form.value;
    this.dashboardService
      .getHotels({ name, idDestination })
      .then((data: any) => {
        if (data?.length > 0) {
          this.results$.next(data);
          this.setOptionsTable(data);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se han encontrado resultados!',
          });
        }
      });
  }

  setOptionsTable(dataSource: any[] = []) {
    this.optionsTable = {
      titleTable: 'Resultado consulta',
      columnLabels: ['Id', 'Nombre', 'Destino'],
      columnKeys: ['id', 'name', 'nameDestination'],
      dataSource: dataSource,
      hasTopButtons: false,
    };
  }
}
