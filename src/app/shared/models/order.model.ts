import { Table } from './table.model';

export class Order {
  constructor(
    public id?: string,
    public guests?: number,
    public table?: string,
    public waiter?: string,
    public type?: string,
    public status?:string,
    public active?: boolean,
    public total?: number,
    public createdAt?: any
  ){}
}
