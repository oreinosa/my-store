import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DAO } from './dao';

export abstract class List<T> implements OnInit {
  private ngUnsubscribe = new Subject();
  documentName: string;
  collectionName: string;
  dataSource: MatTableDataSource<T>;
  data: Observable<T[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dao: DAO<T>,
    public dialog: MatDialog,
    public displayedColumns: string[],
    public addComponent,
    public updateComponent,
    public deleteComponent,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.documentName = this.dao.documentName;
    this.collectionName = this.dao.collectionName;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dao.getAll().pipe(
      takeUntil(this.ngUnsubscribe),
      tap(data => console.log(data))
    )
      .subscribe(data => this.dataSource.data = data);

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdd() {
    this.dialog.open(this.addComponent, { width: "350px"});
  }

  onUpdate(id: string, object: T) {
    // todo
    this.dialog.open(this.updateComponent, { data: { id, object } });
  }

  onDelete(id: string) {
    // todo
    this.dialog.open(this.deleteComponent, { data: id });
  }

}
