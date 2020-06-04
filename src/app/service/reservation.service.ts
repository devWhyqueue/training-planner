import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Reservation} from '../model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firestore: AngularFirestore) {
  }

  getReservations() {
    return this.firestore.collection('reservations').snapshotChanges();
  }

  createReservation(reservation: Reservation) {
    return this.firestore.collection('reservations').add(reservation);
  }

  deleteReservation(id: string) {
    this.firestore.doc('reservations/' + id).delete();
  }
}
