var timer;
var per = 0;
timer = setInterval(function () {
    $('.bar').css('width', per+'%');
    per += 1;
    if(per > 100) {
        $('.pageLoading').addClass('complete');
        setTimeout(function () {
            $('.text').html('<h2>We<br/>are<br/>monster</h2>');
        }, 3000);
        clearInterval(timer);
    }
}, 30);