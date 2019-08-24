import originJSONP from 'jsonp'

export default function jsonp(url,data,options){
  // url = url + '?' + param(data)
  url = (url.indexOf("?") > -1 ? url : (url+'?')) + param(data)
  return new Promise((resolve,reject)=>{
    originJSONP(url,options,(err,res) => {
      if (!err){
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

function param (data) {
  let url = ''
  for (let key in data){
    let value = data[key] !== undefined ? data[key] : ''//
    url += '&' + key + '=' + encodeURIComponent(value) //value要记着加密
  }
  return url ? url.substring(1) : ''
}





