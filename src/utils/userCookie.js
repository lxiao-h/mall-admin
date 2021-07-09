import cookies from 'js-cookie';

function setCookie(userInfo) {
  const arr = Object.entries(userInfo);
  for (let i = 0; i < arr.length; i += 1) {
    cookies.set(arr[i][0], arr[i][1]);
  }
}

function getCookie() {
  return cookies.get();
}

function removeCookie() {
  cookies.remove('username');
  cookies.remove('appkey');
  cookies.remove('email');
  cookies.remove('role');
  return true;
}

export default {
  setCookie,
  getCookie,
  removeCookie,
};
