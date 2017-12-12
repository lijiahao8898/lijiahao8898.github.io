;(function (document, $) {
    var main = {
        init: function () {
            var middle = document.querySelector('.middle');
            var posts = document.querySelector('.posts');
            var key = 'E3BFEC8B66E084312938C21F3FFC4D4E';
            var dataId= '141585166';
            if (middle) {
                middle.style.height = window.innerHeight + 'px';
            }
            if (posts) {
                posts.style.opacity = 1;
            }
            
            // $.ajax({
            //     url: 'http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1',
            //     data: {
            //         key: key,
            //         language: 'zh'
            //     },
            //     type: 'get',
            //     dataType: 'jsonp',
            //     success: function () {
            //
            //     },
            //     error: function () {
            //
            //     }
            // });

            // $.ajax({
            //     url: 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001',
            //     data: {
            //         key: key,
            //         account_id: dataId
            //     },
            //     type: 'get',
            //     dataType: 'jsonp',
            //     success: function () {
            //
            //     },
            //     error: function () {
            //
            //     }
            // });

            // $.ajax({
            //     url: 'http://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1',
            //     type: 'get',
            //     data: {
            //         key: key,
            //         language: 'zh'
            //     },
            //     dataType: 'json',
            //     success: function () {
            //
            //     },
            //     error: function () {
            //
            //     }
            // });

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
            this.showInfo();
            this.toggle();
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
        showInfo: function () {
            var dom = document.getElementsByClassName('ci-item');

            for (var i = 0; i < dom.length; i++) {
                dom[i].addEventListener('click', function (e) {
                    var id = Number(this.getAttribute('data-id'));
                    var info = document.getElementsByClassName('information-wrapper');
                    for (var n = 0; n < dom.length; n++) {
                        info[n].style.display = 'none';
                        dom[n].className = 'ci-item';
                    }
                    info[id - 1].style.display = 'block';
                    this.className += ' ' + 'active';
                })
            }
            if (dom[0]) {
                dom[0].click()
            }
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