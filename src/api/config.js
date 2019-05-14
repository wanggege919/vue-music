//当我们抓取某个数据源时，尽量的使所有参数与数据源保持一致
export const commonParams = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  }
  
  //引用的jsonp库中的参数param,指的是回调函数的名字
  export const options = {
    param: 'jsonpCallback'
  }

  //为了使代码语义化
  export const ERR_OK = 0 