window.addEventListener('DOMContentLoaded', function () {
  // 窗口大小变化计时器
  let resizeTimer = null;
  // 鼠标长按计时器 
  let mouseTimer = null
  // 遮罩计时器
  let maskTimer = null;

  // 顶部导航栏图标区
  let iconCon = document.querySelector('.header-nav .icon-con');
  // 小屏幕/移动端背景
  let mobileBg = document.querySelector('.mobile-bg');
  // footer区
  let footer = document.querySelector('.footer');
  // 左下分享区
  let shareCon = document.querySelector('.footer .share-con');
  // 右下
  let rightCon = document.querySelector('.footer .right-con');
  // 表示顶部菜单是否打开
  let isOpen = false;


  // 遮罩层跟随鼠标移动
  let mainContainer = document.querySelector('#main-container');
  document.body.addEventListener('mousemove', function (event) {
    // console.log(event);
    let posX = event.clientX;
    let posY = event.clientY;

    let mask = document.querySelector('#mask_circle circle');
    // console.log('x', posX, 'y', posY)
    // let time = (posX - mask.getAttribute('cx')) > 500 ? 200 : 300;
    setTimeout(() => {
      mask.setAttribute('cx', posX);
      mask.setAttribute('cy', posY)
    }, 300)
    // maskMove(mask, {'cx':posX, 'cy':posY},5)
    // console.log('cx',mask.getAttribute('cx'))
  })


  // 长按遮罩动态效果
  document.body.addEventListener('mousedown', function () {
    let time1 = Date.now();
    // 根据时间间隔判断是否为长按
    mouseTimer = setInterval(function () {
      let time2 = Date.now();
      if (time2 - time1 > 700) {
        clearInterval(mouseTimer);

        // 遮罩半径扩散
        let mask = document.querySelector('#mask_circle circle');
        maskTimer = setInterval(() => {
          let r = +mask.getAttribute('r');
          r = r > 500 ? r + 60 : r + 20;
          // r += 20;
          mask.setAttribute('r', r);
          if (r >= document.body.clientWidth) {
            clearInterval(maskTimer);
          }
        }, 30)
      }
    }, 100)
  })
  document.body.addEventListener('mouseup', function () {
    clearInterval(mouseTimer);
    clearInterval(maskTimer);
    // 遮罩半径收缩
    let mask = document.querySelector('#mask_circle circle');
    maskTimer = setInterval(() => {
      let r = +mask.getAttribute('r');
      r = r < 600 ? r - 20 : r - 30;
      // r -= 20;
      r = r > 150 ? r : 150
      mask.setAttribute('r', r);
      if (r <= 150) {
        clearInterval(maskTimer);
      }
    }, 20)
  })

  // 窗口大小变化时
  window.addEventListener('resize', () => {
    clearInterval(resizeTimer);
    let video = document.querySelector('.video-con');
    video.pause();
    resizeTimer = setTimeout(function () {
      // 此函数会在resize结束的时候执行
      video.play();
    }, 300);
    let body = document.body;
    // console.log(document.body.offsetWidth)
    let ul = document.querySelector('.header .nav-menu');
    // 下方footer中两边内容不显示
    if (body.offsetWidth <= 800 && mobileBg.offsetHeight == 0) {
      shareCon.style.display = 'none';
      rightCon.style.display = 'none';
    } else {
      shareCon.style.display = 'flex';
      rightCon.style.display = 'flex';
    }

    // 顶部菜单栏变化
    if (body.offsetWidth <= 820) {
      ul.style.display = 'none';
      iconCon.style.display = 'block';
      if (mobileBg.clientHeight != 0) {
        ul.style.display = 'flex';
        ul.classList.add('mobile-ver');
      }
      if (isOpen) {
        iconCon.click();
        isOpen = false;
      }
    } else {
      ul.style.display = 'block';
      iconCon.style.display = 'none';
      if (ul.classList.contains('mobile-ver')) {
        iconCon.click();
        isOpen = true;
      }
    }
  })

  // 右上角关闭/打开导航栏区域
  iconCon.addEventListener('click', function () {
    let tar = iconCon.parentElement.querySelector('.nav-menu');
    let spans = iconCon.getElementsByTagName('span');
    let footerMiddle = document.querySelector('.footer .middle-con');
    spans = [].slice.call(spans)

    // 已经打开时，点击关闭
    if (tar.classList.contains('mobile-ver')) {
      tar.classList.remove('mobile-ver');
      tar.style.display = 'none';
      mobileBg.style.height = 0;
      footerMiddle.classList.remove('no-show');
      // mobileBg.style.display = 'none';
      // 关闭按钮变为更多按钮
      spans[0].classList.remove('cross1');
      spans[1].classList.remove('no-show');
      spans[2].classList.remove('cross2');
      spans.map(item => item.classList.add('line'));

      footer.classList.remove('mobile-ver');
      shareCon.style.display = 'none';
      rightCon.style.display = 'none';
      isOpen = false;
    } else {
      // 没有关闭时，点击打开
      // mobileBg.style.display = 'block';
      mobileBg.style.height = '100%';
      footerMiddle.classList.add('no-show');
      tar.classList.add('mobile-ver');
      tar.style.display = 'flex';
      spans.map(item => item.classList.remove('line'));
      // 更多按钮变为关闭
      spans[0].classList.add('cross1');
      spans[1].classList.add('no-show');
      spans[2].classList.add('cross2');

      footer.classList.add('mobile-ver');
      setTimeout(() => {
        shareCon.style.display = 'flex';
        rightCon.style.display = 'flex';
      }, 150)
    }
  })

  // 触发窗口resize的函数
  function diyWindowResize() {
    if (document.createEvent) {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", true, true);
      window.dispatchEvent(event);
    } else if (document.createEventObject) {
      window.fireEvent("onresize");
    }
  }
  diyWindowResize();
})
