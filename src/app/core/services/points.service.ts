import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Points } from '../models/points';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  private path = '/points';

  constructor(private db: AngularFireDatabase) { }

  addPoints(points: Points) {
    this.db.list(this.path)
    .push(points)
    .then(res => {
      console.log('Points added');
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

  editPoints(points: Points) {
    this.db.list(this.path)
      .update(points.key, {value: points.value});
  }

}
