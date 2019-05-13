;(() => {
    $(`header`).load('../html/head.html')
    $(`footer`).load(`../html/foot.html`)
    $(`.spList li`).hover(function () {
        $(this).finish().animate({
            backgroundColor:'#eee'
        },500).find(`.listDetails`).finish().animate({
            height:`80px`,
            backgroundColor:'#eee'
        },500)

    },function () {
        $(this).finish().animate({
            backgroundColor:'#fff'
        },500).find(`.listDetails`).finish().animate({
            height:`60px`,
            backgroundColor:'#fff'
        },500)
    })




})()