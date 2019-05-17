

let xiDing = (topId) => {
    /*
    * 实现吸顶
    * 当滚动条划过距离大于本身高度时，吸顶
    * topId为吸顶栏*/
    let topp = document.querySelector(topId)
    window.onscroll = () => {
        if (window.scrollY >= topp.offsetHeight) {
            topp.style.position = `fixed`
        } else {
            topp.style.position = ``
        }
    }
}
let returnTop = (btnId, height, speed) => {
    /*
    * 实现返回顶部
    * btnId为返回顶部的按钮*
    * height为按钮滑到多少距离时出现的距离
    * speed为速度,越大越慢
    * */
    let btn = document.querySelector(btnId)
    // btn.style.visibility = `hidden`
    window.onscroll = () => {
        if (window.scrollY > height) {
            btn.style.visibility = `visible`
        } else {
            btn.style.visibility = `hidden`
        }
    }
    btn.onclick = () => {
        let timer = setInterval(() => {
            let scrollTop = window.scrollY
            scrollTop -= scrollTop / speed
            console.log(scrollTop)
            if (scrollTop <= 0) {
                scrollTop = 0
                window.scrollTo(0, 0)
                clearInterval(timer)
            } else {
                window.scrollTo(0, scrollTop)
            }
        }, 10)
        document.body.onmousewheel = () => {
            clearInterval(timer)
        }
    }

}
