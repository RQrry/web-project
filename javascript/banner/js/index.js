// 轮播图插件
// params
// bannerDom 图片区域    imgLists 图片列表    buttons 左右切换按钮
function createBanner(bannerDom, imgLists, buttons) {
  if (!imgLists || imgLists.length === 0) {
    return;
  }

  // 初始化 变量
  const WIDTH = bannerDom.offsetWidth;
  const HEIGHT = bannerDom.offsetHeight;
  const len = imgLists.length;
  let imgArea = document.createElement('div');
  let controlArea = document.createElement('div');
  let prev = document.createElement('img');
  let next = document.createElement('img');
  let curIndex = 0;
  let timer = null;
  let speed = 3000;

  // 初始化 bannerDom
  bannerDom.innerHTML = '';
  bannerDom.appendChild(imgArea);
  bannerDom.appendChild(controlArea);
  // 初始化 图片区域
  createImgArea();
  // 初始化 控制区域
  createControlArea();
  // 初始化 控制按钮
  createButton();
  // 初始化 显示第一张图片
  show(0);
  // 自动切换图片
  autoChange();
  
  // 鼠标移入停止自动切换
  imgArea.addEventListener('mouseenter', function () {
    clearInterval(timer);
    timer = null;
    prev.style.opacity = '0.4';
    next.style.opacity = '0.4';
  });
  // 鼠标移出
  imgArea.addEventListener('mouseleave', function () {
    autoChange();
    prev.style.opacity = '0';
    next.style.opacity = '0';
  });
  // 左右切换按钮
  prev.addEventListener('mouseenter', function () {
    prev.style.opacity = '0.8';
    next.style.opacity = '0.8';
  });
  prev.addEventListener('mouseleave', function () {
    prev.style.opacity = '0.4';
    next.style.opacity = '0.4';
  });
  prev.addEventListener('click', function () {
    if (curIndex === 0) {
      show(len - 1);
    } else {
      show(curIndex - 1);
    }
  });
  next.addEventListener('mouseenter', function () {
    prev.style.opacity = '0.8';
    next.style.opacity = '0.8';
  });
  next.addEventListener('mouseleave', function () {
    prev.style.opacity = '0.4';
    next.style.opacity = '0.4';
  });
  next.addEventListener('click', function () {
    if (curIndex === len - 1) {
      show(0);
    } else {
      show(curIndex + 1);
    }
  });

  // 创建图片区域
  function createImgArea() {
    imgArea.style.height = '100%';
    imgArea.style.display = 'flex';
    imgArea.style.overflow = 'hidden';
    imgArea.style.position = 'relative';
    for (let i=0; i<len; i++) {
      let img = document.createElement('img');
      img.src = imgLists[i].src;
      img.style.height = '100%';
      img.style.position = 'absolute';
      img.style.left = -100 * i;
      img.style.cursor = 'pointer';
      img.style.opacity = '0';
      img.style.zIndex = '0';
      img.style.transition = 'opacity 0.8s';
      img.addEventListener('click', function () {
        if (imgLists[i].link) {
          window.open(imgLists[i].link);
        }
      });
      imgArea.appendChild(img);
    }
  }

  // 创建控制区域
  function createControlArea() {
    controlArea.style.position = 'relative';
    controlArea.style.textAlign = 'center';
    controlArea.style.marginTop = '-30px';
    controlArea.style.zIndex = '2';
    for (let i=0; i<len; i++) {
      let span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.width = '12px';
      span.style.height = '12px';
      span.style.cursor = 'pointer';
      span.style.borderRadius = '50%';
      span.style.backgroundColor = 'lightgray';
      span.style.margin = '0 5px';
      span.addEventListener('click', function () {
        show(i);
      });
      controlArea.appendChild(span);
    }
  }

  // 创建控制按钮
  function createButton() {
    prev.src = buttons[0];
    next.src = buttons[1];
    prev.style.position = 'absolute';
    prev.style.width = '40px';
    prev.style.height = '40px';
    prev.style.left = 0;
    prev.style.top = (HEIGHT - 40) / 2 + 'px';
    prev.style.cursor = 'pointer';
    prev.style.opacity = '0';
    prev.style.zIndex = '2';
    prev.style.transition = 'opacity 0.8s';
    next.style.position = 'absolute';
    next.style.width = '40px';
    next.style.height = '40px';
    next.style.right = 0;
    next.style.top = (HEIGHT - 40) / 2 + 'px';
    next.style.cursor = 'pointer';
    next.style.opacity = '0';
    next.style.zIndex = '2';
    next.style.transition = 'opacity 0.8s';
    imgArea.appendChild(prev);
    imgArea.appendChild(next);
  }

  // 根据指定的索引切换图片
  function show(index) {
    curIndex = index;
    for (let i=0; i<len; i++) {
      const el = controlArea.children[i];
      if (i === curIndex) {
        el.style.backgroundColor = 'darkgoldenrod';
        imgArea.children[i].style.opacity = '1';
        imgArea.children[i].style.zIndex = '1';
      } else {
        el.style.backgroundColor = 'lightgray';
        imgArea.children[i].style.zIndex = '0';        
        imgArea.children[i].style.opacity = '0';
      }
    }
  }

  // 自动切换
  function autoChange() {
    if (timer) {
      return;
    }
    timer = setInterval(function () {
      if (curIndex === len - 1) {
        show(0);
      } else {
        show(curIndex + 1);
      }
    }, speed);
  }
}