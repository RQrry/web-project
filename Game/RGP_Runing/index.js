var img = document.getElementsByTagName("img")[0];
var ul = document.getElementsByTagName("ul")[0];
var timer = null;
var count = 0;
var speed = 10;
var key = true;
var stopImg = "down";
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

ul.addEventListener("click", function (e) {
    e = e || window.event;
    // key = false;
    clearInterval(timer);
    var url = e.target.getAttribute("data-value");console.log(url)
    if (url === "stop") {
        img.src = "img/" + stopImg + "-0" + ".png";
        clearInterval(timer);
        return;
    }
    if (url) {
        clearInterval(timer);
        timer = setInterval(function () {
            count++;
            img.src = "img/" + url + "-" + count + ".png";
            count = count % 4;
            switch (url) {
                case "lu":
                    img.style.left = img.offsetLeft - speed / 1.414 + "px";
                    img.style.top = img.offsetTop - speed / 1.414 + "px";
                    break;
                case "up":
                    img.style.top = img.offsetTop - speed + "px";
                    break;
                case "ru":
                    img.style.left = img.offsetLeft + speed / 1.414 + "px";
                    img.style.top = img.offsetTop - speed / 1.414 + "px";
                    break;
                case "left":
                    img.style.left = img.offsetLeft - speed + "px";
                    break;
                case "right":
                    img.style.left = img.offsetLeft + speed + "px";
                    break;
                case "ld":
                    img.style.left = img.offsetLeft - speed / 1.414 + "px";
                    img.style.top = img.offsetTop + speed / 1.414 + "px";
                    break;
                case "down":
                    img.style.top = img.offsetTop + speed + "px";
                    break;
                case "rd":
                    img.style.left = img.offsetLeft + speed / 1.414 + "px";
                    img.style.top = img.offsetTop + speed / 1.414 + "px";
                    break;
            }
            stopImg = url;
        }, 100);
    }
});

// document.addEventListener("keydown", function (e) {
//     e = e || window.event;
//     if (key) {
//         timer = setInterval(function () {
//             key = false;
//             count++;
//             switch (e.keyCode) {
//                 case 38: // up
//                     img.src = "img/up-" + count + ".png";
//                     img.style.top = img.offsetTop - speed + "px";
//                     break;
//                 case 40: // down
//                     img.src = "img/down-" + count + ".png";
//                     img.style.top = img.offsetTop + speed + "px";
//                     break;
//                 case 37: // left
//                     img.src = "img/left-" + count + ".png";
//                     img.style.left = img.offsetLeft - speed + "px";
//                     break;
//                 case 39: // right
//                     img.src = "img/right-" + count + ".png";
//                     img.style.left = img.offsetLeft + speed + "px";
//                     break;
//             }
//             count = count % 4;
//         }, 100);
//     }
// });

// document.addEventListener("keyup", function (e) {
//     e = e || window.event;
//     clearInterval(timer);
//     key = true;
//     switch (e.keyCode) {
//         case 38: // up
//             img.src = "img/up-0.png";
//             break;
//         case 40: // down
//             img.src = "img/down-0.png";
//             break;
//         case 37: // left
//             img.src = "img/left-0.png";
//             break;
//         case 39: // right
//             img.src = "img/right-0.png";
//             break;
//     }
// });