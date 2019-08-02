import axios from 'axios';
import router from '../router'
import env from './env'
import {
  app
} from '../main';
import store from '../store/index';
import qs from 'qs';
const BASE_URL = env.getHttpUrl();


import {
  getStore,
  removeStore
} from "@/common/storage";
import $ from "jquery";

import {
  Toast,
  Dialog
} from 'vant';


let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;
let instance = axios.create({
  timeout: 20000,
  withCredentials: false,
  baseURL: BASE_URL,
});
// 请求时的拦截器
instance.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  if (getStore('token')) {
    config.headers.authorization = getStore('token');
  }
  store.commit('showLoading');
  return config;
}, error => {
  store.commit('hideLoading');
  return Promise.reject(error);
});
instance.interceptors.response.use(res => {
  // Toast.clear();
  const resData = res.data;
  switch (resData.code) {
    case '21004':
      Toast.fail(resData.msg);
      setTimeout(() => {
        console.log("过期");
        window.JSPos.gotoLogin();
      }, 2000);
      break;
    default:
      break;
  }
  store.commit('hideLoading');
  return res
}, error => {
  store.commit('hideLoading');
  return Promise.resolve(error.res)
});

// return res返回的是一个对象
// 网络或者服务器的错误
function checkStatus(res) {
  // 这里可以加一些动作, 比如来个进度条结束动作
  // 如果http状态码正常，则直接返回数据
  if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
    return res;
    // 如果不需要除了data之外的数据，可以直接 return res.data
  }
  // 异常状态下，把错误信息返回去
  // return {
  //   status: -404,
  //   message: '网络异常'
  // };
}

// 程序端的错误
function checkCode(res) {
  // console.log(res);
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    Toast.fail(res.message);
    throw new Error(res.message);
  }

  //系统异常

  //没有登陆

  //没有设置校验项

  // 非正常code
  // console.log(res);

 


  if (res.data.status == 'error') {
    if (res.data.msg) {
      // Dialog.close();
      // Toast(res.data.msg);
      // if (res.data.data.body.errcode != '40163') {
      //   Toast(res.data.msg);
      // }
      // throw new Error(res.data.msg);
      if (res.data.code != '10001' || res.data.code != "21001") {
        Toast(res.data.msg);
      }
    }
  }
  return res.data;
}

//将参数拼接成键值对字符串 对象中包含数组时，stringify转换后的结果不能满足server需求
function toQueryString(param, key, encode) {
  if ((param instanceof FormData)) {
    return param;
  }
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += toQueryString(param[i], k, encode);
    }
  }
  return paramStr;
};

export default {
  post(url, data, formData) {
    var postData = {
      method: 'post',
      url,
      data: qs.stringify(data),
      cancelToken: new CancelToken(c => {
        cancel = c
      })
    }
    if (formData) {
      var postData = {
        method: 'post',
        url,
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }
    }
    return instance.request(
      postData
    ).then(
      (res) => {
        return checkStatus(res)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get(url, params) {
    return instance.request({
      method: 'get',
      url,
      params, // get 请求时带的参数
      cancelToken: new CancelToken(c => {
        cancel = c
      })
    }).then(
      (res) => {
        return checkStatus(res)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  syncGet(url, param) {
    $.ajax({
      url: url,
      type: "get", //GET
      async: false, //或false,是否异步
      data: param,
      timeout: 20000, //超时时间
      dataType: "json", //返回的数据格式：
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", getStore('token'));
      },

      success: function (data, textStatus, jqXHR) {
        // resolve(data)
        // return data;
        return checkCode(data)
      },
      error: function (xhr, textStatus) {
        // return checkCode(xhr)
        return checkCode(xhr)
      },
      complete: function () {}
    });
  },

}
