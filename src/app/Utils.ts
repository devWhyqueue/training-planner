import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export default class Utils {
  static toDate(timestamp): Date {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    }
  }
}
