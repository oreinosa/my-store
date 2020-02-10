import { OnInit, OnDestroy } from '@angular/core';
import { DAO } from './dao';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';

export class Update<T> implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  documentName: string;
  constructor(
    public dao: DAO<T>,
    public dialogRef: MatDialogRef<Update<T>>,
    public id: string,
    public object: T
  ) { }

  ngOnInit() {
    this.documentName = this.dao.documentName;
    // this.object = Object.assign({}, this.object);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async onUpdate(object) {
    try {
      await this.dao.update(this.id, object);
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    }
  }

}
