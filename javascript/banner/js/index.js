// 轮播图插件
function createBanner(bannerDom, imgLists) {
  if (!imgLists || imgLists.length === 0) {
    return;
  }

  // 初始化 变量
  const len = imgLists.length;
  let imgArea = document.createElement('div');
  let controlArea = document.createElement('div');

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
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        if (imgLists[i].link) {
          window.open(imgLists[i].link);
        }
      });
      imgArea.appendChild(img);
    }
  }

  // 创建控制区域
  function createControlArea() {
    controlArea.style.textAlign = 'center';
    controlArea.style.marginTop = '-30px';
    for (let i=0; i<len; i++) {
      let span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.width = '12px';
      span.style.height = '12px';
      span.style.cursor = 'pointer';
      span.style.borderRadius = '50%';
      span.style.backgroundColor = 'lightgray';
      span.style.margin = '0 5px';
      controlArea.appendChild(span);
    }
  }

  // 创建控制按钮
  function createButton() {
    let prev = document.createElement('div');
    let next = document.createElement('div');
    prev.style.position = 'absolute';
    prev.style.width = '20px';
    prev.style.height = '20px';
    prev.style.backgroundImage = ''
    next.style.position = 'absolute';
    imgArea.appendChild(prev);
    imgArea.appendChild(next);
  }
}