import { Injectable } from '@angular/core';
import { SupabaseAuthService } from './../../services/supabase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private supabaseAuthService: SupabaseAuthService) {}

  getDestinos() {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Destinations')
        .select('*')
        .then((data) => {
          resolve(data.data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  getHotelById(idHotel: string) {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Hotels')
        .select('*')
        .eq('id', idHotel)
        .then((data) => {
          resolve(data.data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  addHotel(value: any) {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Hotels')
        .insert([value])
        .then((data) => {
          resolve(data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  getHotels(value: any) {
    return new Promise((resolve, reject) => {
      if (value.idDestination && value.name) {
        this.supabaseAuthService.supabase
          .from('Hotels')
          .select(`*,Destinations!inner(*)'`)
          .eq('idDestination', value.idDestination)
          .eq('Destinations.id', value.idDestination)
          .ilike('name', `%${value.name}%`)
          .then((data) => {
            const mapData = data?.data?.map((item: any) => {
              return {
                ...item,
                nameDestination: item.Destinations.name,
              };
            });
            resolve(mapData);
          })
          .then((error) => {
            reject(error);
          });
      } else if (value.idDestination && !value.name) {
        this.supabaseAuthService.supabase
          .from('Hotels')
          .select(`*,Destinations!inner(*)'`)
          .eq('idDestination', value.idDestination)
          .eq('Destinations.id', value.idDestination)
          .then((data) => {
            const mapData = data?.data?.map((item: any) => {
              return {
                ...item,
                nameDestination: item.Destinations.name,
              };
            });
            resolve(mapData);
          })
          .then((error) => {
            reject(error);
          });
      } else if (!value.idDestination && value.name) {
        this.supabaseAuthService.supabase
          .from('Hotels')
          .select('*')
          .ilike('name', `%${value.name}%`)
          .then((data) => {
            resolve(data.data);
          })
          .then((error) => {
            reject(error);
          });
      }
    });
  }

  addDestination(name: any) {
    const tempId = new Date().getTime();
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Destinations')
        .insert([{ id: tempId, name: name }])
        .then((data) => {
          resolve(data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  getAllHotels() {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Hotels')
        .select(`*,Destinations!inner(*)'`)
        .then((data) => {
          const mapData = data?.data?.map((item: any) => {
            return {
              ...item,
              nameDestination: item.Destinations.name,
            };
          });
          resolve(mapData);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  getRooms() {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Rooms')
        .select(`*`)
        .then((data) => {
          resolve(data?.data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  getAllRoomTypes() {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('RoomsType')
        .select(`*`)
        .then((data) => {
          resolve(data.data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  addRoom(body: any) {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Rooms')
        .insert([body])
        .then((data) => {
          resolve(data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }

  getAllBookings() {
    return new Promise((resolve, reject) => {
      this.supabaseAuthService.supabase
        .from('Bookings')
        .select(`*`)
        .then((data) => {
          resolve(data?.data);
        })
        .then((error) => {
          reject(error);
        });
    });
  }
}
