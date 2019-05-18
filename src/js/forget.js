;(() => {
    $(`header`).load('../html/headWithoutSearch.html')
    $(`footer`).load(`../html/foot.html`)
    let  ok = false
    $(`#psw`).on(`blur`,function () {
        let reg = /^.{4,}$/;
        if (reg.test($(this).val().trim())) {
            $(".loginTitle").css("visibility", "hidden");
            ok=true
        }
        else {
            $(".loginTitle").css("visibility", "visible").removeClass("success").html("输入的密码长度不能少于4个字符");
            ok=false
        }
    })
    function init() {
        $(`.send`).html(`发送手机验证码`).on(`click`, function () {
            if ($(`#name`).val().trim()) {
                let yanZheng = new Promise(resolve => {
                    $.ajax({
                        type: 'post',
                        url: '../api/loginRegister.php',
                        data: {
                            type: 'register',
                            username: $(`#name`).val().trim()
                        },
                        success: str => {
                            let arr = JSON.parse(str)
                            resolve(arr)
                        }
                    })
                })
                yanZheng.then(arr => {
                    if (arr.status) {
                        $(`.loginTitle`).html(`该账号未被注册`).css(`visibility`, 'visible')
                    } else {

                        $.ajax({
                            type: 'post',
                            url: '../api/forget.php',
                            data: {
                                'mobile': $(`#name`).val().trim()
                            },
                            success: str => {
                                // console.log( $(`#name`).val().trim())
                                // console.log(str)
                                $(`.loginBtn`).on('click',function () {
                                    if ($(`#code`).val().trim()&&ok){
                                        if($(`#code`).val().trim()==str){
                                            $.ajax({
                                                type:'post',
                                                url:'../api/reset.php',
                                                data:{
                                                    username:$(`#name`).val().trim(),
                                                    password:$(`#psw`).val().trim()
                                                },
                                                success:str=>{
                                                    if (str){
                                                        layui.use('layer', function () {
                                                            let layer = layui.layer;
                                                            layer.open({
                                                                title: '已成功修改，汝跳否'
                                                                , content: '是否跳转到登录页面'
                                                                , btn: ['给我跳', '告辞'],
                                                                btn1: function () {
                                                                    location.href = `login.html`
                                                                },
                                                                closeBtn: 2,
                                                                anim: 4,
                                                            });
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    } else {
                                        $(`.loginTitle`).html(`按要求填写`).css(`visibility`, 'visible')
                                    }
                                })
                            }
                        })
                        $(`.send`).off(`click`)
                        let num = 60;
                        let time = setInterval(() => {
                            num--
                            $(this).html(num)
                            if (num <= 0) {
                                clearInterval(time)
                                init()
                            }
                        }, 1000)
                    }
                })

            }
        })
    }

    init()
})()