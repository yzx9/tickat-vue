/*
 * @Author: Celeste
 * @Date: 2019-01-31 11:56:02
 * @LastEditors: Celeste
 * @LastEditTime: 2019-02-08 16:52:58
 * @Description:
 */
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
        public image: string,
    ) {}
}
