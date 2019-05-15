function FenYe(listId, num) {
    this.list = $(listId)
    this.nums = num
    this.types = ``
    this.orders = ``
    // this.values = values
}

FenYe.prototype = {
    constructor: FenYe,
    init() {
        this.xuanRang(1)
    },
    xuanRang(pages) {
        $.ajax({
            type: 'get',
            url: '../api/list.php',
            data: {
                page: pages,
                num: this.nums,
                type: this.types,
                order: this.orders,
                value: this.values
            },
            success: str => {
                let arr = JSON.parse(str)
                if (arr.total == 0) {
                    this.list.html(`没有找到符合的商品`)
                    $(`#fenYeBtn`).css(`display`, `none`)
                } else {
                    this.list.html(arr.content.map((item) => {
                        let smallImg = ``
                        for (let i = 0; i < JSON.parse(item.imgsrc).length; i++) {
                            smallImg += `<img src="${JSON.parse(item.imgsrc)[i][0]}" alt="" class="small">`
                        }
                        return `<li title="${item.title}" data-id="${item.id}">
                                    <article class="listImg">
                                        <img src="${JSON.parse(item.imgsrc)[0][0]}" alt="" class="big">
                                        <article class="smallImg">
                                            ${smallImg}
                                        </article>
                                    </article>
                                    <article class="listDetails">
                                        <article>
                                            <span>￥${item.price}</span>
                                            <del>￥${(item.price * 1.2).toFixed(2)}</del>
                                        </article>
                                        <article>
                                            ${item.title}
                                        </article>
                                        <article>
                                            已售出<strong>${item.sell}</strong>件
                                        </article>
                                        <article>
                                            尺码：${item.size}
                                        </article>
                                    </article>
                                </li>`
                    }).join(``))
                    $(`.spList li`).hover(function () {
                        $(this).finish().animate({
                            backgroundColor: '#eee'
                        }, 500).find(`.listDetails`).finish().animate({
                            height: `80px`,
                            backgroundColor: '#eee'
                        }, 500)

                    }, function () {
                        $(this).finish().animate({
                            backgroundColor: '#fff'
                        }, 500).find(`.listDetails`).finish().animate({
                            height: `60px`,
                            backgroundColor: '#fff'
                        }, 500)
                    })
                    $(`.spList`).on(`click`,`li`,function () {
                        console.log($(this))
                        $.cookie('dataId',$(this).attr(`data-id`).trim())
                        window.open(`details.html`)
                    })
                    $(`#fenYeBtn`).css(`display`, `block`)
                    layui.use('laypage', function () {
                        let laypage = layui.laypage;
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'fenYeBtn',
                            count: arr.total,
                            limit: 8,
                            groups: 3,
                            curr: pages,
                            jump: function (obj, first) {
                                if (!first) {
                                    //do something
                                    fenYe.xuanRang(obj.curr)
                                }
                            }
                        });
                    });
                }
                $(`.titleL`).html(`您当前的位置：${this.values}`)
                $(`.total`).html(arr.total)
            }
        })
    },
    paiXu(type, order) {
        this.types = type
        this.orders = order
        this.init();
    },
    search(value) {
        this.values = value
        this.init();
    }
}
let fenYe = new FenYe(`.spList`, 8);
let kw = $.cookie('kw');
fenYe.search(kw)
$(`.titleL`).html(`您当前的位置：${kw}`)
$(`footer`).load(`../html/foot.html`)

function list(values) {
    fenYe.search(values)
}

let price = true
let sell = true
$(`.paiXu`).on(`click`, `.price`, function () {
    $(`.sell,.default`).css({
        background: `#ccc`,
        color: `#666`
    }).find(`use`).attr(`xlink:href`, `#icon-arrow-left-copy2`)
    if (price) {
        $(this).css({
            background: `#ff9900`,
            color: `#fff`
        }).find(`use`).attr(`xlink:href`, `#icon-arrow-left-copy2`)
        fenYe.paiXu(`price`, `desc`)
    } else {
        $(this).css({
            background: `#ff9900`,
            color: `#fff`
        }).find(`use`).attr(`xlink:href`, `#icon-jiantouarrow486`)
        fenYe.paiXu(`price`, `asc`)
    }
    price = !price
}).on(`click`, `.sell`, function () {
    $(`.price,.default`).css({
        background: `#ccc`,
        color: `#666`
    }).find(`use`).attr(`xlink:href`, `#icon-arrow-left-copy2`)
    if (sell) {
        $(this).css({
            background: `#ff9900`,
            color: `#fff`
        }).find(`use`).attr(`xlink:href`, `#icon-arrow-left-copy2`)
        fenYe.paiXu(`sell`, `desc`)
    } else {
        $(this).css({
            background: `#ff9900`,
            color: `#fff`
        }).find(`use`).attr(`xlink:href`, `#icon-jiantouarrow486`)
        fenYe.paiXu(`sell`, `asc`)
    }
    sell = !sell
}).on(`click`, `.default`, function () {
    $(`.price,.sell`).css({
        background: `#ccc`,
        color: `#666`
    }).find(`use`).attr(`xlink:href`, `#icon-arrow-left-copy2`)
    $(this).css({
        background: `#ff9900`,
        color: `#fff`
    })
    fenYe.paiXu(``, ``)
})

$(`.spList`).on(`mouseenter`, `.small`, function () {
    $(this).parent().prev().attr(`src`, `${$(this).attr(`src`)}`)
})



