export class Link {
  constructor(
    public label?: string,
    public path?: string,
    public icon?: string,
    public children?: Link[],
    public isDialog?: boolean,
    public isOpened?: boolean
  ) { }
}
