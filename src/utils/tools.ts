import { IMenubarList } from '@/type/store/interface'
/**
 * 睡眠函数
 * @param time
 */
export async function sleep(time:number):Promise<void> {
    await new Promise(resolve => {
        setTimeout(() => resolve, time)
    })
}
/**
 * 金额格式化
 * @param num 金额
 * @param symbol 金额前面修饰符号，如$,￥
 */
export function amountFormat(num:number|string, symbol = '￥'):string {
    if(Number.isNaN(Number(num))) return `${symbol}0.00`
    return symbol + (Number(num).toFixed(2))
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
/**
 * 取消金额格式化
 * @param str 金额
 */
export function amountUnFormat(str:string):number|string {
    const s = str.substr(1).replace(/\,/g, '')
    return Number.isNaN(Number(s)) || Number(s) === 0 ? '' : Number(s)
}
/**
 * 表格合计行
 * @param str 金额
 */
export function tableSummaries(param: { columns: any; data: any }):Array<string | number> {
    const { columns, data } = param
    const sums:Array<string | number> = []
    columns.forEach((column: { property: string | number }, index:number) => {
        if (index === 0) {
            sums[index] = '合计'
            return
        }
        const values = data.map((item: { [x: string]: any }) => Number(item[column.property]))
        if (!values.every((value: number) => isNaN(value))) {
            sums[index] = values.reduce((prev: number, curr: number) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                    return prev + curr
                } else {
                    return prev
                }
            }, 0)
            const sum = sums[index]
            if(typeof sum === 'number') {
                sums[index] = amountFormat(sum.toFixed(2))
            }
        } else {
            sums[index] = 'N/A'
        }
    })

    return sums
}

export function isInput(el: HTMLElement): boolean {
    return el.nodeName.toLocaleLowerCase() === 'input'
}
export function isTextarea(el: HTMLElement): boolean {
    return el.nodeName.toLocaleLowerCase() === 'textarea'
}

/**
 * 函数节流
 * @param time 间隔时间
 */
export function throttle(time = 500):()=>Promise<void> {
    let timer:NodeJS.Timeout | null = null
    let firstTime = true
    return () => {
        return new Promise(resolve => {
            if(firstTime) {
                resolve()
                return firstTime = false
            }
            if(timer) return false
            timer = setTimeout(() => {
                if(timer) clearTimeout(timer)
                timer = null
                resolve()
            }, time)
        })
    }
}
