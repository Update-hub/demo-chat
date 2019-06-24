import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db: AngularFirestore
  ) { }

  createRoom(name: string): Promise<void> {
    const id = this.db.createId();
    return this.db.doc(`rooms/${id}`).set({
      id,
      name,
      createdAt: firestore.Timestamp.now()
    });
  }

  getAllRooms(): Observable<Room[]> {
    return this.db.collection<Room>('rooms').valueChanges();
  }

  getRoom(id: string): Observable<Room> {
    return this.db.doc<Room>(`rooms/${id}`).valueChanges();
  }

  deleteRoom(id: string): Promise<void> {
    return this.db.doc<Room>(`rooms/${id}`).delete();
  }

  editRoom(id: string, name: string): Promise<void> {
    return this.db.doc<Room>(`rooms/${id}`).update({ name });
  }
}
