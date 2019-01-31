export default class Card {
  constructor(
    public id: string,
    public author: string,
    public avatar: string,
    public createTime: Date,
    public content: string,
    public image: string,
  ) {}
}
