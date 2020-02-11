export class OrderRecord {
  constructor(
    public name?: string,
    public amount?: number,
    public price?: number,
    public createdAt?
  ) { }
}
