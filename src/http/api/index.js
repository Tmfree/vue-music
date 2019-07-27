import fetch from '../fetch'

//轮播图接口
export const getSwipeApi = (data) => {
    return fetch({
        url:"/banner",
        method:"get",
        params:data
    })
}
//获取歌单分类接口
export const getMusicTypeApi = (data) => {
    return fetch({ 
        url: "/playlist/hot",
        method: "get",
        params: data
    })
}
//获取全部歌单接口
export const getAllMusicApi = (data) => {
    return fetch({
        url: "/top/playlist",
        method: "get",
        params: data
    })
}
//获取歌单详情接口
export const getSingOrderDetailApi = (data) => {
    return fetch({
        url: "/playlist/detail",
        method: "get",
        params: data
    })
}

//获取歌词接口
export const getMusicWordApi = (data) => {
    return fetch({
        url: "/lyric",
        method: "get",
        params: data
    })
}

//获取推荐MV列表接口
export const getMvApi = (data) => {
    return fetch({
        url: "/personalized/mv",
        method: "get",
        params: data
    })
}

//获取mv接口
export const getMvUrlApi = (data) => {
    return fetch({
        url: "/mv/url",
        method: "get",
        params: data
    })
}

//获取登录接口--手机号码登录
export const getLoginApi = (data) => {
    return fetch({
        url: "/login/cellphone",
        method: "get",
        params: data
    })
}
//获取退出登录接口--手机号码登录
export const getLogoutApi = (data) => {
    return fetch({
        url: "/logout",
        method: "get",
        params: data
    })
}

//获取搜索接口
export const getSearchApi = (data) => {
    return fetch({
        url: "/search/suggest",
        method: "get",
        params: data
    })
}