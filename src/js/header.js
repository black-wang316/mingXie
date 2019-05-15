$(`header`).load('../html/head.html', function () {
    let url = window.location.href
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
})
