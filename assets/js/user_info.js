$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '字符串的长度应在1-6位之间';
            }
        }

    })
    initUserInfo()

    //获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                form.val('getUserInfo', res.data)
            }
        })
    }
    //点击重置按钮
    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })
    //监听表单提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(11);
                window.parent.getUserinfo()
            }
        })
    })

})