(function (window) {
    var oldFood = [];
    function Food(width, height, color, x, y) {
        this.width = width || 20;
        this.height = height || 20;
        this.x = x || 0;
        this.y = y || 0;
        this.color = color || "green";
    }
    Food.prototype.render = function (map) {
        if (oldFood[0]) {
            remove();
        }
        this.border =(Math.round(Math.random()*20))+"px "+(Math.round(Math.random()*20))+"px "+(Math.round(Math.random()*20))+"px "+(Math.round(Math.random()*20))+"px";
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        var oDiv = document.createElement("div");
        oDiv.style.width = this.width + "px";
        oDiv.style.height = this.height + "px";
        oDiv.style.left = this.x + "px";
        oDiv.style.top = this.y + "px";
        oDiv.style.position = "absolute";
        oDiv.style.borderRadius =this.border;
        this.color = "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
        // oDiv.style.backgroundColor = this.color;
        oDiv.style.background = this.color;
        map.appendChild(oDiv);
        oldFood.push(oDiv);
    }
            function remove() {
                oldFood[0].parentNode.removeChild(oldFood[0]);
                oldFood.splice(0, 1);
            }
            window.Food = Food;
        })(window);