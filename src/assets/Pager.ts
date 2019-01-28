export class Pager {
  constructor(
    public current: number, // 当前页数
    public size: number,    // 每页行数
    public sort: string,    // 排序列
    public order: Order,    // 排序
    public total?: number,  // 总行数
  ) {}

  public get totalPage() {
    if (this.total) {
      return Math.round(this.total / this.size) + 1;
    } else {
      return 0;
    }
  }
}

export enum Order { asc= 'asc', desc= 'desc' }
