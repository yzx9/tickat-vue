export default class Card {
  constructor(
    public id: string,
    /** 作者 */
    public author: string,
    /** 头像 */
    public avatar: string,
    /** 创建时间 */
    public createTime: Date,
    /** 内容 */
    public content: string,
    /** 图片 */
    public image: string
  ) {}
}
