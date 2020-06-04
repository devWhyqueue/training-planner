import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './component/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReservationsComponent} from './component/reservations/reservations.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AddReservationDialogComponent} from './component/add-reservation-dialog/add-reservation-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ConfirmDeleteDialogComponent} from './component/confirm-delete-dialog/confirm-delete-dialog.component';
import {MatTableModule} from '@angular/material/table';
import localeDe from '@angular/common/locales/de';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent,
    AddReservationDialogComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatTableModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de-de'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
