import axios from 'axios'
import JSONBig from 'json-bigint'

// 创建一个axios实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径

  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // 后台如果返回的不是JSON格式字符串会引起报错
    try {
      // 转换成功，进入这里
      return JSONBig.parse(data)
    } catch (err) {
      // 转换失败就进入这里
      console.log('转换失败', err)
      return data
    }
  }]
})

request.interceptors.request.use(config => {
  // const user = JSON.parse(window.localStorage.getItem('userInfo'))
  // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
  //  config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
  //  config.headers = {
  //    'Content-Type':'application/x-www-form-urlencoded' //配置请求头
  //  }
  // 注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
  // 这里取token之前，你肯定需要先拿到token,存一下
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`// 如果要求携带在请求头中
  }
  // config.headers.common.Accept='text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  return config
}, error => {
  Promise.reject(error)
})

export default request
