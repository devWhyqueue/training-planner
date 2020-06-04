import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private firestore: AngularFirestore) {
  }

  getTrainings() {
    return this.firestore.collection('trainings').snapshotChanges();
  }
}
