/*
 * @Author: Celeste
 * @Date: 2019-01-28 12:00:54
 * @LastEditors: Celeste
 * @LastEditTime: 2019-02-08 16:51:35
 * @Description:
 */
export class Pager {
    constructor(
        /** 当前页数 */
        public current: number,
        /** 每页行数 */
        public size: number,
        /** 排序列 */
        public sort: string,
        /** 排序 */
        public order: Order,
        /** 总行数 */
        public total?: number,
    ) {}

    /** 总页数 */
    public get totalPage() {
        if (this.total) {
            return Math.round(this.total / this.size) + 1;
        } else {
            return 0;
        }
    }
}

/** 正序/倒序 */
export enum Order {
    asc = 'asc',
    desc = 'desc',
}
