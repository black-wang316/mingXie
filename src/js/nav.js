$(`nav`).load(`./nav.html`, function () {
    $('.allType').on(`mouseenter mouseleave`, `li`, function (ev) {
        if (ev.type == `mouseenter`) {
            if ($(this).attr('class') == `navNone`) {
                $(`.nav3`).css(`display`, `none`)
            } else {
                $(`.nav3`).load(`./nav/nav3_${$(this).data(`id`)}.html`).css(`display`, 'block')
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
    $(this).on('click',`a`,function () {
        $.cookie('kw', $(this).text().trim());
        window.open('list.html')
    })
    // console.log($(`a`).text())
})