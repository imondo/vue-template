import store from '../store';

export async function getToken() {
  const tokenObj = await getTokenFun(store.state.api);
  const { access_token = '', token_type = '' } = tokenObj || {};
  return { access_token, token_type };
}

export function removeToken() {
  return new Promise(reslove => {
    if (localStorage.isRember) {
      const remberLogin = localStorage.isRember;
      sessionStorage.clear();
      localStorage.clear();
      localStorage.isRember = remberLogin;
      delTokenFun(store.state.api).then(() => {
        reslove();
      });
    } else {
      sessionStorage.clear();
      localStorage.clear();
      delTokenFun(store.state.api).then(() => {
        reslove();
      });
    }
  });
}

/* global CrossStorageClient*/
// 解析url中的token及其它值
export function getLoginParams(str) {
  str = str.substr(1);
  str = str.split('&');
  var a = [];
  for (var i = 0; i < str.length; i++) {
    var t = str[i].split('=');
    a[t[0]] = t[1];
  }
  var s = {};
  s.access_token = a['access_token'];
  s.token_type = a['token_type'];
  s.state = a['state'];
  s.expires_in = a['expires_in'];
  return s;
}

// 获取token(同域从localStorage获取 不同域用CrossStorageClient获取)
export function getTokenFun(data) {
  const accessToken = data.IPORTAL_LOCAL_API.substr(
    data.IPORTAL_LOCAL_API.indexOf('://') + 3
  );
  const isSameArea =
    data.IPORTAL_LOCAL_API.substr(0, data.IPORTAL_LOCAL_API.indexOf('/', 9)) ===
    data.LOCAL_API.substr(0, data.IPORTAL_LOCAL_API.indexOf('/', 9));
  return new Promise(resolve => {
    if (isSameArea) {
      const { access_token, token_type } = localStorage;
      resolve({ access_token, token_type });
    } else {
      var iportal = new CrossStorageClient(
        data.IPORTAL_LOCAL_API + 'token.html'
      );
      iportal
        .onConnect()
        .then(() => iportal.get(accessToken))
        .then(token_list => {
          const tokenObj = JSON.parse(token_list);
          resolve(tokenObj);
        });
    }
  });
}

export function delTokenFun(data) {
  const isSameArea =
    data.IPORTAL_LOCAL_API.substr(0, data.IPORTAL_LOCAL_API.indexOf('/', 9)) ===
    data.LOCAL_API.substr(0, data.IPORTAL_LOCAL_API.indexOf('/', 9));
  return new Promise(resolve => {
    if (isSameArea) {
      resolve();
    } else {
      const iportal = new CrossStorageClient(
        data.IPORTAL_LOCAL_API + 'token.html'
      );
      iportal
        .onConnect()
        .then(() => iportal.get('isRember'))
        .then(isRember => {
          if (isRember) {
            iportal.clear();
            iportal.set('isRember', isRember);
            resolve();
          } else {
            iportal.clear();
            resolve();
          }
        })
        .catch(() => {
          resolve();
        });
    }
  });
}
