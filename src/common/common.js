;(function (document, $) {
    var main = {
        init: function () {
            var middle = document.querySelector('.middle');
            var posts = document.querySelector('.posts');
            if (middle) {
                middle.style.height = window.innerHeight + 'px';
            }
            if (posts) {
                posts.style.opacity = 1;
            }

            var active = $('.sidebar-nav-item.active');
            active.parents('.category').addClass('active');
            active.parents('.category').find('ul').delay(0).slideDown();
            $('.category').click(function () {
                if(!$(this).hasClass('active')){
                    $('.category').removeClass('active');
                    $(this).addClass('active');
                    $(this).find('ul').delay(0).slideDown();
                }else{
                    $('.category').removeClass('active');
                    $(this).find('ul').delay(0).slideUp();
                }
            });
            this.toggle();
            this.time();
        },
        toggle: function () {
            var toggle = document.querySelector('.sidebar-toggle');
            var sidebar = document.querySelector('#sidebar');
            var checkbox = document.querySelector('#sidebar-checkbox');

            document.addEventListener('click', function (e) {
                var target = e.target;

                if (!checkbox.checked || sidebar.contains(target) || (target === checkbox || target === toggle)) return;
                checkbox.checked = false;
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
            if (!mask) {
                return;
            }
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
})(document, jQuery);