$(function () {
    var layer = layui.layer;
    getUserinfo()
    // 退出按钮的点击事件
    $('#exit').on('click', function () {
        layer.confirm('确认需要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //清除本地存储的数据
            localStorage.removeItem('token')
            //退回到登录界面
            location.href = '/login.html'
            layer.close(index);
        });
    })

})
// 获取基本信息并渲染头像
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            renderInfo(res.data)
        },

    })
}

//渲染头像
function renderInfo(user) {
    var uname = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + uname)
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        //渲染默认头像
        $('.text-avater').html(uname[0].toUpperCase())
        $('.layui-nav-img').hide()
    }
}