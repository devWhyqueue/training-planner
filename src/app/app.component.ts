import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'training-planner';
  cws = ['KW23', 'KW24', 'KW25', 'KW26', 'KW27', 'KW28', 'KW29', 'KW30'];
  days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];


}
