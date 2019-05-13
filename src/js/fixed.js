$(`.fixed`).load(`./fixed.html`,function () {
    $(`.fixL>ul>li`).hover(function () {
        $(this).find(`.fixLTitle`).finish()
        $(this).find(`.fixLTitle`).css(`display`, `block`).animate({
            right: '37px'
        }, 500)
    }, function () {
        $(this).find(`.fixLTitle`).finish()
        $(this).find(`.fixLTitle`).css(`display`, `none`).animate({
            right: '47px'
        }, 500)
    })

    let fixLBtn = document.getElementsByClassName(`fixLBtn`)
    for (let i = 0; i < fixLBtn.length; i++) {
        fixLBtn[i].onclick = () => {
            if ($(`.fixed`).css(`right`) == `-229px`) {
                $(`.fixed`).animate({
                    right: `0px`
                }, 800)
            } else {
                if ($(`.fixR${i + 1}`).css(`visibility`) == `visible`) {
                    $(`.fixed`).animate({
                        right: `-229px`
                    }, 800)
                } else {
                    for (let j = 0; j < fixLBtn.length; j++) {
                        $(`.fixR${j + 1}`).css(`visibility`, `hidden`)
                        fixLBtn[j].style.background = `#000`
                    }
                    $(`.fixR${i + 1}`).css(`visibility`, `visible`)
                    fixLBtn[i].style.background = `#BD0000`
                }
            }
        }
    }
    returnTop(`.retTop`, 0, 10);
})
