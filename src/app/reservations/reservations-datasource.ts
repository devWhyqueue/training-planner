import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';

export interface ReservationsItem {
  id: number;
  player: string;
  partner: string;
  date: Date;
}

const EXAMPLE_DATA: ReservationsItem[] = [
  {id: 1, player: 'Cobalt', partner: 'Hydrogen', date: new Date()},
  {id: 2, player: 'Helium', partner: 'Hydrogen', date: new Date()},
  {id: 3, player: 'Lithium', partner: 'Hydrogen', date: new Date()},
  {id: 4, player: 'Beryllium', partner: 'Hydrogen', date: new Date()},
  {id: 5, player: 'Boron', partner: 'Hydrogen', date: new Date()},
  {id: 6, player: 'Carbon', partner: 'Hydrogen', date: new Date()},
  {id: 7, player: 'Nitrogen', partner: 'Hydrogen', date: new Date()},
  {id: 8, player: 'Oxygen', partner: 'Hydrogen', date: new Date()}
];

export class ReservationsDataSource extends DataSource<ReservationsItem> {
  data: ReservationsItem[] = EXAMPLE_DATA;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ReservationsItem[]> {
    return of(this.data);
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }
}
