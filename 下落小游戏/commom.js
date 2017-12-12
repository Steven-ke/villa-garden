


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
function  MTween(obj,attr,begin,end,duration,unit,way,callBack){



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
}