;(() => {
    $(`header`).load(`headWithoutSearch.html`)
    $(`footer`).load(`foot.html`)

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
                    resolve(arr)
                }
            })
        })
        xuanRang.then(arr => {
            console.log(arr)
            $(`.list`).html(arr.map((item) => {
                return `<ul class="minList" data-id="${item.id}">
                            <li>
                                <figure>
                                    <img src="${item.color}" alt="">
                                    <figcaption>
                                        <a href="###">${item.title}</a>
                                        <p>( 尺码:${item.size})</p>
                                    </figcaption>
                                </figure>
                            </li>
                            <li>￥${item.price}</li>
                            <li>
                                <p class="down">-</p>
                                <input type="text" value="${item.num}" class="num">
                                <p class="up">+</p>
                            </li>
                            <li>
                                -${(item.price * item.num * 1.2 - item.total).toFixed(2)}
                            </li>
                            <li class="totals">￥${item.total}</li>
                            <li>
                                <span class="del">删除</span>
                            </li>
                        </ul>`
            }).join(``))
            let arr2 = []
            let arr3 = []
            let sum = 0
            let sumPrice =0
            $(".num").each(function () {
                arr2.push($(this).val())
                //  或者 btns[key] = $(value).val();
            })
            $(".totals").each(function () {
                arr3.push($(this).text().slice(1))
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
                console.log(arr3)
                sumPrice=Number(arr3[0])
            }
            $(`.totalNum`).find(`span`).html(sum)
            $(`.totalPrice`).find(`span`).html(`￥${sumPrice.toFixed(2)}`)
            $(`.minList`).on(`click`,`.down`,function () {
                $.ajax({
                    type: 'post',
                    url:'../api/cart.php',
                    data: {
                        type:'down',
                        id:$(this).parent().parent().attr(`data-id`),
                        price:$(this).parent().prev().text().slice(1),
                    },
                    success:()=>{
                        init()
                    }
                })
            }).on(`click`,`.up`,function () {
                $.ajax({
                    type: 'post',
                    url:'../api/cart.php',
                    data: {
                        type:'up',
                        id:$(this).parent().parent().attr(`data-id`),
                        price:$(this).parent().prev().text().slice(1),
                    },
                    success:()=>{
                        init()
                    }
                })
            }).on(`click`,`.del`,function () {
                $.ajax({
                    type: 'post',
                    url:'../api/cart.php',
                    data: {
                        type:'del',
                        id:$(this).parent().parent().attr(`data-id`)
                    },
                    success:()=>{
                        init()
                    }
                })
            }).on(`blur`,`.num`,function () {
                // console.log($(this).val())
                $.ajax({
                    type: 'post',
                    url:'../api/cart.php',
                    data: {
                        type:'blur',
                        id:$(this).parent().parent().attr(`data-id`),
                        price:$(this).parent().prev().text().slice(1),
                        numInp:$(this).val().trim()
                    },
                    success:()=>{
                        init()
                    }
                })
            })
        })
    }
    init()
    $(`.retShop`).on(`click`,function () {
        location.href=$.cookie(`urlNow`)
    })
})()