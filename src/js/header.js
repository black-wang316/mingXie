$(`header`).load('../html/head.html', function () {
    let url = window.location.href
    let urlNow = $.cookie('urlNow',url)
    $(`.searchBtn`).on(`click`, function () {
        let value = $(this).prev().val().trim()
        $(this).prev().val(``).focus()
        if (url.indexOf(`list`) == -1) {
            $.cookie('kw', value);
            window.open('list.html')
        }
        if (list) {
            list(value);
        }
    })
    $(`.keyword`).on(`click`, `a`, function () {
        if (url.indexOf(`list`) == -1) {
            $.cookie('kw', $(this).text().trim());
            window.open('list.html')
        }
        if (list) {
            list($(this).text().trim());
        }
    })
    if($.cookie('uName')){
        if ($.cookie(`uName`)=='null') {
            // $(`.headTitle1`).html(`您好！${$.cookie(`uName`)}`)
            // $(`.headTitle2`).html(`退出`).on(`click`,function () {
            //     $.cookie(`uName`,null)
            // })
            $(`.headTitle1`).html(`欢迎登陆名鞋库`).on('click',function () {
                location.href=`login.html`
            })
            $(`.headTitle2`).html(`免费注册`).on(`click`,function () {
                location.href=`register.html`
            })
        }else{
            $(`.headTitle1`).html(`您好！${$.cookie(`uName`)}`)
            $(`.headTitle2`).html(`退出`).on(`click`,function () {
                $.cookie(`uName`,null)
                location.reload()
            })
        }
    }else {
        $(`.headTitle1`).html(`欢迎登陆名鞋库`).on('click',function () {
            location.href=`login.html`
        })
        $(`.headTitle2`).html(`免费注册`).on(`click`,function () {
            location.href=`register.html`
        })
    }

    let uName = $.cookie(`uName`)
    $.ajax({
        type:'post',
        url:'../api/cart.php',
        data:{
          uname:$.cookie(`uName`)
        },
        success:str=>{
            $(`.cart span`).html(str)
        }
    })
    $(`.cart`).on(`click`,function () {
        // 
        if (uName == 'null') {
            layui.use('layer', function () {
                let layer = layui.layer;
                layer.open({
                    title: '噔噔蹬，登录后才能进入购物车'
                    , content: '是否跳转到登录页面'
                    , btn: ['给我跳', '告辞'],
                    btn1: function () {
                        location.href = `login.html`
                    },
                    closeBtn: 2,
                    anim: 4,
                });
            })
        }else {
            location.href = `cart.html`
        }
    })

})
