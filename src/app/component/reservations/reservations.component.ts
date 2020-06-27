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
import * as moment from 'moment';
import Utils from 'src/app/Utils';

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
  displayedColumns = ['player', 'delete'];

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
      this.trainingSelect.setValue(this.nextTraining());
      this.weeklyCleanUp();
    });
  }

  nextTraining(): Training {
    const nextTrainings = this.trainings.filter(t => moment(Utils.toDate(t.date)).diff(moment()) > 0);
    return nextTrainings.reduce((a, b) =>
      moment(Utils.toDate(a.date)).diff(moment()) < moment(Utils.toDate(b.date)).diff(moment()) ? a : b);
  }

  reservations(): number {
    return this.dataSource.displayedData ? this.dataSource.displayedData.length : 0;
  }

  canCreate(): boolean {
    return this.dataSource.displayedData && this.reservations() < this.trainingSelect.value.limit;
  }

  create(): void {
    this.dialog.open(AddReservationDialogComponent, {
      data: {player: undefined, training: this.trainingSelect.value.id}
    });
  }

  delete(reservationId: string): void {
    this.dialog.open(ConfirmDeleteDialogComponent, {data: reservationId});
  }

  weeklyCleanUp() {
    for (const t of this.trainings) {
      const trainingDate = moment(Utils.toDate(t.date));
      if (trainingDate.diff(moment(), 'days') < 0) {
        this.reservationService.deleteAllReservationsWithTraining(t.id);
        const nextTraining = trainingDate.add(1, 'week');
        this.trainingService.updateTrainingDate(t.id, nextTraining.toDate());
      }
    }
  }

  dateStr(date: Date): string {
    return moment(Utils.toDate(date)).format('dddd, Do MMMM, HH:mm [Uhr]');
  }
}
