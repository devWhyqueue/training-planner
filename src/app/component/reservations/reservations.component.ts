import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {ReservationsDataSource} from './reservations-datasource';
import {ReservationService} from '../../service/reservation.service';
import {Reservation} from '../../model/Reservation';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteDialogComponent} from '../confirm-delete-dialog/confirm-delete-dialog.component';
import {TrainingService} from '../../service/training.service';
import {Training} from '../../model/Training';
import {FormControl} from '@angular/forms';
import {AddReservationDialogComponent} from '../add-reservation-dialog/add-reservation-dialog.component';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<Reservation>;
  dataSource: ReservationsDataSource;
  trainings: Training[];
  trainingSelect = new FormControl();
  displayedColumns = ['player', 'date', 'delete'];

  constructor(public dialog: MatDialog, private reservationService: ReservationService, private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.dataSource = new ReservationsDataSource(this.reservationService, this.trainingSelect.valueChanges);
    this.loadTrainings();
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }

  loadTrainings() {
    return this.trainingService.getTrainings().subscribe(arr => {
      this.trainings = arr.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Training;
      });
      this.trainingSelect.setValue(this.trainings[0].id);
    });
  }

  reservations(): number {
    return this.dataSource.displayedData ? this.dataSource.displayedData.length : 0;
  }

  canCreate(): boolean {
    return this.dataSource.displayedData && this.reservations() < 8;
  }

  create(): void {
    this.dialog.open(AddReservationDialogComponent, {
      data: {player: undefined, training: this.trainingSelect.value}
    });
  }

  delete(reservationId: string): void {
    this.dialog.open(ConfirmDeleteDialogComponent, {data: reservationId});
  }

  toDate(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }
}
