//工具

//洗牌函数

function getRandomInt (min, max) {//Math.random()是0-1之间，且不包含1，所以加1，因为是小数，所以向下取整
    return Math.floor(Math.random() * (max - min + 1) + min)
}



export function shuffle (arr) {//从0到i取一个索引，拿这个索引对应的值与arr[i]进行交换
    let _arr = arr.slice() //解决shuffle函数对原数组的更改
    for(let i = 0; i < _arr.length; i++){
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}