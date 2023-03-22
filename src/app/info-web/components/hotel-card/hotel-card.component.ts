import { Component, Input } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent {
  @Input() hotelData!: Hotel | undefined;
}
