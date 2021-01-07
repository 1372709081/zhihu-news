import axios from "axios"
import Vue from "vue"

let baseUrl = "/api"
Vue.prototype.$pre = "https://news-at.zhihu.com"

//响应拦截
axios.interceptors.response.use(res => {
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

export const reqHomeList = () => {
    return axios({
        url: baseUrl + "/api/4/stories/latest"
    })
}

export const reqOldList = (time) => {
    return axios({
        url: baseUrl + "/api/4/stories/before/" + time,
        params: time
    })
}