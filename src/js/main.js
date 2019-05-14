;(() => {
    $(`header`).load(`head.html`)
    $(`footer`).load(`foot.html`)
    $('.allType').on(`mouseenter mouseleave`, `li`, function (ev) {
        if (ev.type == `mouseenter`) {
            if ($(this).attr('class') == `navNone`) {
                $(`.nav3`).css(`display`, `none`)
            } else {
                $(`.nav3`).load(`html/nav/nav3_0${$(this).data(`id`)}.html`).css(`display`, 'block')
            }
        } else if (ev.type == `mouseleave`) {
            $(`.nav3`).css(`display`, `none`)
        }
    })
    $(`.nav3`).hover(function () {
        $(this).css(`display`, `block`)
    }, function () {
        $(this).css(`display`, `none`)
    }).on(`mouseenter mouseleave`, `a`, function (ev) {
        if (ev.type == `mouseenter`) {
            $(this).css(`text-decoration`, `underline ${$(this).css(`color`)}`)
        } else if (ev.type == `mouseleave`) {
            $(this).css(`text-decoration`, `none`)
        }
    })
    let lunBo = new Swiper('.swiper-container', {
        effect: 'fade',
        fade: {
            crossFade: false,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>'
            }
        },
        mousewheel: true
    })
    $(`.swiper-container`).hover(function () {
        lunBo.autoplay.stop()
    }, function () {
        lunBo.autoplay.start()
    })

    $.ajax({
        type: 'post',
        url: `../api/main.php`,
        success: str => {
            let arr = JSON.parse(str)
            let arr2 = []
            let tmp = arr.splice(0, 1)[0]
            arr2.push({sid: tmp.typeid, all: [tmp]})
            arr.forEach((item) => {
                let ok = false
                for (let i = 0; i < arr2.length; i++) {
                    if (item.typeid == arr2[i].sid) {
                        ok = true
                        arr2[i].all.push(item)
                        break
                    }
                }
                if (!ok) arr2.push({sid: item.typeid, all: [item]})
            })
            let arr3 = []
            for (let i = 0; i < arr2.length; i++) {
                arr3[i] = arr2[i].all.slice(0, 12)
            }
            $('.typeList').html(arr3.map((item) => {
                return `<article>
                            <article class="listTitle">
                               <img src="${item[0].typetitle}" alt="短袖">
                            </article>
                            <ul class="listMain con">
                                ${xuanRang(item)}
                            </ul>
                        </article>`
            }))

            function xuanRang(arr) {
                let res = arr.map((item) => {
                    return `<li  data-id="${item.id}">
                                     <article><img src="${JSON.parse(item.imgsrc)[0]}" alt=""></article>
                                     <p>${item.title}</p>
                                     <article>
                                         <span>￥${item.price}</span>
                                         <del>￥${(item.price * 1.2).toFixed(2)}</del>
                                         <span>立即抢购</span>
                                     </article>
                                 </li>`
                }).join(``)
                return res
            }
        }
    })
})()