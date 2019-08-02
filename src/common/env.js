export default {
    origin: location.origin,
    getEnv() {
      let HREF = window.location.href;
      if (HREF.indexOf('xhd.imeduplus.com') > -1) {
        return 'pre';
      }
      HREF = HREF.substring(21,25);
      console.log('HREF------>', HREF)
      if(HREF=='wech'){
        return 'pre';
      }else if(HREF=='test'){
        return 'test';
      }else if(HREF =='dev/'){
        return 'dev';
      }else{
        return 'local'
      }
    },
    getHttpUrl() {
      let HTTPAPI = '';
      if (this.getEnv() == 'pre') {
        HTTPAPI = 'https://api.imxyb.com';
      } else if (this.getEnv() == 'test') {
        HTTPAPI = 'https://api-test.imxyb.com';
      } else if (this.getEnv() == 'dev') {
        HTTPAPI = 'https://api-dev.imxyb.com';
      } else {
        HTTPAPI = '/api';
      }
      console.log('HTTPAPI------>', HTTPAPI)
      return HTTPAPI;
    },
    getHttSyncpUrl() {
      let HTTPAPI = '';
      if (this.getEnv() == 'pre') {
        HTTPAPI = 'https://api.imxyb.com';
      } else if (this.getEnv() == 'test') {
        HTTPAPI = 'https://api-test.imxyb.com';
      } else if (this.getEnv() == 'dev') {
        HTTPAPI = 'https://api-dev.imxyb.com';
      } else {
        HTTPAPI = 'https://api-dev.imxyb.com';
      }
      return HTTPAPI;
    },
    getShareHttpUrl() {
      let HTTPAPI = '';
      if (this.getEnv() == 'pre') {
        HTTPAPI = 'https://xhd.imeduplus.com';
      } else if (this.getEnv() == 'test') {
        HTTPAPI = 'https://hd.imxyb.com/test';
      } else if (this.getEnv() == 'dev') {
        HTTPAPI = 'https://hd.imxyb.com/dev';
      } else {
        HTTPAPI = 'https://hd.imxyb.com/dev';
      }
      return HTTPAPI;
      return HTTPAPI;
    },
    getHttpDirectory(){
      let DIRECTORY = '';
      if (this.getEnv() == 'pre') {
        DIRECTORY = '/wechatuser';
      } else if (this.getEnv() == 'test') {
        DIRECTORY = '/test/wechatuser';
      } else if (this.getEnv() == 'dev') {
        DIRECTORY = '/dev/wechatuser';
      } else {
        DIRECTORY = '/dev/wechatuser';
      }
      return DIRECTORY;
    },
    getPayHttpUrl(){
      let HTTPAPI = '';
      if (this.getEnv() == 'pre') {
        HTTPAPI = 'https://pay.imxyb.com';
      } else if (this.getEnv() == 'test') {
        HTTPAPI = 'https://pay.imxyb.com/test';
      } else if (this.getEnv() == 'dev') {
        HTTPAPI = 'https://pay.imxyb.com/dev';
      } else {
        HTTPAPI = 'https://pay.imxyb.com/dev';
      }
      return HTTPAPI;
    }
  }
  