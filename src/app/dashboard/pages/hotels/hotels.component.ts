import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
      console.log(data);
      this.destinations$.next(data);
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['' || null],
      idDestination: ['' || null],
    });
  }

  cleanForm() {
    this.form.reset();
    this.results$.next(null);
  }

  continue() {
    const { name, idDestination } = this.form.value;
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
    this.dashboardService.getHotels(this.form.value).then((data: any) => {
      this.results$.next(data);
      this.setOptionsTable(data);
    });
  }

  setOptionsTable(dataSource: any[] = []) {
    this.optionsTable = {
      titleTable: 'Resultado consulta',
      columnLabels: ['Id', 'Nombre', 'Destino'],
      columnKeys: ['id', 'name', 'idDestination'],
      dataSource: dataSource,
      hasTopButtons: false,
    };
  }
}
