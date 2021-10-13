import {ElMessage} from 'element-plus'

const toStr = Object.prototype.toString

export function isUndef(v) {
    return v === undefined || v === null
}

export function isDef(v) {
    return v !== undefined && v !== null
}

export function isTrue(v) {
    return v === true
}

export function isFalse(v) {
    return v === false
}

export function isRegExp(v) {
    return toStr.call(v) === '[object RegExp]'
}

export function isArray(v) {
    return toStr.call(v) === '[object Array]'
}

export function isString(v) {
    return toStr.call(v) === '[object String]'
}

export function isObject(v) {
    return toStr.call(v) === '[object Object]'
}

export function isBlob(v) {
    return toStr.call(v) === '[object Blob]'
}

export function isFunction(v) {
    return toStr.call(v) === '[object Function]'
}

export function isNumber(v) {
    return toStr.call(v) === '[object Number]'
}

export function isDate(v) {
    return toStr.call(v) === '[object Date]'
}

export function isEmpty(v) {
    if (typeof v === 'undefined' || v === null || v === '') {
        return false
    } else {
        return true
    }
}

export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
    return arr
}

export function elementMessage(t, msg) {
    ElMessage({
        type: t,
        message: msg
    })
}

export function deepClone(origin) {
    if (!isObject(origin)) return origin
    var target = isArray(origin) ? [] : {}
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            var value = origin[prop]
            if (isObject(value)) {
                target[prop] = deepClone(value)
            } else {
                target[prop] = value
            }
            // if...else...可换成三目运算符
            // target[prop] = isObject(value) ? deepClone(value) : value
        }
    }
    return target
}

/**
 * 节流函数--规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
 * fun:函数。delay:时长
 */
export function throttle(fun, delay) {
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        } else {
            last = now
            fun.apply(that, _args)
        }
    }
}

/**
 * 防抖函数--在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 */
export function debounce(fun, delay) {
    // 记录上一次的延时器
    var timer = null
    let delays = delay || 200
    return function () {
        var args = arguments
        var that = this
        // 清除上一次延时器
        clearTimeout(timer)
        timer = setTimeout(function () {
            fun.apply(that, args)
        }, delays)
    }
}

// 数组去重
export function distinct(a, b) {
    return Array.from(new Set([...a, ...b]))
}

// 数组根据id对比去重
export function distincts(a, b) {
    // 首先构造Object
    const idSet = a.reduce((acc, v) => {
        acc[v.id] = true
        return acc
    }, {})
    // 遍历b，去掉在idSet中存在的id
    return b.filter(v => !idSet[v.id])
}

// 数组根据whsId对比去重
export function distinctWhsId(a, b) {
    // 首先构造Object
    const idSet = a.reduce((acc, v) => {
        acc[v.whsId] = true
        return acc
    }, {})
    // 遍历b，去掉在idSet中存在的whsId
    return b.filter(v => !idSet[v.whsId])
}

// 获取枚举值
export function converEnumType(value) {
    if (!value) {
        return ''
    } else {
        var fetchDcType = JSON.parse(localStorage.getItem('enumerations'))
        var msg = []
        fetchDcType.map(item => {
            if (Object.keys(item).toString() === value) {
                Object.values(item).forEach(val => {
                    msg = val
                })
            }
        })
        return msg
    }
}

// 随机数
export function RndNum(n) {
    var rnd = ''
    for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10)
    return rnd
}

// 计算表达式的值
export function evil(fn) {
    var Fn = Function
    return new Fn('return ' + fn)()
}

// 得到当前日期
export function getNewDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    // let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    // let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    // let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return year + '-' + month + '-' + day
}

// 得到前30天的日期
export function getMonthDate() {
    let dateNew = new Date()
    let date = new Date(dateNew - 1000 * 60 * 60 * 24 * 30)
    let year = date.getFullYear()
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return year + '-' + month + '-' + day
}

// 首字母：大写转为小写
export function firstLowcase(arr) {
    if (arr?.length) {
        arr.forEach(v => {
            Object.keys(v).map(keys => {
                let newKey = keys.slice(0, 1).toLowerCase() + keys.slice(1)
                if (newKey) {
                    if (v[keys] instanceof Array) {
                        firstLowcase(v[keys])
                    } else {
                        v[newKey] = v[keys]
                        delete v[keys]
                    }
                }
            })
        })
        return arr
    }
}

// 首字母：小写转为大写
export function low2Up(Obj) {
    if (Obj) {
        let v = Obj;
        Object.keys(v).map(keys => {
            let newKey = keys.slice(0, 1).toUpperCase() + keys.slice(1)
            if (newKey) {
                if (v[keys] instanceof Array) {
                    low2Up(v[keys])
                } else {
                    v[newKey] = v[keys]
                    delete v[keys]
                }
            }
        })
        return Obj
    } else {
        return Obj
    }
}

// 首字母：大写转为小写
export function upToLow(Obj) {
    if (Obj) {
        let v = Obj;
        Object.keys(v).map(keys => {
            let newKey = keys.slice(0, 1).toLowerCase() + keys.slice(1)
            if (newKey) {
                if (v[keys] instanceof Array) {
                    upToLow(v[keys])
                } else {
                    v[newKey] = v[keys]
                    delete v[keys]
                }
            }
        })
        return Obj
    } else {
        return Obj
    }
}


export function parseIntObj(obj) {
    if (obj) {
        for (let item in obj) {
            item = parseInt(item)
        }
        return obj;
    }
}

// 设置比例  1： 200， 0： 100
//


// 设置圆半径比例  val: Array
// export function setCircleRadius(arr) {
//     if (arr == 0 || arr == undefined) {
//         return 100
//     } else if (arr > 0 && arr <= 50) {
//         return 120
//     } else if (arr > 50 && arr <= 100) {
//         return 140
//     } else if (arr > 100 && arr <= 150) {
//         return 160
//     } else if (arr > 150 && arr <= 180) {
//         return 180
//     } else {
//         return 200
//     }
// }
export function formatTimer(value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return y + "-" + MM + "-" + d + " " + h + ":" + m;
}

// 设置关系图的圆圈大小
export function setCircleRadius(arr, sizeArr) {
    if (arr?.length && sizeArr?.length) {
        if (arr.length == 1) {
            arr[0].symbolSize = 100;
            return arr
        }
        let finalSize = []
        finalSize = getSizeArr(sizeArr)
        for (let i = 0; i < finalSize.length; i++) {
            arr[i].symbolSize = finalSize[i];
        }
        return arr
    }
    return arr
}
//
export function getSizeArr(sizeArr) {
    const maxValue = Math.max(...sizeArr);
    let finaSizeArr = []
    for (let x of sizeArr) {  //便利数组和对象
        let y = parseInt(100 * (x + maxValue) / maxValue)
        finaSizeArr.push(y)
    }
    return finaSizeArr
}

// 处理关系link
export function initLinkData(arr) {
    if (arr && arr.length) {
        arr.map(item => {
            item.source = item.source.toString()
            item.target = item.target.toString()
        })
        return arr
    }
}

// 处理关系数据
export function initSourceData(arr, sizeArr) {
    if (arr?.length) {
        // 数据图
        // let list = firstLowcase(arr)
        let list = arr
        list.forEach(item => {
            item['category'] = 'bgColor'
            item['symbolSize'] = 100
            item['id'] = item.tableId.toString()
            item['draggable'] = true
        })
        // 设置圆球的半径
        list = setCircleRadius(list, sizeArr);
        return list;
    }
}