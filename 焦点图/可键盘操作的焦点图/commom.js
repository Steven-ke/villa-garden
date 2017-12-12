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