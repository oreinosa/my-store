import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { DAO } from './dao';
import { MatDialogRef } from '@angular/material';

export class Add<T> implements OnInit {
  documentName: string;
  object: T;

  constructor(
    public dao: DAO<T>,
    public dialogRef: MatDialogRef<Add<T>>,
  ) { }

  ngOnInit() {
    this.documentName = this.dao.documentName;
  }

  async onAdd(object: T) {
    const id = await this.dao.create(object);
    console.log('created ', id);
    this.dialogRef.close();
  }

}
