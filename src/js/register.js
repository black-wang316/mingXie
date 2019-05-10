;(() => {
    $(`header`).load('../html/headWithoutSearch.html')
    $(`footer`).load(`../html/foot.html`)
    // $(`body`).on(`click`,'.logo>img', () => {
    //     location.href = `../main.html`
    // })
    $(`#regcode~p`).hide().html(function () {
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
    $(`#regcode`).on(`focus`, function () {
        $(`#regcode~p`).show()
    })
    for (let i = 0; i < $(`.regLeft input`).size(); i++) {
        $(`.regLeft input`).eq(i).attr(`data-id`, i)
    }//循环给每个input绑定data-id
    let count = []

//表单验证：
//用户名格式验证
    $("#name").on('blur', function () {
        let reg1 = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        let reg2 = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg1.test($(this).val().trim()) || reg2.test($(this).val().trim())) {
            $(".regTitle").css("visibility", "hidden");
            //用户名是否重复
            $.ajax({
                type: 'post',
                url: '../api/loginRegister.php',
                data: {
                    type: 'register',
                    username: $(this).val().trim()
                },
                success: str => {
                    let arr = JSON.parse(str)
                    if (!arr.status) {
                        $(".regTitle").css("visibility", "visible").removeClass("success").html(arr.msg);
                        count[$(`#name`).data('id')] = 0
                    } else {
                        $(".regTitle").css("visibility", "visible").addClass("success").html(arr.msg);
                        count[$(`#name`).data('id')] = 1
                    }
                }
            })
        }
        else {
            $(".regTitle").css("visibility", "visible").removeClass("success").html("请输入正确的邮箱账号或手机!");
            count[$(`#name`).data('id')] = 0
        }
    })

//密码验证
    $("#psw").on(`blur`, function () {
        let reg = /^.{4,}$/;
        if (reg.test($(this).val().trim())) {
            $(".regTitle").css("visibility", "hidden");
            if ($(this).val().trim() == $('#rpsw').val().trim()) {
                count[$(`#psw`).data('id')] = 1
            } else {
                count[$(`#psw`).data('id')] = 0
            }
        }
        else {
            $(".regTitle").css("visibility", "visible").removeClass("success").html("输入的密码长度不能少于4个字符");
            count[$(`#psw`).data('id')] = 0
        }
    })
//确认密码验证
    $("#rpsw").on('blur', function () {
        if ($(this).val().trim() == $("#psw").val().trim()) {
            $(".regTitle").css("visibility", "hidden");
            count[$(`#rpsw`).data('id')] = 1
            count[$(`#psw`).data('id')] = 1

        }
        else {
            $(".regTitle").css("visibility", "visible").removeClass("success").html("您两次输入的密码不一致");
            count[$(`#rpsw`).data('id')] = 0
        }
    })
// 验证码验证
    $("#regcode").on(`blur`, function () {
        if ($(this).val().trim().toLowerCase() == $(this).next().html().toLowerCase()) {
            $(".regTitle").css("visibility", "hidden");
            count[$(`#regcode`).data('id')] = 1
        }
        else {
            $(".regTitle").css("visibility", "visible").removeClass("success").html("验证码输入不正确");
            count[$(`#regcode`).data('id')] = 0
        }
    })
    $(`.regBtn`).on(`click`, function () {
//判断是否勾选协议
        if ($(`#check`)[0].checked) {
            count[$(`#check`).data(`id`)] = 1
            //判断每个input是否按要求填写完整
            let res = 0
            for (let key of count) {
                res += key
            }
            if (res == count.length) {
                $.ajax({
                    type: 'post',
                    url: '../api/loginRegister.php',
                    data: {
                        type: 'register',
                        username: $(`#name`).val().trim(),
                        password: $(`#psw`).val().trim()
                    },
                    success: str => {
                        let arr = JSON.parse(str)
                        alert(arr.msg)
                    }
                })
            } else {
                alert('注册失败')
            }
        } else {
            count[$(`#check`).data(`id`)] = 0
            $(".regTitle").css("visibility", "visible").removeClass("success").html("同意协议才能注册");
        }
    })
})()
