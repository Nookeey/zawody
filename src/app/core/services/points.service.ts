import { Points } from './../models/points';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PointsService {

  private path = '/points';

  constructor(private db: AngularFireDatabase) {}

  setPoints(points: Points) {
    this.db.list(this.path)
      .push(points)
      .then(res => {
        console.log('Points set');
      });
  }

  getPoints(): Observable<any[]> {
    return this.db.list(this.path)
      .snapshotChanges()
      .map(changes => {
        return changes
        .map(c => ({
          key: c.payload.key, ...c.payload.val()
         }));
      });
  }

}
