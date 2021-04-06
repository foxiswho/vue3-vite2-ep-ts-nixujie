import { ILayout } from '@/type/store/interface'

declare global {
    interface IR<T = any> {
        code: number;
        message: string;
        data: T;
    }
    interface IObject<T> {
        [index: string]: T
    }

    interface IState {
        layout: ILayout
    }
    interface ITable<T = any> {
        data : Array<T>
        total: number
        page: number
        size: number
    }
}
