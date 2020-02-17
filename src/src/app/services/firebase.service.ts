import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Setting } from '../models/setting.model';
import { Group } from '../models/group.model';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

 constructor(private readonly db: AngularFirestore) {}

  getCollectionName(id: string): Observable<string> {
    return this.db.doc<Setting>(`/settings/${id}`).valueChanges().pipe(map(v=> {
      return  v != null ? v.collection : "feedbacks";
   }))
  }

  getSettings(): Observable<Setting[]> {
     return this.get<Setting>("settings");
  }

  getGroups(): Observable<Group[]>{
    return this.get<Group>("groups");
  }

  getMembersByGroup(id : string) : Observable<string[]> {
    return this.db.doc<Group>(`/groups/${id}`).valueChanges().pipe(map(v=> {
       return  v != null ? v.members : [];
    }))
  }

  get<T>(key: string) : Observable<T[]> {
      return this.db.collection<T>(`/${key}`, ref => ref.where("visible", "==", true)).valueChanges();
  }

  add(obj: any, key:string)  {
    this.db.collection(`/${key}`).add(obj);
  }
}
