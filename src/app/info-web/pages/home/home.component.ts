import { HomeService } from './../services/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  reservationForm!: UntypedFormGroup;
  filteredOptions!: Observable<any[]>;
  hotelList = new BehaviorSubject<any[]>([]);
  destinations$ = new BehaviorSubject<any[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getHotelList();
    this.getDestinations();
  }

  getDestinations() {
    this.homeService.getDestinos().then((data: any) => {
      this.destinations$.next(data);
    });
  }

  getHotelList() {
    const fakeHotelList = [
      {
        id: 1,
        location: 'Budapest',
        img: 'https://picsum.photos/400/300',
        name: 'Hotel Budapest',
        calification: 4,
        reviews: 100,
        price: 100,
      },
      {
        id: 2,
        location: 'London',
        img: 'https://picsum.photos/450/300',
        name: 'Hotel London',
        calification: 4.5,
        reviews: 10,
        price: 99,
      },
      {
        id: 1,
        location: 'Budapest',
        img: 'https://picsum.photos/450/250',
        name: 'Hotel Budapest',
        calification: 4,
        reviews: 100,
        price: 100,
      },
      {
        id: 2,
        location: 'London',
        img: 'https://picsum.photos/405/300',
        name: 'Hotel London',
        calification: 4.5,
        reviews: 10,
        price: 99,
      },
      {
        id: 1,
        location: 'Budapest',
        img: 'https://picsum.photos/404/300',
        name: 'Hotel Budapest',
        calification: 4,
        reviews: 100,
        price: 100,
      },
      {
        id: 2,
        location: 'London',
        img: 'https://picsum.photos/403/300',
        name: 'Hotel London',
        calification: 4.5,
        reviews: 10,
        price: 99,
      },
      {
        id: 1,
        location: 'Budapest',
        img: 'https://picsum.photos/402/300',
        name: 'Hotel Budapest',
        calification: 4,
        reviews: 100,
        price: 100,
      },
      {
        id: 2,
        location: 'London',
        img: 'https://picsum.photos/401/300',
        name: 'Hotel London',
        calification: 4.5,
        reviews: 10,
        price: 99,
      },
    ];
    this.hotelList.next(fakeHotelList);
  }

  buildForm() {
    this.reservationForm = this.formBuilder.group({
      dateFrom: ['' || null, Validators.required],
      dateTo: ['' || null, Validators.required],
      noPersons: ['' || null, Validators.required],
      destination: ['' || null, Validators.required],
      idDestination: ['' || null],
    });
    this.destinations$.subscribe((data) => {
      if (data)
        this.filteredOptions = this.reservationForm?.controls?.[
          'destination'
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

  consult() {
    const idDestination = this.destinations$.value.filter((option: any) => {
      return option.name === this.reservationForm.value.destination;
    })[0].id;
    if (this.reservationForm.valid) {
      alert('Consulting...');
    } else {
      this.reservationForm.markAllAsTouched();
    }
  }
}
