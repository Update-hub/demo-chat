import { firestore } from 'firebase/app';

export interface Room {
  id: string;
  name: string;
  createdAt: firestore.Timestamp;
}
