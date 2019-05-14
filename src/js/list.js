;(() => {
    $(`header`).load('../html/head.html')
    $(`footer`).load(`../html/foot.html`)
    function FenYe(listId, num) {
        this.list = $(listId)
        this.nums = num
        this.types = ``
        this.orders = ``
        this.values = ``
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
                    console.log(arr)
                    this.list.html(arr.content.map((item) => {
                        return `<li title="${item.title}">
                                    <article class="listImg">
                                        <img src="${JSON.parse(item.imgsrc)[0]}" alt="">
                                        <article class="smallImg">
                                            <img src="${JSON.parse(item.imgsrc)[0]}" alt="">
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
                    $(`.pagination`).jqPagination({
                        max_page:Math.ceil(arr.total/this.nums)
                    })
                }
            })
        }
    }
    let fenYe = new FenYe(`.spList`, 8)
    fenYe.init()
    $(`.pagination`).jqPagination({
        paged: function (page) {
            fenYe.xuanRang(page)
        }
    })


})()