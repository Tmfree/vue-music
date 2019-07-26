import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import {
  getSwipeApi,
  getAllMusicApi,
  getMusicTypeApi,
  getSingOrderDetailApi,
  getMusicWordApi,
  getMvApi,
  getMvUrlApi,
  getLoginApi,
  getLogoutApi,
  getSearchApi
} from "./http/api";
import * as Type from './mutations-type';
import { updateLocale } from 'moment';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    swipeDataList: [],//轮播数据
    musicTypeList: [],//歌单分类
    allMusicList: [],//全部歌单
    singOrderDetail: null,//获取歌单详情
    songWordDetail: null,//获取歌词
    mvList: [],//mv列表
    mvUrl: {},//mv地址
    loginInfo: null,//登录信息
    logout: null,//退出登录
    searchList:null,//搜索结果数据
  },
  getters: {
    swipeDataList: state => state.swipeDataList,
    musicTypeList: state => state.musicTypeList,
    allMusicList: state => state.allMusicList,
    singOrderDetail: state => state.singOrderDetail,
    songWordDetail: state => state.songWordDetail,
    mvList: state => state.mvList,
    mvUrl: state => state.mvUrl,
    loginInfo: state => state.loginInfo,
    logout: state => state.logout,
    searchList: state => state.searchList
  },
  mutations: {
    //设置轮播图
    [Type.SET_SWIPEDATELIST](state, val) {
      state.swipeDataList = val.banners;
    },
    //设置全部歌单
    [Type.SET_ALLMUSICLIST](state, val) {
      state.allMusicList = val.playlists
    },
    //设置歌单类型
    [Type.SET_MUSICTYPELIST](state, val) {
      state.musicTypeList = val.tags
    },
    //设置歌单详情
    [Type.SET_SINGORDERDETAIL](state, val) {
      state.singOrderDetail = val
    },
    //设置歌词
    [Type.SET_SONGWORD](state, val) {
      state.songWordDetail = val
    },
    //设置mv列表
    [Type.SET_MVLIST](state, val) {
      state.mvList = val.result
    },
    //设置mvurl
    [Type.SET_MVURL](state, val) {
      state.mvUrl = val.data
    },
    //设置登录
    [Type.SET_LOGININFO](state, val) {
      state.loginInfo = val
    },
    //设置退出登录
    [Type.SET_LOGINOUT](state, val) {
      state.logout = val
    },
    //设置搜索
    [Type.SET_SEARCHLIST](state, val) {
      state.searchList = val.result
    }
  },
  actions: {
    getSwipeApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getSwipeApi(data).then(res => {
          commit(Type.SET_SWIPEDATELIST, res.data);
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    getAllMusicApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAllMusicApi(data).then(res => {
          commit(Type.SET_ALLMUSICLIST, res.data);
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    getMusicTypeApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getMusicTypeApi(data).then(res => {
          commit(Type.SET_MUSICTYPELIST, res.data);
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    getSingOrderDetailApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getSingOrderDetailApi(data).then(res => {
          commit(Type.SET_SINGORDERDETAIL, res.data);
          resolve();
        }).catch(err => {
          reject(err);
        })
      })
    },
    getMusicWordApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getMusicWordApi(data).then(res => {
          commit(Type.SET_SONGWORD, res.data);
          resolve();
        }).catch(err => {
          reject(err);
        })
      })
    },
    getMvApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getMvApi(data).then(res => {
          commit(Type.SET_MVLIST, res.data);
          resolve();
        }).catch(err => {
          reject(err);
        })
      })
    },
    getMvUrlApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getMvUrlApi(data).then(res => {
          commit(Type.SET_MVURL, res.data);
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    getLoginApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getLoginApi(data).then(res => {
          commit(Type.SET_LOGININFO, res.data);
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    getLogoutApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getLogoutApi(data).then(res => {
          commit(Type.SET_LOGINOUT, res.data);
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    getSearchApi({ commit }, data) {
      return new Promise((resolve, reject) => {
        getSearchApi(data).then(res => {
          commit(Type.SET_SEARCHLIST, res.data);
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })
    },

  },

  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的assessmentData
        loginInfo: val.loginInfo
      }
    }
  })]
})
