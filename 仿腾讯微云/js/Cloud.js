window.onload = function() {
	var icon_act = $('.icon_act')[0];

	//documrnt的点击关闭其他弹窗事件
	document.addEventListener('click', function() {
		act_none(); //隐藏任务列表的函数
		g_user_name_none(); //关闭点击右上角用户名设置交互画面
		_show_listNone(); //列表显示方式隐藏
		//			operation_close();//处理没有li选中时功能区隐藏
		//			lis_reset();//li的选中状态隐藏
		add_btnNone(); //隐藏添加按钮的下拉菜单
		nameSure() //确定重命名内容
		contextmenuNone()//隐藏ul的邮件菜单
	})
	document.addEventListener('mousemove', function(ev) {
		var ev = ev || event;
		ev.preventDefault();
	})

	//--------------------------------------------------------------------------------------------------
	//头部交互动画
	//任务列表显示消失
	icon_act.state = false;
	icon_act.onclick = function(ev) {
		var ev = ev || event;
		//		console.log(icon_act.state)
		if(!this.state) {
			this.children[0].style.display = 'block'
			MTween({
				obj: this.children[0],
				attrs: {
					width: 406 + 'px',
					height: 330 + 'px'
				},
				duration: 150
			})
			this.state = true;
			this.children[0].onclick = function(ev) { //这里阻止冒泡，避免点击他自己也会关闭他自己

				var ev = ev || event;
				ev.stopPropagation();
				ev.cancelBubble = true;
			}
		} else {
			act_none();
		}
		ev.stopPropagation();
		ev.cancelBubble = true;
	}
	//隐藏任务列表的函数，因为多处点击需要隐藏这个任务列表事件，所以命名函数直接执行
	function act_none() {
		icon_act.children[0].style.display = 'none'
		MTween({
			obj: icon_act.children[0],
			attrs: {
				width: 0 + 'px',
				height: 0 + 'px'
			},
			duration: 150
		})
		icon_act.state = false;
	}

	//这里处理任务列表里面显示的内容动画
	var blueLine = $('.move-ico')[0];
	var progress = document.querySelectorAll('.small-list>span');
	//点击任务列表进行中或者已完成时添加或删除字体颜色
	for(var i = 0; i < progress.length; i++) {
		progress[i].onclick = function() {
			for(var i = 0; i < progress.length; i++) {
				progress[i].className = '';
			}
			this.className = 'color';
		}
	}

	//点击进行中或已完成时改变下方蓝色线条的left值
	progress[0].addEventListener('click', function() {
		MTween({
			obj: blueLine,
			attrs: {
				left: 20 + 'px',
			},
			duration: 100,
		})
	})
	progress[1].addEventListener('click', function() {
		MTween({
			obj: blueLine,
			attrs: {
				left: 95 + 'px',
			},
			duration: 100,
		})
	})
	//	console.log(progress)

	//-----------------------------------------------------------------------------------------------------

	//搜索框交互
	var search_input = $('.input')[0];

	//当该元素获得焦点的时候宽度加长动画
	search_input.onfocus = function() {
		MTween({
			obj: search_input.parentNode,
			attrs: {
				width: 310 + 'px',
			},
			duration: 200
		})
	}

	//当元素失去焦点时恢复原来的宽度
	search_input.onblur = function() {
		MTween({
			obj: search_input.parentNode,
			attrs: {
				width: 260 + 'px',
			},
			duration: 200
		})
	}

	//----------------------------------------------------------------------------------------------

	//右上角用户名点击交互效果	
	var g_user_name = $('.g_user_name')[0];
	var user_ico = $('.user_ico')[0];
	g_user_name.state = false;
	g_user_name.onclick = function(ev) {
		var ev = ev || event;
		if(!this.state) {
			MTween({
				obj: this.children[2],
				attrs: {
					width: 272 + 'px',
					height: 270 + 'px',
				},
				duration: 10
			})
			user_ico.style.transform = 'rotateZ(180deg)';
			user_ico.style.top = '0';
			g_user_name.state = true;
			this.children[2].onclick = function(ev) { //这里阻止冒泡，避免点击他自己也会关闭他自己
				var ev = ev || event;
				ev.stopPropagation();
				ev.cancelBubble = true;;
			}
			_show_listNone(); //列表显示方式隐藏
			act_none() //任务列表框隐藏
			lis_reset() //li的选中状态隐藏
			add_btnNone(); //隐藏添加按钮的下拉菜单
		} else {
			g_user_name_none();
		}
		ev.stopPropagation();
		ev.cancelBubble = true;
	}

	//关闭点击右上角用户名设置交互画面
	function g_user_name_none() {
		user_ico.style.transform = 'rotateZ(0deg)';
		user_ico.style.top = '7px';
		MTween({
			obj: g_user_name.children[2],
			attrs: {
				width: 0 + 'px',
				height: 0 + 'px',
			},
			duration: 10
		})
		g_user_name.state = false;
	}

	//--------------------------------------------------------------------------------------------------------

	//处理列表显示方式的交互动画
	var _show = $('._show')[0];
	var _show_list = document.querySelector('._show>.list')
	var _show_ico2 = $('.s_ico2')[0];
	_show.state = false;
	_show.onclick = function(ev) {
		var ev = ev || event;
		ev.preventDefault();
		if(!this.state) {
			act_none(); //任务列表隐藏
			add_btnNone(); //清除添加按钮的下拉菜单
			_show_list.style.display = 'block';
			_show_ico2.style.transform = 'rotateZ(180deg)';
			_show_ico2.style.top = '15px'
			MTween({
				obj: _show_list,
				attrs: {
					width: 160 + 'px',
					height: 160 + 'px',
				},
				duration: 10
			})
			this.state = true;
			_show_list.onclick = function(ev) {
				var ev = ev || event;
				ev.stopPropagation();
				ev.cancelBubble = true;
			}
		} else {
			_show_listNone();
		}
		ev.stopPropagation();
		ev.cancelBubble = true;
	}

	//处理显示列表方式的隐藏函数
	function _show_listNone() {
		_show_list.style.display = 'none';
		_show_ico2.style.transform = 'rotateZ(0deg)';
		_show_ico2.style.top = '10px'
		MTween({
			obj: _show_list,
			attrs: {
				width: 0 + 'px',
				height: 0 + 'px',
			},
			duration: 10
		})
		_show.state = false;
	}

	//处理列表显示或者是缩略图显示
	var lb = document.querySelector('.lb');
	var slt = document.querySelector('.slt');
	var list_box = document.querySelector('.i_list');
	var i_list = list_box.getElementsByTagName('li');
	//	console.log(i_list)
	i_list[i].addEventListener('click', function(ev) { //阻止每一个li的点击冒泡事件
		var ev = ev || event;
		ev.stopPropagation()
		ev.cancelBubble = true;
		operation.style.display = 'none'
	})
	var th = document.querySelector('.th');
	lb.onclick = lbDis;
	function lbDis() {
		for(var i = 0; i < i_list.length; i++) {
			i_list[i].className = 'css2';
		}
		lb.children[0].className = 'article';
		slt.children[0].className = '';
		th.style.display = 'block';
		_show_listNone();
	}
	slt.onclick = sltDis;
	function sltDis() {
		for(var i = 0; i < i_list.length; i++) {
			i_list[i].className = 'css1';
		}
		slt.children[0].className = 'article';
		lb.children[0].className = '';
		th.style.display = 'none';
		_show_listNone();
	}

	//------------------------------------------------------------------------------------------------
	//处理文件夹的鼠标移入，移出，勾选框的勾选
	file_event();
	var lis_em = list_box.getElementsByTagName('em');
	var lis = list_box.getElementsByTagName('li'); //获取所有li
	var all = $('.all')[0];
	var all_btn = all.querySelector('.all_btn')
	var operation = $('.operation')[0];
	var num = 0;

	function file_event() {
		//处理文件夹鼠标移入显示效果
		var list_box = $('.i_list')[0];
		var lis = list_box.getElementsByTagName('li'); //获取所有li++++++++++++
		for(var i = 0; i < lis.length; i++) {
			//lis鼠标移入时显示背景和勾选框
			lis[i].onmouseover = function() {
				this.style.backgroundColor = '#f5f8fa';
				this.children[0].style.display = 'block';
			}
			//lis鼠标移入时隐藏背景和勾选框
			lis[i].onmouseout = function() {
				//			var checkbox1 = document.getElementsByClassName('.checkbox1')
				//			console.log(checkbox1[0])
				if(this.children[0].className == 'tick') return; //如果li为选中状态就不消除背景色
				this.style.backgroundColor = '';
				this.children[0].style.display = 'none';
			}
			//鼠标移入勾选圈圈的交互
			var lis_em = list_box.getElementsByTagName('em'); //每一个li下面的勾选框+++++++++++++
			lis_em[i].onmouseover = function() {
				this.style.borderColor = '#00A4FF';
				var ev = ev || event;
			}
			lis_em[i].onmouseout = function() {
				this.style.borderColor = ''
				var ev = ev || event;
			}

			//处理li的勾选按钮事件
			var all = $('.all')[0]; //+++++++++
			var all_btn = all.querySelector('.all_btn'); //++++++++++
			var operation = $('.operation')[0]; //+++
			//		console.log(operation)
			//鼠标点击时让勾选框变为选中状态
			lis_em[i].state = false;
			lis_em[i].onclick = function(ev) {
				if(!this.state) {
					this.className = 'tick';
					num++;
					this.state = true;
				} else {
					this.className = '';
					num--;
					this.state = false;
				}
				nameSure() //点击勾选的时候确认文件夹的名称改名完毕
				//处理全选按钮事件
				if(num == lis_em.length) { //这里处理li全选中之后全选按钮勾中
					all_btn.className = 'all_btn tick';
					all_btn.state = true;
				} else {
					all_btn.className = 'all_btn';
					all_btn.state = false;
				}
				//如果有一个li被选中，则全选按钮框弹出,并且列表显示方式隐藏，操作区显示
				console.log(num)
				if(num > 0) {
					all_btn.style.display = 'block';
					_show.style.display = 'none';
					MTween({
						obj: operation,
						attrs: {
							width: 292 + 'px',
							height: 35 + 'px'
						},
						duration: 200,
					})
				} else {
					all_btn.style.display = 'none'; //全选按钮隐藏
					operation_close();
				}
				operation.addEventListener('click', function(ev) {
					var ev = ev || event;
					ev.stopPropagation();
					ev.cancelBubble = true;
				})
				var ev = ev || event;
				ev.stopPropagation();
				ev.cancelBubble = true;
			}
		}
	}

	//处理没有li选中时功能区隐藏
	function operation_close(ev) {
		MTween({
			obj: operation,
			attrs: {
				width: 0 + 'px',
				height: 0 + 'px'
			},
			duration: 20,
			callBack: function() { //回调处理列表显示方式显示出来
				_show.style.display = 'block';
			}
		})
		var ev = ev || event;
		ev.stopPropagation();
		ev.cancelBubble = true;
	};

	//处理功能区按钮事件
	var o_delete = $('.o_delete')[0];
	var ul = $('i_list')[0];
	//初始化确定删除的弹出框
	var jump_box = $('.jump_box')[0];
	var delete_tc = $('.delete_tc')[0];
	var sure_delete = $('.sure_delete')[0];
	var d_close = $('.d_close')[0];
	var cancel = $('.cancel')[0];
	delete_tc.style.left = innerWidth / 2 - delete_tc.clientWidth / 2 + 'px';
	delete_tc.style.top = innerHeight / 2 - delete_tc.offsetHeight / 2 + 'px';
	o_delete.onclick = function() { //打开弹出窗
		jump_box.style.transform = 'scale(1)';
		MTween({
			obj: delete_tc,
			begins: {
				'transform.scale': 0.3
			},
			attrs: {
				'transform.scale': 1,
			},
			duration: 100,
		})
	}
	d_close.onclick = cancel.onclick = function() {
		jump_box.style.transform = 'scale(0)';
		add_btnNone(); //清除添加按钮的下拉菜单
	}

	//删除文件夹事件
	var ul_box = $('.i_list')[0];
	sure_delete.onclick = function() {
		this.parentNode.parentNode.style.transform = 'scale(0)';
		jump_box.style.transform = 'scale(0)';
		for(var i = 0; i < lis.length; i++) {
			if(lis_em[i].className == 'tick') {
				ul_box.removeChild(lis[i]);
				i--;
				num--;
			}
		}
		add_btnNone(); //清除添加按钮的下拉菜单
	}

	//处理添加按钮的事件
	var add_btn = $('.add')[0];
	var tj_box = $('.tj_box')[0]
	add_btn.state = false;
	add_btn.onclick = function(event) {
		lis_reset() //处理点击docume时所有li的选中状态清除；
		operation_close(); //处理没有li选中时功能区隐藏
		if(!this.state) {
			_show_listNone(); //关闭列表显示方式的下拉菜单
			nameSure() //确定重命名
			tj_box.style.display = 'block';
			MTween({
				obj: tj_box,
				attrs: {
					width: 180 + 'px',
					height: 203 + 'px'
				},
				duration: 50
			})
			add_btn.state = true;
		} else {
			add_btnNone();
		}
	}
	//添加按钮菜单隐藏事件
	function add_btnNone() {
		MTween({
			obj: tj_box,
			attrs: {
				width: 0 + 'px',
				height: 0 + 'px'
			},
			duration: 50,
			callback: function() {
				tj_box.style.display = 'none';
			},
		})
		add_btn.state = false;
	}
	//阻止点击添加文件夹和点击添加按钮时冒泡行为
	tj_box.addEventListener('click', function(ev) {
		var ev = ev || event
		ev.stopPropagation();
		ev.cancelBubble = true;
	})
	add_btn.addEventListener('click', function(ev) {
		var ev = ev || event
		ev.stopPropagation();
		ev.cancelBubble = true;
	})

	//处理文件夹重命名
	var file_name = $('.file_name');
	var file_name1 = $('.file_name1');
	var file_box = document.querySelector('.i_list>li');
	var reName = document.querySelector('.o_rename');
	var change_span = '';
	var change_input = ''
	//	console.log(lis_em)
	//点击修改重命名按钮事件
	reName_enent();
	for(var i=0;i<file_name.length;i++){
		console.log(file_name)
		file_name[i].addEventListener('click',function(ev){
			var ev = ev||event;
			ev.stopPropagation();
			ev.cancelBubble = true;
			this.focus()
		})
	}
	function reName_enent() {
		reName.onclick = function() {
			for(var i = 0; i < lis_em.length; i++) {
				if(lis_em[i].className == 'tick') {
					if(num == 1) {
						lis_em[i].nextElementSibling.children[1].style.display = 'none';
						lis_em[i].nextElementSibling.children[2].value = lis_em[i].nextElementSibling.children[1].innerHTML;
						lis_em[i].nextElementSibling.children[2].style.display = 'block';
						lis_em[i].nextElementSibling.children[2].focus(); //让input获取焦点
						lis_em[i].nextElementSibling.children[2].select(); //让input获取焦点时文字选中状态
						change_span = lis_em[i].nextElementSibling.children[1];
						change_input = lis_em[i].nextElementSibling.children[2];
					}
				}
			}
		}
	}
	//确定重命名内容
	function nameSure() {
		if(change_span == '') return;
		if(change_input.value == '') {
			change_input.value = '新建文件夹';
			change_span.innerHTML = change_input.value;
			change_span.style.display = 'inline';
			change_input.style.display = 'none';
		} else {
			change_span.style.display = 'inline';
			change_span.innerHTML = change_input.value;
			change_input.style.display = 'none';
		}
	}

	//新建文件夹事件
	var new_file = $('.new_file')[0];
	//	console.log(ul_box)在上面全局获取了ul
	//	console.log(lb)这是列表显示方式为列表样式
	//新建文件夹按钮点击事件
	var time = '';
	new_file.onclick = newDile;
	function newDile() {
		var li = document.createElement('li');
		//		var css = '';
		//处理创建时间记录
		var d = new Date();
		var h = reviseZero(d.getHours());
		var m = reviseZero(d.getMinutes());
		var s = reviseZero(d.getSeconds());
		var Y = d.getFullYear();
		var M = d.getMonth() + 1;
		var D = d.getDate();
		var time = M + '月' + D + '日' + h + ':' + m;
		//		console.log(time)
		//补0
		function reviseZero(t) {
			return t < 10 ? t = '0' + t : t = '' + t;
		}

		var li = document.createElement('li');
		var html = '';
		if(lb.children[0].className == 'article') {
			li.className = 'css2'
		} else {
			li.className = 'css1'
		}
		html = '<em class=""></em>' +
			'<a href="javascript:;">' +
			'<i></i>' +
			'<span style="display:none" class="file_name1">新建文件夹</span>' +
			'<input style="display:inline" type="text" name="name" class="file_name" value="新建文件夹" />' +
			'</a>' +
			'<u>' + time + '</u>' +
			'<u>--</u>';
		li.innerHTML += html;
		ul_box.appendChild(li)
		//		console.log(lis)
		lis = list_box.getElementsByTagName('li'); //获取所有li
		add_btnNone(); //隐藏添加按钮的下拉菜单
		li.children[0].nextElementSibling.children[1].style.display = 'none';
		li.children[0].nextElementSibling.children[2].value = li.children[0].nextElementSibling.children[1].innerHTML;
		li.children[0].nextElementSibling.children[2].style.display = 'block';
		li.children[0].nextElementSibling.children[2].focus(); //让input获取焦点
		li.children[0].nextElementSibling.children[2].select(); //让input获取焦点时文字选中状态
		change_span = li.children[0].nextElementSibling.children[1];
		change_input = li.children[0].nextElementSibling.children[2];
		//			console.log(i_list,lis)
		file_event();
	}

	//处理全选按钮功能模块
	all_btn.state = false;
	all_btn.onclick = function() {
		if(!this.state) {
			all_btn.className = 'all_btn tick'; //全选按钮选中。
			for(var i = 0; i < lis_em.length; i++) {
				lis_em[i].style.display = 'block'; //li的勾选框显示出来
				lis_em[i].className = 'tick'; //给里的勾选框选中状态
				lis[i].style.backgroundColor = '#f5f8fa' //改变li的背景色
				lis_em[i].state = true; //改变每一个li的勾选框状态
			}
			all_btn.state = true; //改变全选按钮的状态
			num = lis_em.length; //改变计数num的值
		} else {
			all_btn.style.display = 'none'
			all_btn.className = 'all_btn'; //全选按钮取消选中。
			for(var i = 0; i < lis_em.length; i++) {
				lis_em[i].style.display = 'none';
				lis_em[i].className = '';
				lis[i].style.backgroundColor = '';
				lis_em[i].state = false;
			}
			operation_close();
			all_btn.state = false;
			num = 0;
		}
		nameSure() //点击全选按钮的时候也执行以下修改文件夹名称的确认
	}
	all_btn.addEventListener('click', function(ev) {
		var ev = ev || event;
		ev.stopPropagation();
		ev.cancelBubble = true;
	})

	//-----------------------------------------------------------------------------------------------------
	//处理点击docume时所有li的选中状态清除；
	function lis_reset() {
//		console.log(num)
		num = 0;
		for(var i = 0; i < lis.length; i++) {
			lis[i].style.backgroundColor = '';
			lis_em[i].style.display = 'none';
			lis_em[i].state = false;
			lis_em[i].className = '';
		}
		all_btn.style.display = 'none'
		all_btn.className = 'all_btn'; //全选按钮取消选中。
	}

	//-----------------------------------------------------------------------------------------------------------
	//处理框选事件
	//	console.log(ul_box,i_list)
//	var boom_box = [];
	var t = 0;
	ul_box.onmousedown = function(ev) {
		var ev = ev || event;
		ev.preventDefault();
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var x1 = ev.clientX;
		var y1 = ev.clientY;
		//		console.log(y1)
		var div = document.createElement('div');
		div.className = 'checkbox1';
		ul_box.appendChild(div);
		div.style.left = x1 + 'px';
		div.style.top = y1 + scrollTop + 'px';
		//-----------------------------------------------------------------------
		//当点击ul的时候生成事件委托，让document来清除li的选中状态
		document.addEventListener('click', lis_reset);
		//处理没有li选中时功能区隐藏
		operation_close()
		//-----------------------------------------------------------------------

		document.onmousemove = function(ev) {
			var ev = ev || event;
			ev.preventDefault();
			lis_reset();
			var x2 = ev.clientX;
			var y2 = ev.clientY;
			var x = Math.abs(x2 - x1);
			var y = Math.abs(y2 - y1);
			//			console.log(y2)
			if(x2 - x1 < 0) {
				div.style.left = x1 - x + 'px';
			} else {
				div.style.left = x1 + 'px';
			}
			if(y2 - y1 < 0) {
				div.style.top = y1 - y + 'px';
			} else {
				div.style.top = y1 + scrollTop + 'px'; //这里有问题怎么都差几像素
			}
			if(x2 < ul_box.offsetLeft) {
				div.style.left = ul_box.offsetLeft + 'px';
				x = div.style.left
			}
			if(y2 < ul_box.offsetTop) {
				div.style.top = ul_box.offsetTop + 'px';
				y = div.style.top
			}
			div.style.width = x + 'px';
			div.style.height = y + 'px';
			//				console.log(y,div.style.height)

			if(x2 > ul_box.offsetLeft + ul_box.offsetWidth) {
				div.style.width = ul_box.offsetLeft + ul_box.offsetWidth - x1 + 'px';
			}
			if(y2 > ul_box.offsetTop + ul_box.offsetHeight) {
				div.style.height = ul_box.offsetTop + ul_box.offsetHeight - y1 + 'px';
				//				console.log(y2,div.style.top)
			}
			if(x > 2 && y > 2) {
				div.style.display = 'block';
			}
			boom(div, i_list,
				function(element) {
					element.style.backgroundColor = '#F5F8FA';
					element.children[0].className = 'tick';
					all_btn.style.display = 'block';
					element.children[0].style.display = 'block';
					if(element.children[0].className == 'tick') {
						_show.style.display = 'none';
						MTween({
							obj: operation,
							attrs: {
								width: 292 + 'px',
								height: 35 + 'px'
							},
							duration: 20,
						})
					} else {
						operation_close()
					}
					element.children[0].state = true;
				},
				function(element) {
					element.style.backgroundColor = '';
					element.children[0].state = false;
				})
			document.removeEventListener('click', lis_reset);
			nameSure() //确定重命名内容
			contextmenuNone()//隐藏右键菜单
		}
		document.onmouseup = function() {
			ul_box.removeChild(div);
			for(var i = 0; i < lis_em.length; i++) {
				if(lis_em[i].className == 'tick') {
					t++;
				}
			}
			num = t;
			t = 0;
			if(num == lis_em.length) {
				all_btn.className = 'all_btn tick';
				//							console.log(num)
			}
			if(num < 0) {
				operation_close() //处理没有li选中时功能区隐藏
			}
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}
	//----------------------------------------------------------------------------------------------------

	//鼠标右键
	var contextMenu = $('.context_menu')[0];
	var MenuList = contextMenu.querySelectorAll('div');
	var display_lb = document.querySelectorAll('.view span')[0];
	var display_slt = document.querySelectorAll('.view span')[1];
	var newFolder = document.querySelectorAll('.new_folder')[0];
//	console.log(list_box)
	//阻止document的右键菜单
	document.addEventListener('contextmenu',function(ev){
		var ev = ev||event;
		ev.preventDefault();
	})
	//给ul添加右键菜单
	list_box.oncontextmenu = function(ev){
		var k_box =ul_box.querySelector('div')
		if(k_box){
			ul_box.removeChild(k_box);
		}
		var x = ev.clientX;
		var y = ev.clientY;
		contextMenu.style.display = 'block';
		contextMenu.style.left = x+'px';
		contextMenu.style.top = y+'px';
		nameSure() //确定重命名内容
	}
	//处理点击document时右键菜单隐藏
	function contextmenuNone(){
		contextMenu.style.display = 'none';
	}
	
	//右键菜单的鼠标移入事件
	for(var i=0;i<MenuList.length;i++){
		//处理点击每一个div的冒泡行为
		MenuList[i].addEventListener('click',function(ev){
			var ev = ev||event;//阻止点击事件
			ev.cancelBubble =true;
			ev.stopPropagation();
		})
//		MenuList[i].addEventListener('onmousemove',function(ev){
//			var ev = ev||event;//阻止鼠标move事件
//			ev.cancelBubble =true;
//			ev.stopPropagation();
//		})
		MenuList[i].onmouseover = function(){//鼠标移入右键菜单
			console.log(this.children[0])
			if(this.children[0]){
				this.children[0].style.display = 'block';
			}
		}
		MenuList[i].onmouseout = function(){
			if(this.children[0]&&this.children[0].className=='view'){//鼠标移出右键菜单
				this.children[0].style.display = 'none';
			}
		}
	}
	display_lb.onclick = function(){//右键菜单列表显示
		contextMenu.style.display = 'none'
		lbDis();
	}
	display_slt.onclick = function(){//右键菜单缩略图显示
		contextMenu.style.display = 'none'
		sltDis();
	}
	newFolder.onclick = function(){//右键新建文件夹
		contextMenu.style.display = 'none'
		newDile();
	}


























}