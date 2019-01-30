export class Post {
  constructor(
    public id: string,
    public type: Type,
    public author: string,
    public avatar: string,
    public createTime: Date,
    public content: string,
    public image: string,
    public favorite: number,
    public comment: number,
  ) {}
}

export enum Type {
  text = 'text',
  image = 'image',
}
