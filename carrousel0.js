/**
 * Created by 123 on 2016/11/22.
 */
/*
 *  获取scrollTop和scrollLeft 
 */
function scroll() {
    if(window.pageYOffset !== null){ // ie9+  和 最新浏览器
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else if(document.compatMode == 'CSS1Compat'){ // 非怪异浏览器
        return{
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return{
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

/*
 * 隐藏标签
*/
function hide(obj) {
    return obj.style.display = 'none';
}


/*
 * 显示标签
 */
function show(obj) {
    return obj.style.display = 'block';
}


/*
 * 根据id获取元素
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id): id;
}


/*
 * 获取屏幕的宽度和高度
 */
function client() {
    if(window.innerWidth){ 
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode == "CSS1Compat"){ // 
        return{
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return{
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

/*
 *  匀速动画函数
 *  
 */
function constant(obj, target, speed) {
    // 1. 清除定时器
    clearInterval(obj.timer);

    // 2. 判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;
    // 2.1 如果相等,则不走动
    if(obj.offsetLeft == target){
        dir = 0;
    }

    // 2. 设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + 'px';
        if(Math.abs(target - obj.offsetLeft) < speed){
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
            console.log(obj.offsetLeft, target);
        }
    }, 10);
}


/*
 * 动画函数
 * obj 要做动画的对象
 * json 要做动画的对象的属性的键值对
 * fn 回调函数
 */
function buffer(obj, json, fn) {
    // 3.1 清除定时器
    clearInterval(obj.timer);
    // 3.2 设置定时器
    var begin = 0, target = 0, speed = 0;
    obj.timer = setInterval(function () {
       
        var flag = true; // 记录是否清除定时器
        for(var k in json){
            // 3.2.1 求出初始值
            if('opacity' == k){ // 透明度
                begin = getCSSAttrValue(obj, k) == 0 ? 0 : parseInt(parseFloat(getCSSAttrValue(obj, k))*100) || 100;
                target = parseInt(json[k]*100);
                // console.log(begin, target);
            }else if('scrollTop' == k){ // 其他情况
                begin = obj.scrollTop;
                target = parseInt(json[k]);
                /*console.log(begin, target);*/
            }else { // 其他情况
                begin = parseInt(getCSSAttrValue(obj, k)) || 0;
                target = parseInt(json[k]);
            }
            // 3.2.2 求出步长
            speed = (target - begin) / 20;
            // 取整(向上 向下)
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);
            // 3.2.3 动起来
            if('opacity' == k){
                // 其他浏览器
                obj.style.opacity =  (begin + speed) / 100;
                // IE
                obj.style.filter = 'alpha(opacity: '+ (begin + speed) +')';
            }else if('zIndex' == k){ // 层级结构
                obj.style[k] = json[k];
            }else if('scrollTop' == k){ // 滚动
                obj.scrollTop = begin + speed;
            }else {
                obj.style[k] = begin + speed + 'px';
            }
            // 3.2.4 判断--> 只要有一个属性的动画没有到位就一定不能清除定时器
            if(target != begin){
                flag = false;
            }
        }

        // 3.3 清除定时器
        if(flag){
            clearInterval(obj.timer);
            // 判断有没有回调函数
            if(fn){
                // 只要定时器被清除了,就应该执行回调函数
                fn();
            }
        }
    }, 20);
}


/*
 *  用于获取属性的属性值
 *  obj: 对象
 *  attr: 对象的属性
 */
function getCSSAttrValue(obj, attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

/*
 * 判断浏览器
*/
function getOs() {
    var OsObject = "";
    if (isIE = navigator.userAgent.indexOf("MSIE") != -1) {
        return "MSIE";
    }
    if (isFirefox = navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    }
    if (isChrome = navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    }
    if (isSafari = navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    }
    if (isOpera = navigator.userAgent.indexOf("Opera") != -1) {
        return "Opera";
    }
}