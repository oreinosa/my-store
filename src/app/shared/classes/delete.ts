import { takeUntil, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DAO } from './dao';
import { MatDialogRef } from '@angular/material';

export class Delete<T> implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  documentName: string;
  constructor(
    public dao: DAO<T>,
    public dialogRef: MatDialogRef<Delete<T>>,
    public id: string
  ) { }

  ngOnInit() {
    this.documentName = this.dao.documentName;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async onDelete() {
    try {
      await this.dao.delete(this.id);
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    }
  }

}
