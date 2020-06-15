import {DataSource} from '@angular/cdk/collections';
import {combineLatest, Observable} from 'rxjs';
import {Reservation} from '../../model/Reservation';
import {ReservationService} from '../../service/reservation.service';
import {map} from 'rxjs/operators';
import {Training} from '../../model/Training';

export class ReservationsDataSource extends DataSource<Reservation> {

  displayedData: Reservation[];

  constructor(private reservationService: ReservationService, private filter: Observable<Training>) {
    super();
  }

  connect(): Observable<Reservation[]> {
    const reservationsObs = combineLatest([this.getReservations(), this.filter]).pipe(
      map(([reservations, filter]) => reservations.filter(reservation => reservation.training === filter.id)));
    reservationsObs.subscribe(reservations => this.displayedData = reservations);
    return reservationsObs;
  }

  private getReservations(): Observable<Reservation[]> {
    return this.reservationService.getReservations().pipe(map(arr => {
      return arr.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Reservation;
      });
    }));
  }

  disconnect() {
  }
}
