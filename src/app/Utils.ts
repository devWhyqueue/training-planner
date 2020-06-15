import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Timestamp = firebase.firestore.Timestamp;

export default class Utils {
  static toDate(timestamp): Date {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    }
  }
}
