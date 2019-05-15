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

                console.log(arr[0])
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
                        <li class="numble clearfix"><span>购买数量：</span><input type="button" value="-" id="sub" /><input type="number" value="1" id="sum" /><input type="button" value="+" id="add" /><b>已到达最大库存</b></li>
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
                    init(2, $(this).attr(`data-id`))
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
                    $(this).next().next().next().css(`visibility`,`hidden`)
                    $(`#sum`).val(val)
                    $(`.buyinfo span`).html(` ${val} `)
                }).on(`click`, `#add`, function () {
                    let val = $(`#sum`).val()
                    val++
                    if (val >= arr[0].stock) {
                        val = arr[0].stock
                        $(this).next().css(`visibility`,`visible`)
                    }
                    $(`#sum`).val(val)
                    $(`.buyinfo span`).html(` ${val} `)
                }).on(`input`,`#sum`,function () {
                    let val = $(this).val()
                    if (val<1){
                        val=1
                        $(this).val(1)
                        $(this).next().next().css(`visibility`,`hidden`)
                    } else if(val >= arr[0].stock){
                        val=arr[0].stock
                        $(this).val(arr[0].stock)
                        $(this).next().next().css(`visibility`,`visible`)
                    }else {
                        $(this).next().next().css(`visibility`,`hidden`)
                    }
                    $(`.buyinfo span`).html(` ${val} `)
                })
                $(`.path`).html(`您当前的位置：${arr[0].type} >> ${arr[0].brand} >> ${arr[0].title}`)
                $(`h1`).on(`click`,`a`,function () {
                    console.log(1)
                    $.cookie('kw',$(this).html().trim());
                    window.open('list.html')
                })
            }
        })
    }

    let dataId=$.cookie(`dataId`)
    init(dataId)


})()