$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value !== $('#newpwd').val()) {
                return '两次密码不一致!'
            }
        }
    })
    //监听修改密码的表单提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('密码更新成功!请重新登录')
                window.parent.location.href = '/login.html'
            }
        })
    })
})