$(`.fixed`).load(`./fixed.html`, function () {
    $(`.fixL>ul>li`).hover(function () {
        $(this).find(`.fixLTitle`).finish()
        $(this).find(`.fixLTitle`).css(`display`, `block`).animate({
            right: '37px'
        }, 500)
    }, function () {
        $(this).find(`.fixLTitle`).finish()
        $(this).find(`.fixLTitle`).css(`display`, `none`).animate({
            right: '47px'
        }, 500)
    })

    let fixLBtn = document.getElementsByClassName(`fixLBtn`)
    for (let i = 0; i < fixLBtn.length; i++) {
        fixLBtn[i].onclick = () => {
            if ($(`.fixed`).css(`right`) == `-229px`) {
                $(`.fixed`).animate({
                    right: `0px`
                }, 800)
            } else {
                if ($(`.fixR${i + 1}`).css(`visibility`) == `visible`) {
                    $(`.fixed`).animate({
                        right: `-229px`
                    }, 800)
                } else {
                    for (let j = 0; j < fixLBtn.length; j++) {
                        $(`.fixR${j + 1}`).css(`visibility`, `hidden`)
                        fixLBtn[j].style.background = `#000`
                    }
                    $(`.fixR${i + 1}`).css(`visibility`, `visible`)
                    fixLBtn[i].style.background = `#BD0000`
                }
            }
        }
    }
    returnTop(`.retTop`, 0, 10);
    $(`.fixL`).on(`click`,`.goCart`,function () {
        init()
        if ($.cookie(`uName`)=='null'){
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
            // location.href = `cart.html`

        }
    })
    function init() {
        let xuanRang = new Promise(resolve => {
            $.ajax({
                type: 'post',
                url: '../api/cart.php',
                data: {
                    uname2: $.cookie(`uName`)
                },
                success: str => {
                    let arr = JSON.parse(str)
                    console.log(arr)
                    resolve(arr)
                }
            })
        })
        xuanRang.then(arr => {
            $(`.gwList`).html(arr.map((item) => {
                return ` <li class="minList" data-id="${item.id}">
                    <div>
                        <img src="${item.color}" alt="">
                    </div>
                    <div>
                        <p title="${item.title}">
                            ${item.title}${item.size}</p>
                        <span class="gwPrice">￥${item.price}</span>
                        <span class="gwNum">
                                    <span class="down">-</span>
                                    <span class="num" data-total="${item.total}">x${item.num}</span>
                                    <span class="up">+</span>
                                    <span class="del">删除</span>
                                </span>
                    </div>
                </li>`
            }).join(``))
            let arr2 = []
            let arr3 = []
            let sum = 0
            let sumPrice =0
            $(".num").each(function () {
                arr2.push($(this).html().slice(1))
                arr3.push($(this).attr(`data-total`))
                //  或者 btns[key] = $(value).val();
            })
            if (arr2.length>1){
                sum = arr2.reduce(function (total, item) {
                    return Number(total) + Number(item)
                })
            } else {
                sum=Number(arr2[0])
            }
            if (arr3.length>1){
                sumPrice = arr3.reduce(function (total, item) {
                    return Number(total) + Number(item)
                })
            } else {
                sumPrice=Number(arr3[0])
            }
            $(`.totalNum`).html(sum)
            $(`.totalPrice`).html(`￥${sumPrice.toFixed(2)}`)
            $(`.minList`).on(`click`,`.down`,function () {
                $.ajax({
                    type: 'post',
                    url:'../api/cart.php',
                    data: {
                        type:'down',
                        id:$(this).parent().parent().parent().attr(`data-id`),
                        price:$(this).parent().prev().text().slice(1)
                    },
                    success:()=>{
                        init()
                    }
                })
            }).on(`click`,`.up`,function () {
                console.log(2)
                $.ajax({
                    type: 'post',
                    url:'../api/cart.php',
                    data: {
                        type:'up',
                        id:$(this).parent().parent().parent().attr(`data-id`),
                        price:$(this).parent().prev().text().slice(1)
                    },
                    success:()=>{
                        init()
                    }
                })
            }).on(`click`,`.del`,function () {
                console.log(3)
                $.ajax({
                    type: 'post',
                    url:'../api/cart.php',
                    data: {
                        type:'del',
                        id:$(this).parent().parent().parent().attr(`data-id`)
                    },
                    success:()=>{
                        init()
                    }
                })
            })
        })
    }
    init()
})
