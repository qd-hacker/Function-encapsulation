// function bind(obj, evType, evFn) {
//     obj.handle = function () {
//         evFn.call(obj);
//     }
//     if (obj.addEventListener) {
//         // 标准浏览器走这个绑定
//         obj.addEventListener(evType, evFn, false);
//         obj.handle = evFn;
//     } else if (obj.attachEvent) {
//         //IE6 7 8 走这个绑定方式
//         obj.attachEvent("on" + evType, obj.handle);
//     } else {
//         // 以上方法都不支持的很老的浏览器 走这个方法
//         obj["on" + evType] = evFn;
//     }
// }
function bind(obj, evType, evFn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, evFn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evType, evFn);
    } else {
        obj["on" + evType] = evFn;
    }

}
(function (window) {
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    }
    Game.prototype.Start = function () {
        this.food.render(this.map);
        this.snake.render(this.map);
        runSnake(this);
        bindKey(this);
    }
    function runSnake(that) {
        var timer = setInterval(function () {
            that.snake.move(that.food, that.map);
            var headX = that.snake.body[0].x * that.snake.width;
            var headY = that.snake.body[0].y * that.snake.width;
            var maxX = that.map.offsetWidth;
            var maxY = that.map.offsetHeight;
            //头碰到身体结束游戏 
            for (var i = 4; i < that.snake.body.length - 1; i++) {
                if (headX == that.snake.body[i].x * that.snake.width && headY == that.snake.body[i].y * that.snake.width) {
                    clearInterval(timer);
                    alert("si的好！");
                    return;
                }
            }
            if (headX < 0 || headX >= maxX) {
                clearInterval(timer);
                alert("放弃吧");
                return;
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timer);
                alert("放弃吧");
                return;
            }
            that.snake.render(that.map);
        }, 200);
    }
    function bindKey(that) {
        bind(document, "keydown", function (ev) {
            ev = ev || event;
            switch (ev.keyCode) {
                case 37:
                    if (that.snake.direction != "right") {
                        that.snake.direction = "left";
                    }
                    break;
                case 39:
                    if (that.snake.direction != "left") {
                        that.snake.direction = "right";
                    }
                    break;
                case 38:
                    if (that.snake.direction != "down") {
                        that.snake.direction = "up";
                    }
                    break;
                case 40:
                    if (that.snake.direction != "up") {
                        that.snake.direction = "down";
                    }
                    break;
            }
        })
    }
    window.Game = Game;
})(window)