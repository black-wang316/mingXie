;(() => {
    $(`footer`).load(`../html/foot.html`)

    function init(dataId, colors = 0) {
        $.ajax({
            type: 'post',
            url: '../api/details.php',
            data: {
                id: dataId
            },
            success: str => {
                let arr = JSON.parse(str)
                let img = JSON.parse(arr[0].imgsrc)
                let sizes = JSON.parse(arr[0].size)

                $(`.details`).html(arr.map((item) => {
                    return `        <div class="goods-introduce clearfix">
            <div class="goods-introduce-left">
                <div class="goods-img">
                    <img src="${img[colors][0]}" alt="" />
                </div>
                <div class="goods-smallImg clearfix">
                    <ul>
                        ${smallImg()}
                    </ul>
                </div>
                <div class="shareLink clearfix">
                    <span>分享到：</span>
                    <a href="" style="background-position: 0 -64px;"></a>
                    <a href="" style="background-position: 0 -19px;"></a>
                    <a href="" style="background-position: 0 3px;"></a>
                    <a href="" style="background-position: 0 -41px;"></a>
                    <a href="" style="background-position: 0 -103px;"></a>
                    <a href="" style="background-position: 0 2px;"></a>
                </div>
            </div>
            <div class="goods-introduce-right">
                <h1 class="clearfix"><i>${item.title}</i><span>更多<a href="###">${item.brand}</a></span></h1>
                <div class="goods-info">
                    <div class="price">吊牌价：<span style="text-decoration: line-through;">￥${(item.price * 1.2).toFixed(2)}</span></div>
                    <div class="realprice">销售价：<span>￥${item.price}</span>(7.4折) 立省 ：￥${((item.price * 1.2).toFixed(2) - item.price).toFixed(2)}</div>
                    <div class="comment">好评度：<i></i><span>(已有0人评论)</span></div>
                    <div class="carriage">运费：名鞋库会员满399包邮 ( 不包括货到付款 )</div>
                </div>
                <div class="promotion">
                    <span>促销信息</span><span>满299减10 599减20 999减50  限购3件</span>
                </div>
                <div class="sizetable">
                    <ul>
                        <li class="size clearfix"><span>尺码：</span>${size()}</li>
                        <li class="color clearfix"><span>颜色：</span>${color()}</li>
                        <li class="numble clearfix"><span>购买数量：</span><input type="button" value="-" id="sub" /><input type="number" value="1" id="sum" oninput="this.value=this.value.replace(/\\D/g,'')"  /><input type="button" value="+" id="add" /><b>已到达最大库存</b></li>
                    </ul>
                    <div class="collect">
                        <a href=""></a>
                    </div>
                    <div class="size-translation">
                        <a href=""></a>
                    </div>
                </div>
                <div class="buygoods">
                    <div class="buyinfo">
                        您将购买<span style="color: #cc0000;"> 1 </span>件
                        <i style="color:#cc0000;">  </i>
                    </div>
                    <input type="button" name="" id="" value="" />
                    <input type="button" name="" id="addCart" value="" />
                </div>
                <div class="safe">
                    <span>名鞋库保障：</span>
                    <img src="../img/zheng.png" alt="" />
                    <i>正品认证</i>
                    <img src="../img/tui.png" alt="" />
                    <i>自由退货</i>
                    <img src="../img/mian.png" alt="" />
                    <i>全场满399免邮</i>
                </div>
            </div>
            <!--<div class="bigImgArea">-->
                <!--<img src="../img/xxx/xxx22_1.jpg" />-->
            <!--</div>-->
        </div>
    `
                }).join(``))

                function color() {
                    let colorHtml = ``
                    for (let i = 0; i < img.length; i++) {
                        colorHtml += `<a href="javascript:;" data-id="${i}"><img src="${img[i][0]}" alt=""><i></i></a>`
                    }
                    return colorHtml
                }

                function size() {
                    let sizeHtml = ``
                    for (let i = 0; i < sizes.length; i++) {
                        sizeHtml += `<a href="javascript:;">${sizes[i]}<i></i></a>`
                    }
                    return sizeHtml
                }

                function smallImg() {
                    let html = ``
                    for (let i = 0; i < img[colors].length; i++) {
                        html += ` <li><div class="uparrow"></div><a href="javascript:;" class="active"><img src="${img[colors][i]}" alt="" /></a></li>`
                    }
                    return html
                }

                $(`.color`).find(`a`).eq(colors).addClass(`active`).find(`i`).css(`display`, `block`)
                $(`.size`).on(`click`, `a`, function () {
                    $(this).siblings().removeClass(`active`).find(`i`).css(`display`, `none`)
                    $(this).addClass(`active`).find(`i`).css(`display`, `block`)
                })
                $(`.color`).on(`click`, `a`, function () {
                    init($.cookie(`dataId`), $(this).attr(`data-id`))
                })
                $(`.goods-smallImg`).on(`mouseenter`, `li`, function () {
                    $(`.goods-img img`).attr(`src`, `${$(this).find(`img`).attr(`src`)}`)
                })
                $(`.numble`).on(`click`, `#sub`, function () {
                    let val = $(`#sum`).val()
                    val--
                    if (val < 1) {
                        val = 1
                    }
                    $(this).next().next().next().css(`visibility`, `hidden`)
                    $(`#sum`).val(val)
                    $(`.buyinfo span`).html(` ${val} `)
                }).on(`click`, `#add`, function () {
                    let val = $(`#sum`).val()
                    val++
                    if (val >= arr[0].stock) {
                        val = arr[0].stock
                        $(this).next().css(`visibility`, `visible`)
                    }
                    $(`#sum`).val(val)
                    $(`.buyinfo span`).html(` ${val} `)
                }).on(`input`, `#sum`, function () {
                    let val = $(this).val()
                    if (val < 1) {
                        val = 1
                        $(this).val(1)
                        $(this).next().next().css(`visibility`, `hidden`)
                    } else if (val >= arr[0].stock) {
                        val = arr[0].stock
                        $(this).val(arr[0].stock)
                        $(this).next().next().css(`visibility`, `visible`)
                    } else {
                        $(this).next().next().css(`visibility`, `hidden`)
                    }
                    $(`.buyinfo span`).html(` ${$(this).val()} `)
                })
                $(`.path`).html(`您当前的位置：${arr[0].type} >> ${arr[0].brand} >> ${arr[0].title}`)
                $(`h1`).on(`click`, `a`, function () {
                    $.cookie('kw', $(this).html().trim());
                    window.open('list.html')
                })
                $(`#addCart`).on(`click`,function () {
                        if($(`.size`).find(`a`).hasClass(`active`)){
                            let size=$(`.size`).find(`.active`).text()
                            let color = $(`.color`).find(`.active`).find(`img`).attr(`src`)
                            let joinCart = new Promise(resolve => {
                                $.ajax({
                                  type:'post',
                                  url:'../api/cart.php',
                                  data:{
                                      sid:$.cookie(`dataId`),
                                      size:size,
                                      color:color,
                                      num:$(`#sum`).val().trim(),
                                      uname:$.cookie(`uName`)
                                  },
                                   success:str=>{
                                        resolve(str)
                                   }
                                })
                            })
                            joinCart.then(str=>{
                                let arr = JSON.parse(str)
                                layui.use('layer', function () {
                                    let layer = layui.layer;
                                    layer.msg(arr.msg, {icon: 1, time: 800, anim: 2});
                                })
                                $(`body`).find(`.cart`).find(`span`).html(arr.totalNum)
                            })
                        }else {
                            layui.use('layer', function () {
                                let layer = layui.layer;
                                layer.msg('请选择码数', {icon: 2, time: 800, anim: 2});
                            })
                        }

                })

            }
        })
    }

    let dataId = $.cookie(`dataId`)
    let uName = $.cookie(`uName`)
    init(dataId)
    $(`.pingLunInp`).on(`click`, `span`, function (ev) {
        $(this).find(`i`).css(`width`, `${ev.offsetX}px`)
    })
    //点击评论
    $(`.pingLunBtn`).on(`click`, function () {
        if (uName == 'null') {
            layui.use('layer', function () {
                let layer = layui.layer;
                layer.open({
                    title: '噔噔蹬，登录后再评论大兄弟'
                    , content: '是否跳转到登录页面'
                    , btn: ['给我跳', '告辞'],
                    btn1: function () {
                        location.href = `login.html`
                    },
                    closeBtn: 2,
                    anim: 4,
                });
            })
        } else {
            if ($(`.pingLunInp`).find(`textarea`).val().trim()) {
                $.ajax({
                    type: 'post',
                    url: '../api/pingLun.php',
                    data: {
                        sid: dataId,
                        uname: uName,
                        content: filter($(`.pingLunInp`).find(`textarea`).val().trim()),
                        star: $(`.pingLunInp`).find(`i`).css(`width`)
                    },
                    success: str => {
                        layui.use('layer', function () {
                            let layer = layui.layer;
                            layer.open({
                                content: str
                                , btn: 'ojbk',
                                closeBtn: 2,
                                anim: 1,
                            });
                        })
                        $(`.pingLunInp`).find(`textarea`).val(``).focus()
                        $(`.pingLunInp`).find(`i`).css(`width`, `0`)
                        pingLunXr(dataId, uName)
                    }
                })
            } else {
                layui.use('layer', function () {
                    let layer = layui.layer;
                    layer.open({
                        content: '请填写评论再提交'
                        , btn: 'ojbk',
                        closeBtn: 2,
                        anim: 6,
                    });
                })
            }
        }
    })

    //评论渲染
    function pingLunXr(dataId, uName) {
        let xuanRnag = new Promise(function (resolve) {

            $.ajax({
                type: 'post',
                url: '../api/pingLun.php',
                data: {
                    sid: dataId,
                    uname: uName
                },
                success: str => {
                    let arr = JSON.parse(str)
                    resolve(arr)

                }
            })

        })
        xuanRnag.then((arr) => {
            $(`.star`).find(`b`).html(arr.length)
            $(`.pingLunCheck`).find(`span`).html(arr.length)
            $(`.pingLunList`).html(arr.map((item) => {
                return `<li data-id="${item.id}">
                               <ul>
                                   <li>
                                       <img src="../img/vipHead.png" alt="">
                                   </li>
                                   <li>${item.uname}</li>
                                   <li>注册会员</li>
                               </ul>
                               <ul>
                                    <li>
                                        <div>商品评分 <span><i style="width: ${item.star}"></i></span></div>
                                        <div>评论时间：${item.dateline}</div>
                                    </li>
                                    <li>
                                        ${item.content}
                                    </li>
                                    <li class="clearfix">
                                        <p class="zan">有用(<b>${item.zan}</b>)</p>
                                    </li>
                               </ul>
                           </li>`
            }).join(``)).on(`click`, `.zan`, function () {
                let zan = $(this).find(`b`).html()
                let id = $(this).parent().parent().parent().attr(`data-id`)
                zan++
                let dianZan = new Promise((resolve) => {
                    $.ajax({
                        type: 'post',
                        url: '../api/pingLun.php',
                        data: {
                            zan: zan,
                            id: id
                        },
                        success: str => {
                            resolve(str)
                        }
                    })
                })
                dianZan.then((str) => {
                    layui.use('layer', function () {
                        let layer = layui.layer;
                        layer.msg(str, {icon: 6, time: 800, anim: 2});
                    })
                    $(this).find(`b`).html(zan)
                })
            })

        })
    }

    pingLunXr(dataId, uName)
})()