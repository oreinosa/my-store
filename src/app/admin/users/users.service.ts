import { User } from 'src/app/shared/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DAO } from '../../shared/classes/dao';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DAO<User> {
  constructor(
    public af: AngularFirestore
  ) {
    super(
      af,
      "users",
      "user"
    );
  }


}
