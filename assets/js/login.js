$(function () {
  $('#reg_link').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  $('#login_link').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })
  var form = layui.form;
  var layer = layui.layer;
  //设置表单提交规则
  form.verify({
    pwd: [/^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      if (value !== $('#password').val()) {
        return '两次密码输入不一致!'
      }
    }
  })
  //监听注册表单提交事件
  $('#reg_form').on('submit', function (e) {
    //阻止表单默认提交事件
    e.preventDefault();
    var data = {
      username: $('#reg_form [name=username]').val(),
      password: $('#reg_form [name=password]').val()
    }
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录!')
        $('#login_link').click()
      }
    })
    //监听登录表单提交事件
  })
  $('#login_form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        localStorage.setItem('token', res.token)
        location.href = 'index.html'
      }
    })
  })
})
