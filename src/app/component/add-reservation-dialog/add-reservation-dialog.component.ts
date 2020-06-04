import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReservationService} from '../../service/reservation.service';
import {Reservation} from '../../model/Reservation';

@Component({
  selector: 'app-add-reservation-dialog',
  templateUrl: './add-reservation-dialog.component.html',
  styleUrls: ['./add-reservation-dialog.component.scss']
})
export class AddReservationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public reservation: Reservation,
    private reservationService: ReservationService) {
  }

  valid(): boolean {
    return Boolean(this.reservation.player && this.reservation.partner);
  }

  create(reservation: Reservation) {
    this.reservationService.createReservation(reservation);
  }
}
