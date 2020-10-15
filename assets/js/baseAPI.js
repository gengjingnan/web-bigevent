// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
  if (options.url.indexOf('/my') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  //无论成功还是失败,都会调用complete函数
  options.complete = function (res2) {
    // console.log(res2);
    if (res2.responseJSON.status === 1 && res2.responseJSON.message === "身份认证失败！") {
      //清除本地存储的数据
      localStorage.removeItem('token')
      //退回到登录界面
      location.href = '/login.html'
    }
  }
})
