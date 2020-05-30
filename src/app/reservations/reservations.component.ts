import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {ReservationsDataSource, ReservationsItem} from './reservations-datasource';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<ReservationsItem>;
  dataSource: ReservationsDataSource;

  displayedColumns = ['player', 'partner', 'delete'];

  ngOnInit() {
    this.dataSource = new ReservationsDataSource();
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
