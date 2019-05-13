;(() => {
    $(`footer`).load(`html/foot.html`)
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


})()