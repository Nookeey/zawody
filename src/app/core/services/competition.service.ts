import { Competition } from './../models/competition';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class CompetitionService {

  private path = '/competition';

  constructor(private db: AngularFireDatabase) {}

  getCompetition(): Observable<any[]> {
    return this.db.list(this.path)
      .snapshotChanges()
      .map(changes => {
        return changes
        .map(c => ({
          key: c.payload.key, ...c.payload.val()
         }));
      });
  }

  createCompetition(competition: Competition) {
    this.db.list(this.path)
      .push(competition)
      .then(res => {
        console.log('Competition created');
      });
  }

  remove(key) {
    this.db.list(this.path).remove(key);
  }
}
