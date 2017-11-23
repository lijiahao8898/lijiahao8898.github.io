;(function () {
    var main = {
        init: function () {
            var middle = document.querySelector('.middle');
            // var basic = document.querySelector('.me-basic-information');
            var posts = document.querySelector('.posts');
            middle.style.height = window.innerHeight + 'px';
            // basic.style.height = window.innerHeight/2 + 'px';
            if (posts) {
                posts.style.opacity = 1;
            }
            this.time();
            var id = document.getElementById('my-shine');
            if (id === null) {
                return;
            }
            var shine = new Shine(id);
            window.addEventListener('mousemove', function (event) {
                shine.light.position.x = event.clientX;
                shine.light.position.y = event.clientY;
                shine.draw();
            }, false);
        },
        time: function () {
            var mask = document.querySelector('.middle .mask');
            var that = this;
            that.setMaskStyle(mask);
            setInterval(function () {
                that.setMaskStyle(mask);
            }, 10000);
        },
        setMaskStyle: function (mask) {
            var date = new Date();
            var hours = date.getHours();
            if (hours >= 6 && hours <= 18) {
                // 白天
                mask.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'
            } else {
                // 黑夜
                mask.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            }
        }
    };
    main.init();
})();