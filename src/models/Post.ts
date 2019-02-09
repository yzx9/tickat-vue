/*
 * @Author: Celeste
 * @Date: 2019-01-30 19:57:52
 * @LastEditors: Celeste
 * @LastEditTime: 2019-02-08 21:45:44
 * @Description: Post类及其类型
 */

/** Post类 */
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
/** Post类型 */
export enum Type {
    text = 'text',
    image = 'image',
}
