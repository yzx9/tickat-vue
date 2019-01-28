export default class TodoItem {
  private isRepeat: boolean = false;
  private startDate: Date = new Date();
  private endDate: Date = new Date();
  private repeat: boolean[] = [ false, false, false, false, false, false, false ];

  public get monday() {
    return this.repeat[0];
  }
  public get tuesday() {
    return this.repeat[1];
  }
  public get wednesday() {
    return this.repeat[2];
  }
  public get thursday() {
    return this.repeat[3];
  }
  public get friday() {
    return this.repeat[4];
  }
  public get saturday() {
    return this.repeat[5];
  }
  public get sunday() {
    return this.repeat[6];
  }

  constructor(
    public id: string,
    public title: string,
    public createTime: Date,
    public allowEdit: boolean = true,
    public isDone: boolean = false,
    public content: string = '',
  ) {}

  // 设置重复事项，arr表示周重复信息，从周一开始
  public setRepeat(start: Date, end: Date, arr: boolean[]) {
    this.isRepeat = true;
    this.startDate = start;
    this.endDate = end;
    for (let i = 0; i <= Math.min(arr.length, 6); i++) {
      this.repeat[i] = arr[i];
    }
  }
}
