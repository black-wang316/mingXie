;(()=>{
    $(`header`).load('../html/headWithoutSearch.html')
    $(`footer`).load(`../html/foot.html`)
//随机验证码
    $(`#logincode~p`).html(function () {
        $(this).html(randomCode())
        $(this).css({
            'color': randomColor(16),
            'background': `url("../img/ranCode${parseInt(Math.random() * 3 + 1)}")`
        })
    }).on('click', function () {
        $(this).html(randomCode())
        $(this).css({
            'color': randomColor(16),
            'background': `url("../img/ranCode${parseInt(Math.random() * 3 + 1)}")`
        })
    })
//登录键 判断用户是否存在与验证码是否填写正确
    $(`.loginBtn`).on(`click`, function () {
        if ($(`#name`).val().trim() && $(`#psw`).val().trim() && $(`#logincode`).val().trim()) {
            if ($(`#logincode`).val().trim().toLowerCase() == $(`#logincode`).next().html().toLowerCase()) {
                $(`.loginTitle`).css("visibility", "hidden").html("")
                let login = new Promise(function (resolve) {
                    $.ajax({
                        type: 'post',
                        url: '../api/loginRegister.php',
                        data: {
                            type:'login',
                            username: $(`#name`).val().trim(),
                            password: $(`#psw`).val().trim()
                        },
                        success: str => {
                            let arr = JSON.parse(str)
                            resolve(arr)
                        }
                    })
                })
                login.then((data) => {
                    if (data.status) {
                        $(`.loginTitle`).css("visibility", "visible").html(data.msg).addClass(`success`)
                        $.cookie(`uName`,$(`#name`).val(),{ expires: 7 })
                        location.href=`${$.cookie(`urlNow`)}`
                    }else {
                        $(`.loginTitle`).css("visibility", "visible").html(data.msg).removeClass(`success`)
                    }
                })
            } else {
                $(`.loginTitle`).css("visibility", "visible").html("验证码填写错误")
            }

        } else {
            $(`.loginTitle`).css("visibility", "visible").html("请输入完整")
        }
    })
})()
