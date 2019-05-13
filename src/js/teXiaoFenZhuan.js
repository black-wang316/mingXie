let xiaLa = (btnId, oupId) => {
    /*
    * 实现下拉
    * btnId为下拉按钮
    * oupId为输出内容*/
    let btn = document.querySelector(btnId)
    let oup = document.querySelector(oupId)
    let ok = true
    btn.onclick = (ev) => {
        ev = ev || window.event
        if (ok) {
            oup.style.display = `block`
        } else {
            oup.style.display = `none`
        }
        ok = !ok
        ev.stopPropagation()
    }
    document.onclick = (ev) => {
        if (ok === false) {
            oup.style.display = `none`
            ok = true
        }
    }
}

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
    }
}
let shouFenQin = (btnId, boxId) => {
    /*实现手风琴
    * btnId为要绑定的按钮
    * boxId为手风琴内容*/
    let btn = document.querySelectorAll(btnId)
    let box = document.querySelectorAll(boxId)
    for (let i = 0; i < btn.length; i++) {
        let ok = true
        btn[i].onclick = () => {
            if (ok) {
                box[i].style.height = `200px`
            } else {
                box[i].style.height = `0`
            }
            ok = !ok
        }
    }
}
let tangChuang = (boxMain, iw, ih) => {
    /*实现弹窗随窗口改变仍然居中
    * box为弹窗内容
    * iw为弹窗宽度
    * ih为弹窗高度*/
    let box = document.createElement(`div`)
    box.innerHTML = `<div id="tanChuang">
									<input type="button" id="close" value="关闭" />
									<p>${boxMain}</p>
								</div>
								<div id="tanChuangMark"></div>`;
    document.body.appendChild(box)
    let tanChuang = document.getElementById(`tanChuang`)
    let btn = tanChuang.querySelector(`#close`)
    let tanChuangMark = box.querySelector(`#tanChuangMark`)
    let p = box.querySelector(`p`)
    console.log(window.innerHeight)
    //设置样式
    setStyle(tanChuang, `width`, iw)
    setStyle(tanChuang, `height`, ih)
    setStyle(tanChuang, `background`, `#eee`)
    setStyle(tanChuang, `overflow`, `hidden`)
    setStyle(tanChuang, `position`, `absolute`)
    setStyle(tanChuang, `zIndex`, `999`)
    setStyle(btn, `background`, `red`)
    setStyle(btn, `color`, `white`)
    setStyle(btn, `border`, `0`)
    setStyle(btn, `float`, `right`)
    setStyle(tanChuangMark, `background`, `black`)
    setStyle(tanChuangMark, `opacity`, `0.4`)
    setStyle(tanChuangMark, `position`, `absolute`)
    setStyle(tanChuangMark, `left`, `0`)
    setStyle(tanChuangMark, `top`, `0`)
    setStyle(tanChuangMark, `zIndex`, `998`)
    setStyle(tanChuangMark, `width`, window.innerWidth + `px`)
    setStyle(tanChuangMark, `height`, window.innerHeight + `px`)
    setStyle(p, `clear`, `both`)
    setStyle(p, `textAlign`, `center`)
    //弹窗居中
    let center = () => {
        setStyle(tanChuang, `left`, (window.innerWidth - parseInt(iw)) / 2 + `px`)
        setStyle(tanChuang, `top`, (window.innerHeight - parseInt(ih)) / 2 + `px`)
    }
    center()
    window.onresize = () => {
        center()
    }
    //关闭按钮绑定事件
    tanChuang.onclick = function (ev) {
        if (ev.target.id === `close`) {
            document.body.removeChild(this.parentNode);
        }
    }
    //document点击实现弹窗闪烁
    tanChuangMark.onclick = () => {
        let count = 0
        let timer = setInterval(() => {
            count++
            tanChuang.style.display = count % 2 === 0 ? `block` : `none`
            if (count === 4) {
                clearInterval(timer)
            }
        }, 80)
    }

}
let xuanXiangka = (btnId, oupId, cls) => {
    /*实现选项卡
    * btn为选项卡按钮
    * oupId为输出内容
    * cls为btn高亮样式*/
    let btn = document.querySelector(btnId)
    let oup = document.querySelector(oupId)
    btn.onclick = (ev) => {
        ev = ev || window.event
        if (ev.target.nodeName.toLowerCase() === `p`) {
            for (let i = 0; i < btn.children.length; i++) {
                btn.children[i].classList.remove(cls)
            }
            ev.target.classList.add(cls)
            oup.innerHTML = `${ev.target.innerHTML}`
        }
    }
}

/*
* 轮播图基于面向对象封装
* boxId为轮播图盒子的#id
* activeClass为焦点获焦样式的类名
* btnColor为按钮的颜色
* auto为是否自动轮播*/
function LunBo(boxId, activeClass, btnColor,auto) {
    this.box = document.getElementById(boxId)
    this.activeClassName = activeClass
    this.btnColor = btnColor
    this.auto=auto
    this.list = this.box.firstElementChild
    this.img = this.list.children
    this.focus = this.box.children[1]
    this.btns = this.box.children[2]
    this.preBtn = this.btns.children[0]
    this.nextBtn = this.btns.children[1]
    this.imgWidth = this.img[0].offsetWidth
    this.now = 0;//储存可视窗口图片的下标
    this.html = ``

}

//初始化
LunBo.prototype.init = function () {
    this.img[0].style.left = 0
    //创建焦点并使第一个高亮
    for (let i = 0; i < this.img.length; i++) {
        this.html += `<span></span>`
    }
    this.focus.innerHTML = this.html
    this.focus.children[0].classList.add(this.activeClassName)
    //焦点绑定点击事件
    for (let i = 0; i < this.img.length; i++) {
        this.focus.children[i].onclick = () => {
            this.focusOnclick(i)
        }
    }
    //给按钮添加样式
    this.check(this.nextBtn)
    this.check(this.preBtn)
    //自动播放
    if (this.auto){
        this.autoPlay = setInterval(() => {
            this.next()
        }, 2000)
    }
    //按钮点击事件
    this.nextBtn.onclick = () => {
        this.next()
    }
    this.preBtn.onclick = () => {
        this.prev()
    }
    //盒子滑入滑出
    this.box.onmouseenter = () => {
        this.boxOnMouseEnter()
    }
    this.box.onmouseleave = () => {
        this.boxOnMouseLeave()
    }
}
//下一张
LunBo.prototype.next = function () {
    startMove(this.img[this.now], {
        'left': -this.imgWidth
    })
    this.now++
    if (this.now >= this.img.length) {
        this.now = 0
    }
    this.img[this.now].style.left = `${this.imgWidth}px`
    startMove(this.img[this.now], {
        'left': 0
    })
    this.onFocus(this)
}
//上一张
LunBo.prototype.prev = function () {
    startMove(this.img[this.now], {
        'left': this.imgWidth
    })
    this.now--
    if (this.now < 0) {
        this.now = this.img.length - 1
    }
    this.img[this.now].style.left = `${-this.imgWidth}px`
    startMove(this.img[this.now], {
        'left': 0
    })
    this.onFocus()
}
//焦点跟随
LunBo.prototype.onFocus = function () {
    for (let i = 0; i < this.img.length; i++) {
        this.focus.children[i].classList.remove(this.activeClassName)
    }
    this.focus.children[this.now].classList.add(this.activeClassName)
}
//焦点点击事件
LunBo.prototype.focusOnclick = function (i) {
    if (i > this.now) {
        // 旧图走
        startMove(this.img[this.now], {
            'left': -this.imgWidth
        })
        //新图从右进
        this.img[i].style.left = `${this.imgWidth}px`
    }
    if (i < this.now) {
        // 旧图走
        startMove(this.img[this.now], {
            'left': this.imgWidth
        })
        //新图从左进
        this.img[i].style.left = `${-this.imgWidth}px`
    }
    startMove(this.img[i], {
        'left': 0
    })
    this.now = i //将当前下标覆盖,使得onFocus能找到焦点
    this.onFocus()
}
//左右按钮轮播样式
LunBo.prototype.check = function (btnId) {
    btnId.style.backgroundColor = `#eee`
    btnId.style.color = `black`
    btnId.onmouseenter = () => {
        btnId.style.backgroundColor = this.btnColor
        btnId.style.color = `white`
    }
    btnId.onmouseleave = () => {
        btnId.style.backgroundColor = `#eee`
        btnId.style.color = `black`
    }
}
//盒子滑入滑出事件
LunBo.prototype.boxOnMouseEnter = function () {
    this.nextBtn.style.opacity = `1`
    this.preBtn.style.opacity = `1`
    if (this.auto){
        clearInterval(this.autoPlay)
    }
}
LunBo.prototype.boxOnMouseLeave = function () {
    this.nextBtn.style.opacity = `0`
    this.preBtn.style.opacity = `0`
    if (this.auto){
        this.autoPlay = setInterval(() => {
            this.next()
        }, 2000)
    }

}