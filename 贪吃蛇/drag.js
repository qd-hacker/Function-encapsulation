(function(window){
    	function Drag(id){
        this.ele = document.getElementById(id);
        this.disX = 0;
        this.disY = 0;
        this.fnDown();
    }	
   Drag.prototype.fnDown = function(){
       var that = this;
       this.ele.onmousedown = function(e){
           //当鼠标按下
           e = e || event;
        //获取固定距离
           that.disX = e.clientX - this.offsetLeft;
           that.disY  = e.clientY - this.offsetTop;
        //给鼠标添加一个移动事件
        document.onmousemove = function(e){
              that.fnMove(e);
           }
        document.onmouseup = that.fnUp;
       }
       return false;
   }
  // 给构造函数的原型上添加一个移动方法 
Drag.prototype.fnMove = function(e){
    e = e || event;
this.ele.style.left = e.clientX - this.disX + "px";
this.ele.style.top = e.clientY - this.disY + "px";
}
Drag.prototype.fnUp = function(){
    document.onmousemove = null;
}
window.Drag = Drag;
})(window);