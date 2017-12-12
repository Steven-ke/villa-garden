
// 获取样式
// 括号中的第一个参数是变量，如:odiv;从第二个参数开始，都是属性，如:height、marginTop
function getStyle(){
	var obj=arguments[0];
	var arr=arguments.length>2?{}:'';
	if(typeof arr=='string'){
		arr=!obj.currentStyle?getComputedStyle(obj)[arguments[1]]:obj.currentStyle[arguments[1]];
	}else{
		for(var i=1;i<arguments.length;i++){
			//arr.width=     因为width是变量所以用[]
			arr[arguments[i]]=!obj.currentStyle?getComputedStyle(obj)[arguments[i]]:obj.currentStyle[arguments[i]];
		}
	}
	return arr;
}
// ***************************************************************************************************






/*调用时
 var span=$('span')[0];  根据标签
 var span=$('.active')[2];  根据类
 var btn=$('#btn');  根据id
 */
// 获取元素
function $(str){
	var ele;   //存储找到的元素
	if(str.charAt(0)=='.'){
		ele=document.getElementsByClassName(str.slice(1));
	}else if(str.charAt(0)=='#'){
		ele=document.getElementById(str.slice(1));
	}else{
		ele=document.getElementsByTagName(str);
	}
	return ele;
}
// ***************************************************************************************************



// obj:对象,attr:属性,max:最大偏移量,decline:衰退值
// (odiv,'marginLeft',50,10)
function shake(obj,attr,max,decline){
	// var max=50;   最大偏移量50
	// var decline=10;  衰退值10
	if(obj.bool) return;
	obj.bool=true;
	var arr=[];
	var start=parseFloat(getStyle(obj,attr));  //抖动之前的位置
	console.log(start);
	var num=0;
	while(max>0){  //创造抖动的偏移量集合
		arr.push(max);
		arr.push(-max);
		max-=decline;
	}
	arr.push(0);   //arr的最后加上一个0
	var timer=0;
	clearInterval(timer);
	timer=setInterval(function(){
		num++;
		if(num>=arr.length){
			clearInterval(timer);
			obj.bool=false;
		}
		obj.style[attr]=start+arr[num]+'px';
	},50);
}
// **********************************************************************************************





// obj:对象,attrs:各属性值目的地,begin:各属性起始值,duration:执行总时间,way:运动方式,callBack:回调函数
/*
MTweenPlus({
	obj:div,
	attrs:{
		'marginLeft':'400px',
		'opacity':0.3,
		'width':'150px',
		'transform.scale':2
	},
	begin:{
		'opacity':1,
		'transform.scale':1
	},
	duration:1000,
	callBack:function(){
		MTweenPlus({
			obj:div,
			attrs:{
				'marginLeft':'10px',
				'opacity':1,
				'transform.scale':1
			},
			begin:{
				'transform.scale':2
			},
			duration:1300
		});
	}
});
*/
function  MTweenPlus(opt){
	var option={
		obj:'',
		attrs:{},
		begin:{},
		duration:0,
		way:'linear',
		callBack:function(){}
	};

	// 用传入的参数覆盖默认值
	for(var key in option){
		if(opt[key]){
			option[key]=opt[key];
		}
	}

	// 为了不再修改下面更多的代码，在这里做一次变量的适配
	var obj=option.obj;
	var attrs=option.attrs;
	var begin=option.begin;
	var duration=option.duration;
	var way=option.way;
	var callBack=option.callBack;



	if(obj.bool) return;

	//obj开始运动了  自定义属性
	obj.bool = true;

	/*
	if(!way){ //如果用户没有选择运动方式就默认匀速
		way = 'linear';
	}

	if(!unit){ //如果用户没有传入单位，默认为空
		unit = '';
	}
	*/

	var starts={};
	//获取传入属性的开始位置
	for(var key in attrs){
		starts[key]=parseFloat(begin[key])||parseFloat(getStyle(obj,key))||0;
	}
	/*  
	var start = parseFloat(begin)||parseFloat(getStyle(obj,attr))||0;   起始位置,如果begin未传值，
    那就尝试获取传入的属性值，如果属性值获取失败，就默认为0  
    */

 
	var startTime = Date.now();


	// 所有属性的总路程
	var s={};
	var end={};
	for(var key in attrs){
		end[key]=parseFloat(attrs[key]);
		s[key]=(end[key]-starts[key])||0;
	}
	/*var s = end - start;  总路程  */




	// 对应的单位
	var units={};
	for(var key in attrs){
		if(typeof attrs[key]=='string'){
			var num=parseFloat(attrs[key]);
			var arr=attrs[key].split(num);
			units[key]=arr[1];
		}
	}



	//每次20ms走一帧
	clearInterval(timer);
	var timer = 0;
	timer = setInterval(function(){

		var endTime = Date.now();

		//计算出当前时间
		var t = endTime-startTime;

		if(t>=duration){
			t = duration;
			clearInterval(timer);//到达目标点要清除定时器
		}

		for(var key in attrs){
			obj.style[key]=Tween[way](t,starts[key],s[key],duration)+(units[key]||'');
		// console.log(Tween[way](t,starts[key],s[key],duration)+(units[key]||''));
		}
		/*obj.style[attr] = Tween[way](t,start,s,duration)+unit;*/



		// scrollTop的处理
		for(var key in attrs){
			if(key=='scrollTop'||key=='scrollLeft'){
				obj[key]=Tween[way](t,starts[key],s[key],duration)+(units[key]||'');
			}
		}



		//透明度的兼容处理
		for(var key in attrs){
			if(key=='opacity'){
				obj.style.filter='Alpha(opacity'+Tween[way](t,starts[key],s[key],duration)*100+')';
			}
		}
		/*
		if(attr=='opacity'){
			obj.style.filter = 'Alpha(opacity='+Tween[way](t,start,s,duration)*100+')';
		}
		*/



		//如果是transform的情况
		//transform.scale  ==> ['transform','scale']
		for(var key in attrs){
			var attrArr=key.split('.');
			if(attrArr.length>1&&attrArr[0]=='transform'){
				if(attrArr[1]=='scale'){
					obj.style[attrArr[0]]=attrArr[1]+'('+Tween[way](t,starts[key],s[key],duration)+')';
				}else if(attrArr[1]=='rotateZ'){
					obj.style[attrArr[0]]=attrArr[1]+'('+Tween[way](t,starts[key],s[key],duration)+'deg)';
				}
			}
		}
		/*
		var attrArr=attr.split('.');
		if(attrArr[0]=='transform'){
			//js设置transform的方式：
	        // obj.style.transform = 'scale(n)';
	        if(attrArr[1]=='scale'){
	        	obj.style[attrArr[0]]=attrArr[1]+'('+Tween[way](t,start,s,duration)+')';
	        }else if(attrArr[1]=='rotateZ'){
	        	obj.style[attrArr[0]]=attrArr[1]+'('+Tween[way](t,start,s,duration)+'deg)';
	        }
	    }
		*/


	    if(t==duration){
	    	obj.bool = false;
			//等到上一个动画完成 然后再调用
			if(callBack){
				callBack();
			}
		}


	},20);
}
// **************************************************************************************************






// (obj:对象,attr:属性,begin:起始位置, end:目的地,duration:执行总时间 毫秒 ,unit:单位,way:运动方式,callBack:回调函数)
// 没有单位时,unit的位置写''占位
// MTween(div,'transform.scale',1,3,1000,'','linear');
//              (odiv,'left',100,350,1000,'px','linear')
function  MTween(obj,attr,begin,end,duration,unit,way,callBack){

	if(obj.bool) return;

	//obj开始运动了  自定义属性
	obj.bool = true;

	if(!way){ //如果用户没有选择运动方式就默认匀速
		way = 'linear';
	}

	if(!unit){ //如果用户没有传入单位，默认为空
		unit = '';
	}

	var start = parseFloat(begin)||parseFloat(getStyle(obj,attr))||0;//起始位置,如果begin未传值，
    // 那就尝试获取传入的属性值，如果属性值获取失败，就默认为0

    console.log(start);
	//  var end = 1000;//目标点
	//  var duration = 1000;//动画执行的总时间 单位是毫秒
	var startTime = Date.now();

	var s = end - start; //总路程

//  var v = s/duration; //计算出来的速度


	//每次20ms走一帧
	clearInterval(timer);
	var timer = 0;
	timer = setInterval(function(){

		var endTime = Date.now();

		//计算出当前时间
		var t = endTime-startTime;

		if(t>=duration){
			t = duration;
			clearInterval(timer);//到达目标点要清除定时器
		}

		obj.style[attr] = Tween[way](t,start,s,duration)+unit;

		//透明度的兼容处理
		if(attr=='opacity'){
			obj.style.filter = 'Alpha(opacity='+Tween[way](t,start,s,duration)*100+')';
		}


		//如果是transform的情况
		//transform.scale  ==> ['transform','scale']
		var attrArr=attr.split('.');
		if(attrArr[0]=='transform'){
			//js设置transform的方式：
	        // obj.style.transform = 'scale(n)';
	        if(attrArr[1]=='scale'){
	        	obj.style[attrArr[0]]=attrArr[1]+'('+Tween[way](t,start,s,duration)+')';
	        }else if(attrArr[1]=='rotateZ'){
	        	obj.style[attrArr[0]]=attrArr[1]+'('+Tween[way](t,start,s,duration)+'deg)';
	        }
	    }

	    if(t==duration){
	    	obj.bool = false;
			//等到上一个动画完成 然后再调用
			if(callBack){
				callBack();
			}
		}


	},20);
}










/*  ************************************************************************************************
// (obj,attr:属性, end:目的地,duration:执行总时间 毫秒 ,unit:单位,way:运动方式,callBack:回调函数)
// 没有单位时,unit的位置写''占位
//              (odiv,'left',350,1000,'px','linear')
function  MTween(obj,attr,end,duration,unit,way,callBack){

    if(obj.bool) return;

    //obj开始运动了  自定义属性
    obj.bool = true;

    if(!way){ //如果用户没有选择运动方式就默认匀速
        way = 'linear';
    }

    if(!unit){ //如果用户没有传入单位，默认为空
        unit = '';
    }

    var start = parseFloat(getStyle(obj,attr));//起始位置
//  var end = 1000;//目标点
//  var duration = 1000;//动画执行的总时间 单位是毫秒
    var startTime = Date.now();

    var s = end - start; //总路程

//  var v = s/duration; //计算出来的速度


    //每次20ms走一帧
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        var endTime = Date.now();

        //计算出当前时间
        var t = endTime-startTime;

        if(t>=duration){
            t = duration;
            clearInterval(timer);//到达目标点要清除定时器
        }

        obj.style[attr] = Tween[way](t,start,s,duration)+unit;

        //透明度的兼容处理
        if(attr=='opacity'){
            obj.style.filter = 'Alpha(opacity='+Tween[way](t,start,s,duration)*100+')';
        }


        if(t==duration){
            obj.bool = false;
            //等到上一个动画完成 然后再调用
            if(callBack){
                callBack();
            }
        }


    },20);
}
************************************************************************************************  */







/*  *************************************************************************

// (obj,attr,end终点位置,duration经过时间,way运动方式,函数)
function MTween(obj,attr,end,duration,way,endfn){
		
	if(obj.bool){
		return;
	}
	obj.bool=true;
	if(!way){
		way='linear';
	}
	var start=parseFloat(getStyle(obj,attr));
	var starttime=Date.now();
	var s=end-start;
	var v=s/duration;
	var timer=0;
	clearInterval(timer);
	timer=setInterval(function(){
		var endtime=Date.now();
		var t=endtime-starttime;
		if(t>=duration){
			t=duration;
			clearInterval(timer);
		}
		// obj.style[attr]=start+t*v+'px';
		obj.style[attr]=Tween[way](t,start,s,duration)+'px';
		if(t==duration){
			obj.bool=false;
			endfn&&endfn();
		}
	},20);
}

********************************************************************************  */