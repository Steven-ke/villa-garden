var commomjs = document.querySelector('#commomjs');

require(commomjs);

function require(obj){

    var comSrc = obj.src;

    //找最后一个 / 位置
    var index = comSrc.lastIndexOf('/');
    var _dir = comSrc.slice(0,index+1)+'tween.js';

    var script = document.createElement('script');
    script.src = _dir;

    obj.parentNode.insertBefore(script,obj);
}


/*
* 获取css属性方法
* */
function getStyle(){

    var obj = arguments[0];
    var arr = arguments.length>2?{}:'';

    if(typeof arr=='string'){
        arr = !obj.currentStyle?getComputedStyle(obj)[arguments[1]]:obj.currentStyle[arguments[1]];
    }else{
        for(var i=1;i<arguments.length;i++){
            //arr.height = '';
            arr[arguments[i]] = !obj.currentStyle?getComputedStyle(obj)[arguments[i]]:obj.currentStyle[arguments[i]];
        }
    }



    return arr;
}

/*
* 获取元素集合
* */
function $(str){

    var dom;//储存找到的元素

    if(str.charAt(0)=='.'){
        dom = document.getElementsByClassName(str.slice(1));

    }else if(str.charAt(0)=='#'){
        dom = document.getElementById(str.slice(1));
    }else{
        dom = document.getElementsByTagName(str);
    }

    return dom;//把获取到的元素给到需要用的人
}


//封装move
function move(obj,attr,speed,end,callBack){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var attrVal = parseFloat(getStyle(obj,attr));

        var s = attrVal+speed;//下一帧的位置


        if(speed<0){
            if(s<=end){
                s=end;
                clearInterval(obj.timer);
            }
        }

        if(speed>0){
            if(s>=end){
                s=end;
                clearInterval(obj.timer);
            }
        }


        obj.style[attr] = s +'px';


//            if(s==end){
//                if(callBack){
//                    callBack();
//                }
//               callBack&&callBack();
//            }

        if(s==end&&callBack){
            //如果到达了目标点，并且有回调函数的情况就执行；
            callBack();
        }

    },30);
}



//MTween 时间版的运动函数
/*function  MTween(obj,attr,begin,end,duration,unit,way,callBack){



    if(obj.isAnim) return;

    //obj开始运动了  自定义属性
    obj.isAnim = true;

    if(!way){ //如果用户没有选择运动方式就默认匀速
        way = 'linear';
    }

    if(!unit){ //如果用户没有传入单位，默认为空
        unit = '';
    }

    // console.log(getStyle(obj,'transform'));

    var start = parseFloat(begin)||parseFloat(getStyle(obj,attr))||0;//起始位置  如果begin未传值，那就就尝试获取传入的属性值，如果属性值获取失败，就默认为0
//        console.log(start);
//        var end = 1000;//目标点
//        var duration = 1000;//动画执行的总时间 单位是毫秒
    var startTime = Date.now();

    var s = end - start; //总路程

//        var v = s/duration; //计算出来的速度


    //每次20ms走一帧
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        // console.log(attr);

        var endTime = Date.now();

        //计算出当前时间
        var t = endTime-startTime;

        if(t>=duration){
            t = duration;
            clearInterval(timer);//到达目标点要清除定时器
        }
//            console.log(t,start,s,duration);
//            console.log(Tween[way](t,start,s,duration));

        obj.style[attr] = Tween[way](t,start,s,duration)+unit;

        //透明度的兼容处理
        if(attr=='opacity'){
            obj.style.filter = 'Alpha(opacity='+Tween[way](t,start,s,duration)*100+')';
        }

        //如果是transform的情况
        //transform.scale  ==> ['transform','scale']

        var attr1 = attr.split('.');

        // console.log(attr1);

        if(attr1.length>1&&attr1[0]=='transform'){
            //js设置transform的方式：
            // obj.style.tranform = 'scale(n)';
            // console.log(1);
            if(attr1[1]=='scale'){
                obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,start,s,duration)+')';
            }else if(attr1[1]=='rotateZ'){
                obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,start,s,duration)+'deg)';
            }

        }




        if(t==duration){
            obj.isAnim = false;
            //等到上一个动画完成 然后再调用
            if(callBack){
                callBack();
            }
        }


    },20);
}*/

//MTween 时间版的运动函数
function  MTween(opt){

    //end   unit  begin

    var option = {
        obj:'',
        begins:{},
        attrs:{},
        duration:0,
        way:'linear',
        callBack:function(){}
    };

    //用传入的参数覆盖默认值
    for(var key in option){
        if(opt[key]){
            option[key] = opt[key];
        }
    }

    // console.log(option);

    //为了不再修改下面更多的代码，在这里做一次变量的适配
    var obj = option.obj;
    var attrs = option.attrs;
    var duration = option.duration;
    var way = option.way;
    var callBack = option.callBack;
    var begins = option.begins;

//        console.log(Tween[way],way,option.way);
//
//        return;

    if(obj.isAnim) return;

    //obj开始运动了  自定义属性
    obj.isAnim = true;


    var starts = {};

    //获取传入属性的开始位置
    for(var key in attrs){
//            console.log(key);
        starts[key] = parseFloat(begins[key])||parseFloat(getStyle(obj,key))||0;
    }

    // console.log(starts);

    //对应的单位
    var uintes = {};
    for(var key in attrs){
//            console.log(attrs[key]);
        //不是字符串的直接跳出
        if(typeof attrs[key]!='string') continue;

        var num = parseFloat(attrs[key]);
        var arr = attrs[key].split(num);
//            console.log(arr);
        uintes[key] = arr[1];
    }

    // console.log(uintes);

//        var start = parseFloat(begin)||parseFloat(getStyle(obj,attr))||0;//起始位置  如果begin未传值，那就就尝试获取传入的属性值，如果属性值获取失败，就默认为0
//        console.log(start);
//        var end = 1000;//目标点
//        var duration = 1000;//动画执行的总时间 单位是毫秒
    var startTime = Date.now();

    //所有的属性的总路程
    var allS = {};
    for(var key in attrs){
        if(key=='transform.scale'){
            console.log(attrs[key]);
        }
        allS[key] = parseFloat(attrs[key])-starts[key]||0;
    }

    // console.log(allS);
//        var s = end - start; //总路程

//        var v = s/duration; //计算出来的速度


    //每次20ms走一帧
    // console.log(timer);
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        // console.log(attr);

        var endTime = Date.now();

        //计算出当前时间
        var t = endTime-startTime;

        if(t>=duration){
            t = duration;
            clearInterval(timer);//到达目标点要清除定时器
        }
//            console.log(t,start,s,duration);
//            console.log(Tween[way](t,start,s,duration));

        //运动的属性
        for(var key in attrs){

            obj.style[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');


            //透明度的兼容处理
            if(key=='opacity'){
                obj.style.filter = 'Alpha(opacity='+Tween[way](t,starts[key],allS[key],duration)*100+')';
            }

            //处理scrollTop
            if(key=='scrollTop'||key=='scrollLeft'){
                obj[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');
            }


            //transform 的处理
            var attr1 = key.split('.');
            if(attr1.length>1&&attr1[0]=='transform'){
                if(attr1[1]=='scale'){
                    obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+')';
                }else if(attr1[1]=='rotateZ'){
                    obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+'deg)';
                }

            }


        }




        if(t==duration){
            obj.isAnim = false;
            //等到上一个动画完成 然后再调用
            if(callBack){
                callBack(obj);
            }
        }


    },20);


    obj.clearInterval = function(){
        clearInterval(timer);
        obj.isAnim = false;
    };
}



//抖动函数：
/*
 * obj: 抖动的对象
 * attr: 抖动的属性
 *
 * */
function shake(obj,attr,s,f,callBack){
//        var s = 40; //最大偏移量
//        var f = 10; //衰退值
//        console.log(obj.isShake);
    if(obj.isShake) return;
    obj.isShake = true;

    var oldSite = parseFloat(getStyle(obj,attr));//抖动之前的位置

//    var arr = [-10,10,-5,5,0];
    var arr = [];

//    for(var i=0;i<?;i++){
//        arr[i] = -s;
//        arr[i+1] = s;
//    } for循环无法实现 改用while循环

    while(s>0){ //创造抖动的偏移量集合
        arr[arr.length] = -s;
        arr[arr.length] = s;
        s -= f;
    }
    arr[arr.length] = 0;//加上一个0
//        console.log(arr);

    var num = 0;
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        obj.style[attr] = oldSite+arr[num]+'px';
        if(arr[num]==0){
            clearInterval(timer);
            obj.isShake = false;
            callBack&&callBack();
        }
        num++;
    },30);
}


//补0函数：
function format(num){
    return num<10?'0'+num:''+num;
}


//修改search某一个值的函数 如果不传任何参数，将返回一个包含search属性值的对象
function editSearch(name,value,bool){
    var search = window.location.search;// typeof => string

    console.log(search);

    //如果要修改某个值  先把字符串转成对象

    //?user=yinwei&pwd=123456

    var info = search.substring(1);


    //把对应的信息分组
    var info = info.split('&');


    var searchObj = {};

    //info已经是一个数组，需要遍历拆分
    for(var i=0;i<info.length;i++){
        var arr = info[i].split('=');


        searchObj[arr[0]] = arr[1];
    }


    if(arguments.length==0){
        //如果没有传入任何参数，那么程序就假定用户可能是需要search的对象
        return searchObj;
    }



    searchObj[name] = value;//改值

    //把改好的值在拼接回字符串
    var arr = [];
    var n = 0;
    for(key in searchObj){
        arr[n] = key + '=' +searchObj[key];
        n++;
    }

    console.log(arr);
    search = '';
    for(var i=0;i<arr.length;i++){
        search += arr[i]+'&';
    }

//        console.log(search.slice(0,-1));

    if(bool){ //有时候并不希望直接刷新页面
        return search.slice(0,-1);
    }


    window.location.search = search.slice(0,-1);

}


//拖拽：
function drag(option){

    var opt = {
        obj:option.obj||null,
        move:option.move||null,
        up:option.up||null
    };

    // var fn = function(o,l,t){};

    var div = opt.obj;//偷懒 转换对象

    //给拖拽的元素添加mousedown事件
    div.onmousedown = function(ev){

        var ev = ev || event;

        ev.preventDefault();

        //鼠标当前点：
        var x1 = ev.clientX;
        var y1 = ev.clientY;

        //元素当前的位置：
        var l = div.offsetLeft;
        var t = div.offsetTop;

        document.onmousemove = function(ev){

            var ev = ev || event;

            ev.preventDefault();

            //移动过程中的鼠标位置
            var x2 = ev.clientX;
            var y2 = ev.clientY;


            //计算div要移动的距离
            var x = x2-x1;
            var y = y2-y1;

            // function fn(o,l,t){}

            if(opt.move){
                opt.move(div,l+x,t+y);
            }else{
                //设置div的属性
                div.style.left = l+x+'px';
                div.style.top = t+y+'px';
            }


        };

        document.onmouseup = function(){
            //鼠标抬起取消事件；
            document.onmousemove = null;

            if(opt.up){
                opt.up(div);
            }
        };



    };
}

/*

 * 方法名称： boom
 * 功能： 检测碰撞
 * 参数：
 *   o:去碰撞的元素
 *   eles:被碰撞的元素集合
 *   fn:找到离自己最近的被碰撞元素时，定义回调函数去操作该元素
 *
 * */
function boom(o,eles,boomFn,unBoomFn,fn){

    var a1 = o;

    //a1的中心点
    var x1 = a1.offsetLeft+a1.offsetWidth/2;
    var y1 = a1.offsetTop+a1.offsetHeight/2;


    //除了被抓到的元素  其他元素都是碰撞元素
    var minObj = {
        s:0, //距离
        o:null //元素
    };
    for(var i=0;i<eles.length;i++){

        //其他的就是被碰撞元素
        var a2 = eles[i];

        //a2 的中心点：
        var x2 = a2.offsetLeft+a2.offsetWidth/2;
        var y2 = a2.offsetTop+a2.offsetHeight/2;

        //计算出x和y的距离
        var x = Math.abs(x1-x2);
        var y = Math.abs(y1-y2);

        //碰撞时的最大距离
        var maxW = a1.offsetWidth/2+a2.offsetWidth/2;
        var maxH = a1.offsetHeight/2+a2.offsetHeight/2;

        //已知条件： x ， y  w h
        if(x<=maxW&&y<=maxH){
            // console.log('碰上了'+i);
            a2.style.backgroundColor = 'yellow';
            boomFn&&boomFn(a2);
            //检测中心点距离
            var c = Math.sqrt(x*x+y*y);

            if(minObj.o){
                //如有已经有元素了 ，就对比距离（s）值的大小，谁的更小就把谁换进去
                if(c<minObj.s){
                    minObj.s = c;
                    minObj.o = a2;
                }
            }else{
                //没有元素的时候 就把当前这个元素存进去
                minObj.s = c;
                minObj.o = a2;
            }


        }else{
            // console.log('哎。没碰上了'+i);
            unBoomFn&&unBoomFn(a2);
        }


    }

    //如果有里的最近的元素存入，就执行回调
    if(minObj.o) fn&&fn(minObj.o);
}



//滚轮事件方法：
/*
 * 功能：绑定滚轮事件
 * 参数：
 * option {
 *
 *   obj： 触发事件的元素
 *   up:  滚轮向上滚动要执行的函数
 *   down: 滚轮向下滚动要执行的函数
 *
 * }
 * */
function wheel(option){

    //自定义 错误提示
    if(!option){
        console.log('错误码10060:参数不正确');
        return false;
    }

    var opt = {
        obj:option.obj||document,
        up:option.up||null,
        down:option.down||null
    };


    opt.obj.onmousewheel = function(ev){

        var ev = ev||event;

        ev.stopPropagation();
        ev.cancelBubble = true;

        if(ev.wheelDelta<0){
//                    console.log('向下');
            opt.down&&opt.down(ev);
        }
        if(ev.wheelDelta>0){
//                    console.log('向上');
            opt.up&&opt.up(ev);
        }


    };

    opt.obj.addEventListener('DOMMouseScroll',function(ev){

        var ev = ev||event;

        ev.stopPropagation();
        ev.cancelBubble = true;

//                console.log(ev.detail);

        if(ev.detail>0){
//                    console.log('向下');
            opt.down&&opt.down(ev);
        }
        if(ev.detail<0){
//                    console.log('向上');
            opt.up&&opt.up(ev);
        }
    });

}

/*
 * 
 * 用法：
 * 例如：autoScroll(scrollBox,scrollBox2,scrollBox3);
 * 
 */
        //自定义滚动条方法
        function autoScroll(){

            var elements = arguments;

            for(var i=0;i<elements.length;i++){
                createScroll(elements[i]);
            }


            initWheel();
            window.onresize = initWheel;


            //滚动条的初始化方法
            function initWheel(){

                for(var i=0;i<elements.length;i++){

                    //获取盒子元素
                    var box = elements[i].querySelector('.box');
                    var sBox = elements[i].querySelector('.sBox');
                    var tool = elements[i].querySelector('.tool');

                    if(!box) continue;

                    //计算滚动条高度
                    var H1 = box.offsetHeight;
                    var H2 = elements[i].clientHeight;
                    var h1 = sBox.clientHeight;

                    var h2 = H2/H1*h1;

                    tool.style.height = h2+'px';

                }

            }

            //创建滚动条结构
            function createScroll(obj){

                //先要知道什么时候才可以创建滚动条
                var h1 = obj.clientHeight;
                var h2 = obj.scrollHeight;

//            console.log(h1,h2);
                if(h1>=h2) return; //如果内容不足以溢出可视区域 就不需要滚动条



//                console.log(1);

                //创建滚动结构：
                var div = document.createElement('div');
                div.className = 'box';

                //会丢失元素节点的事件和私有属性
                div.innerHTML = obj.innerHTML;
                obj.innerHTML = '';
                div.style.marginRight = '20px';

                obj.appendChild(div);

                var div2 = document.createElement('div');
                div2.className = 'sBox';
                div2.innerHTML = '<div class="tool"></div>';

                obj.appendChild(div2);



                //获取盒子元素
                var box = obj.querySelector('.box');
                var sBox = obj.querySelector('.sBox');
                var tool = obj.querySelector('.tool');


                //滚动条的初始位置：
                var num = tool.offsetTop;
                //滚动的速度：
                var speed = 10;

                //加入滚动事件
                wheel({
                    obj:obj,
                    up:function(ev){

                        num -= speed;

                        //边界处理
                        if(num<=0){
                            num=0;
                        }else{
                            ev.preventDefault();
                        }

                        tool.style.top = num+'px';
                        box.style.marginTop = -(box.offsetHeight*(num/sBox.clientHeight))+'px';
                    },
                    down:function(ev){

                        num += speed;

                        //边界处理
                        if(num>=sBox.clientHeight-tool.offsetHeight){
                            num=sBox.clientHeight-tool.offsetHeight;
                        }else{
                            ev.preventDefault();
                        }

                        tool.style.top = num+'px';

                        box.style.marginTop = -(box.offsetHeight*(num/sBox.clientHeight))+'px';
                    }
                });


                //拖拽滚动条
                tool.onmousedown = function(ev){
                    var ev = ev||event;
                    ev.preventDefault();

                    var x1 = ev.clientX;
                    var y1 = ev.clientY;


                    document.onmousemove = function(ev){
                        var ev = ev||event;
                        ev.preventDefault();

                        var x2 = ev.clientX;
                        var y2 = ev.clientY;

                        var x = Math.abs(x2-x1);
                        var y = y2-y1;

                        //边界处理
                        var t = num+y;
                        if(t<=0){
                            t=0;
                        }
                        if(t>=sBox.clientHeight-tool.offsetHeight){
                            t=sBox.clientHeight-tool.offsetHeight;
                        }

                        tool.style.top = t+'px';

                        box.style.marginTop = -(box.offsetHeight*(t/sBox.clientHeight))+'px';

                        if(x>100){
                            num = tool.offsetTop;//记录变化后的位置
                            document.onmousemove = null;
                        }

                    };
                    document.onmouseup = function(){

                        num = tool.offsetTop;//记录变化后的位置
                        document.onmousemove = null;
                    };


                };
            }
        }