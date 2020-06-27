import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    moment.locale('de');
  }

  isSummerHolidays(): boolean {
    return moment().isBefore(moment('2020-08-11'));
  }
}
