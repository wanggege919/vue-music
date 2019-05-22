export function addClass(el,className) {
    if(hasClass(el,className)){
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function hasClass(el,className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

//解决js中使用某些style属性前面要加前缀的问题

//能力测试
let elementStyle = document.createElement('div').style

//供应商，各种浏览器内核, 立即执行函数
let vendor = (()=>{
    let transformNames = {
        webkit: 'webkitTransform', //谷歌
        Moz: 'MozTransform', //火狐
        O: 'OTransform', //opera
        ms: 'msTransform', //IE
        standard: 'transform' //标准
      }
    for(let key in transformNames){
        if(elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

export function prefixStyle (style) {
    if(vendor === false) {
        return false
    }

    if(vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substring(1)
}



