/*
 * @Author: Celeste
 * @Date: 2019-01-28 12:34:24
 * @LastEditors: Celeste
 * @LastEditTime: 2019-02-08 21:48:35
 * @Description: Todo类
 */

/** Todo类 */
export default class Todo {
    /** 星期一 */
    public get monday() {
        return this.getRe(0);
    }
    /** 星期二 */
    public get tuesday() {
        return this.getRe(1);
    }
    /** 星期三 */
    public get wednesday() {
        return this.getRe(2);
    }
    /** 星期四 */
    public get thursday() {
        return this.getRe(3);
    }
    /** 星期五 */
    public get friday() {
        return this.getRe(4);
    }
    /** 星期六 */
    public get saturday() {
        return this.getRe(5);
    }
    /** 星期天 */
    public get sunday() {
        return this.getRe(6);
    }
    /** 是否为重复代办 */
    public get isRepeat() {
        return this.isRe;
    }
    private isRe: boolean = false;
    private startDate: Date = new Date();
    private endDate: Date = new Date();
    private repeat: boolean[] = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ];

    /** 默认允许编辑、未完成 */
    constructor(
        public id: string,
        public title: string,
        public createTime: Date,
        public content: string = '',
        public allowEdit: boolean = true,
        public isDone: boolean = false,
    ) {}

    /** 设置重复事项，arr表示周重复信息，从周一开始 */
    public setRepeat(start: Date, end: Date, arr: boolean[]) {
        this.isRe = true;
        this.startDate = start;
        this.endDate = end;
        for (let i = 0; i <= Math.min(arr.length, 6); i++) {
            this.repeat[i] = arr[i];
        }
    }

    /** 获取重复信息 */
    private getRe(index: number) {
        if (this.isRe) {
            return this.repeat[index];
        } else {
            return false;
        }
    }
}
