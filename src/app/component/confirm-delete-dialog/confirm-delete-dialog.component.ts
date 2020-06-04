import {Component, Inject, OnInit} from '@angular/core';
import {ReservationService} from '../../service/reservation.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public reservationId: string, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
  }

  delete() {
    this.reservationService.deleteReservation(this.reservationId);
  }
}
