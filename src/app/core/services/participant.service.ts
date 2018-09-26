import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Participant } from '../models/participant';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipantService {

  private path = '/participant';

  constructor(private db: AngularFireDatabase) {}

  getParticipant(): Observable<any[]> {
    return this.db.list(this.path)
      .snapshotChanges()
      .map(changes => {
        return changes
        .map(c => ({
          key: c.payload.key, ...c.payload.val()
         }));
      });
  }

  create(participant: Participant) {
    this.db.list(this.path)
      .push(participant)
      .then(res => {
        console.log('Participant created');
      });
  }

  remove(key) {
    this.db.list(this.path).remove(key);
  }
}
