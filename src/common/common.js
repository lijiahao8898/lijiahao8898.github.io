;(function () {
    var main = {
        init: function () {
            var middle = document.querySelector('.middle');
            var posts = document.querySelector('.posts');
            middle.style.height = window.innerHeight + 'px';
            posts.style.opacity = 1;
            console.log(middle);
            var id = document.getElementById('my-shine');
            if(id === null){
                return;
            }
            var shine = new Shine(id);
            window.addEventListener('mousemove', function(event) {
                shine.light.position.x = event.clientX;
                shine.light.position.y = event.clientY;
                shine.draw();
            }, false);
        }
    };
    main.init();
})();