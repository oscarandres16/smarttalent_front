import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css'],
})
export class DestinationsComponent {
  form!: UntypedFormGroup;
  results$ = new BehaviorSubject<any>(null);
  optionsTable: any = {};

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDestinations();
  }

  getDestinations() {
    this.dashboardService.getDestinos().then((data: any) => {
      if (data.length > 0) {
        this.results$.next(data);
        this.setOptionsTable(data);
      }
    });
  }

  setOptionsTable(dataSource: any[] = []) {
    this.optionsTable = {
      titleTable: '',
      columnLabels: ['Id', 'Nombre'],
      columnKeys: ['id', 'name'],
      dataSource: dataSource,
      hasTopButtons: true,
      topButtons: [
        {
          label: 'Agregar',
          icon: 'add',
          action: () => {
            this.router.navigateByUrl('/dashboard/add-destionation');
          },
        },
      ],
    };
  }
}
