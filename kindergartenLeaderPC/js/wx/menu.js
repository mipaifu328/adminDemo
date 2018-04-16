$(function(){
	
	//模拟后台接口数据
	Mock.mock('/getMenu',{
	    "menu": {
	        "button": [
	            {
	                "type": "click", 
	                "name": "校园", 
	                "key": "V1001_TODAY_MUSIC", 
	                "sub_button": [ 
	                	{
	                        "type": "view", 
	                        "name": "风之歌", 
	                        "url": "http://www.baidu.com/", 
	                        "sub_button": [ ]
	                    }
	                ]
	            }, 
	            {
	                "type": "click", 
	                "name": "微官网", 
	                "key": "V1001_TODAY_SINGER", 
	                "sub_button": [ ]
	            }, 
	            {
	                "name": "菜单", 
	                "sub_button": [
	                    {
	                        "type": "view", 
	                        "name": "搜索", 
	                        "url": "http://www.soso.com/", 
	                        "sub_button": [ ]
	                    }, 
	                    {
	                        "type": "view", 
	                        "name": "视频", 
	                        "url": "http://v.qq.com/", 
	                        "sub_button": [ ]
	                    }, 
	                    {
	                        "type": "click", 
	                        "name": "赞一下我们", 
	                        "key": "V1001_GOOD", 
	                        "sub_button": [ ]
	                    }
	                ]
	            }
	        ]
	    }
	});
	
	
	//请求加载菜单列表
	$.ajax({
		url:'/getMenu',
		type:'post',
		data:{
		},
		dataType:'json',
		success:function(data){
			
			//初始化菜单点击事件
			initMenuEvent();
			
			//渲染菜单
			renderMenu(data.menu.button);
			
		},
		error: function(e){
			
		}
	});
	
	
	
	
	var menuList = $('#menuList');
	var noneMenuHtml = '<li class="pre-menu-item no-extra">'+
							'<a href="javascript:void(0);" class="pre-menu-link" title="最多添加3个一级菜单">'+
	                            '<i class="menu-add-icon"></i>'+
	                       		'<span>添加菜单</span>'+
							'</a>'+
						'</li>';
	var addMenuHtml = '<li class="pre-menu-item no-extra">'+
							'<a href="javascript:;" class="pre-menu-link" title="最多添加3个一级菜单">'+
								'<i class="menu-add-icon"></i>'+
							'</a>'+
						'</li>';
	var menuItemHtml = '<li class="pre-menu-item">'+
							'<a href="javascript:void(0);" class="pre-menu-link">'+
	                       		'<span>菜单名称</span>'+
							'</a>'+
						'</li>';
	var subMenuBoxHtml = '<div class="sub-pre-menu-box">'+
							'<ul class="sub-pre-menu-list">'+
								'<li>'+
									'<a href="javascript:;" class=" js_addL2Btn" title="最多添加5个子菜单">'+
										'<span class="sub-pre-menu-inner">'+
											'<i class="menu-add-icon"></i>'+
										'</span>'+
									'</a>'+
								'</li>'+
							'</ul>'+
							'<i class="arrow arrow_out"></i>'+
							'<i class="arrow arrow_in"></i>'+
						'</div>';
	var subMenuItemHtml = '<li>'+
								'<a href="javascript:;">'+
									'<span class="sub-pre-menu-inner">'+
										'<span>子菜单名称</span>'+
									'</span>'+
								'</a>'+
							'</li>';
	
	
	//菜单名称验证
	$('.menu-setting').on('keyup', ' .js_menu_name', function(){
		var lenNumber = $(this).parents('.js_sub_menu').length > 0 ? 16 : 8;
		var bitLen = getBitLen(this.value); 
		var failBox = $(this).parent().siblings('.fail');
		if(bitLen > lenNumber){
			failBox.html('字数超过上限').show();
		}else if(bitLen == 0){
			failBox.html('请输入菜单名称').show();
		}else{
			failBox.hide();
		}
	});
	
	//菜单名称blur事件
	$('.menu-setting').on('blur', ' .js_menu_name', function(){
		var currentMenu = menuList.find('.current');
		var value = this.value || '菜单名称';
		var subValue = this.value || '子菜单名称';
		
		var menuTitle = currentMenu.children('.pre-menu-link').children('span');
		if(menuTitle.length>0){
			menuTitle.html(value);
			$('.menu-title-info').html(value);
			currentMenu.data('name',value);
		}else{
			currentMenu.children('a').find('.sub-pre-menu-inner span').html(subValue);
			$('.menu-title-info').html(subValue);
			currentMenu.data('name',subValue);
		}
	});
	
	//url聚焦隐藏报错信息
	$('#urlText').focus(function(){
		$(this).parent().siblings('.fail').hide();
	});
	
	//保存发布按钮
	$('#saveBtn').on('click',function(){
		var urlText = $('#urlText');
		//有错误信息
		if($('.fail').is(':visible')){
			return;
		}
		if(urlText.val() == ''){
			urlText.parent().siblings('.fail').show();
			return;
		}
	});
	
	//删除菜单按钮
	$('.js_delete').on('click',function(){
		
		$.showConfirm('删除确认',function(){
			var currentMenu = menuList.find('.current');
			
			
			if(currentMenu.parent().hasClass('sub-pre-menu-list')){
				var add = currentMenu.siblings().last();
				if(add.is(':hidden')){
					add.show();
				}
			}else{
				var menuLen = $('.pre-menu-item').length;
				if(menuLen == 3){
					if($('.pre-menu-item.no-extra').length > 0){
						$('.pre-menu-item').removeClass('size1of3').addClass('size1of2');
					}else{
						$('#menuList').append(addMenuHtml);
					}
				}else if(menuLen == 2){
					$('.pre-menu-item').removeClass('size1of2').addClass('size1of1');
					$('#menuList').addClass('no-menu').html(noneMenuHtml);
				}
			}
			currentMenu.remove();
			$('.menu-editor').hide();
		},function(){
			
		});
		
	});
	
	
	/**
	 * 显示菜单编辑内容
	 * @param {Object} isSubMenu	是否为子级菜单
	 * @param {Object} hasSubMenu	是否 有子菜单
	 * @param {String} name			菜单名称
	 * @param {String} url			菜单链接
	 */
	function showMenuEditor(isSubMenu,hasSubMenu, name, url){
		$('.menu-editor').show();
		if(!isSubMenu){
			//菜单
			$('.menu-editor').removeClass('js_sub_menu');
			$('.js_setNameBox').find('.frm-msg').eq(1).html('字数不超过4个汉字或8个字母');
			if(hasSubMenu){
				//已有子菜单
				$('.menu-eidtor-content').children().hide();
				$('.js_innerNone').show();
				$('.js_setNameBox').show();
			}else{
				//没有子菜单
				$('.js_innerNone').hide();
				$('.menu-eidtor-content').children().show();
			}
		}else{
			//子菜单
			$('.js_innerNone').hide();
			$('.menu-editor').addClass('js_sub_menu');
			$('.menu-eidtor-content').children().show();
			$('.js_setNameBox').find('.frm-msg').eq(1).html('字数不超过8个汉字或16个字母');
		}
	}
	
	
	/**
	 * 获取字符串长度（英文占1个字符，中文汉字占2个字符）
	 * @param {Object} str
	 */
	function getBitLen(str) {  
	    if (str == null) return 0;  
	    if (typeof str != "string"){  
	        str += "";  
	    }  
	    return str.replace(/[^\x00-\xff]/g,"01").length;  
	} 
	
	/**
	 * 初始化菜单事件
	 */
	function initMenuEvent(){
			
		
		//新增菜单
		menuList.on('click','.no-extra',function(){
			var menuLen = $('#menuList .pre-menu-item').length;
			var newMenuItem = $(menuItemHtml);
			
			if(menuLen == 1){
				var newMenuItem = $(menuItemHtml);
				menuList.removeClass('no-menu')
				menuList.html(newMenuItem).append(addMenuHtml);
				menuList.children('.pre-menu-item').addClass('size1of2');
			}else if(menuLen == 2){
				menuList.find('.no-extra').before(newMenuItem);
				menuList.children('.pre-menu-item').removeClass('size1of2').addClass('size1of3');
				
			}else{
				newMenuItem.addClass('size1of3');
				menuList.find('.no-extra').before(newMenuItem).remove();
			}
			
			newMenuItem.data('name','菜单名称');
			newMenuItem.trigger('click');
			$('.js_menu_name').focus().select();
		});
		
		//新增子菜单
		menuList.on('click', '.js_addL2Btn', function(e){
			var $this = $(this);
			var parentMenu = $this.parents('.sub-pre-menu-box').siblings('.pre-menu-link');
			var subMenuLen = $this.parents('.sub-pre-menu-list').children('li').length;
			var newsubMenuItem = $(subMenuItemHtml);
			newsubMenuItem.data('name','子菜单名称');
			if(subMenuLen > 0){
				if(parentMenu.find('i').length == 0){
					$this.parents('.sub-pre-menu-box').siblings('.pre-menu-link').prepend('<i class="menu-dot-icon"></i>');
				}
			}
			
			menuList.find('.current').removeClass('current');
			newsubMenuItem.addClass('current');
			$(this).parent().before(newsubMenuItem);
			newsubMenuItem.trigger('click');
			$('.js_menu_name').focus().select();
			
			
			if(subMenuLen == 5){
				$(this).parent().hide();
			}
			
			e.stopPropagation();
		})
		
		
		//菜单点击
		menuList.on('click', '.pre-menu-item', function(){
			var $this = $(this);
			if($this.hasClass('no-extra')) return;
			
			menuList.find('.current').removeClass('current');
			$('#menuList .sub-pre-menu-box').hide();
			
			$this.addClass('current');
			if($this.find('.sub-pre-menu-box').length > 0){
				$this.find('.sub-pre-menu-box').show();
			}else{
				$this.append(subMenuBoxHtml);
			}
			
			if($this.find('.sub-pre-menu-box li').length > 1){
				showMenuEditor(false,true);
			}else{
				showMenuEditor(false,false);
				var menuUrl = $this.data('url');
				if(menuUrl){
					$('#urlText').val(menuUrl);
				}else{
					$('#urlText').val('');
				}
			}
			
			var menuName = $this.data('name');
			$('.js_menu_name').val(menuName);
			$('.menu-title-info').html(menuName);
			
		});
		
		//子菜单点击
		menuList.on('click', '.sub-pre-menu-list li', function(e){
			var $this = $(this);
			menuList.find('.current').removeClass('current');
			$this.addClass('current');
			
			showMenuEditor(true,false);
			
			var menuName = $this.data('name');
			var menuUrl = $this.data('url');
			
			$('.js_menu_name').val(menuName);
			$('.menu-title-info').html(menuName);
			if(menuUrl){
				$('#urlText').val(menuUrl);
			}else{
				$('#urlText').val('');
			}
			e.stopPropagation();
		});
		
	}
	
	
	/**
	 * renderMenu 渲染加载菜单
	 * @param {Object} buttonArr	按钮数组
	 */
	function renderMenu(buttonArr){
		var len = buttonArr.length;
		var firstBtn;
		
		//循环遍历菜单和子菜单项
		for(var i = 0; i < len; i++){
			var button = buttonArr[i];
			var menuItem = $(menuItemHtml);
			
			//menuItem.attr('data-name',button.name);
			menuItem.data('name',button.name);
			menuItem.data('url',button.url);
			
			menuItem.find('span').html(button.name);
			menuList.append(menuItem);
			
			
			var subButton = button['sub_button'];
			var subButtonLen = subButton.length;
			
			if( subButtonLen > 0){
				for(var j = 0; j < subButtonLen; j++ ){
					
					var subMenuItem = $(subMenuItemHtml);
					
					subMenuItem.data('name',subButton[j].name);
					subMenuItem.data('url',subButton[j].url);
					
					subMenuItem.find('.sub-pre-menu-inner').children('span').html(subButton[j].name);
					var subMenuList = menuItem.find('.sub-pre-menu-list');
					if(subMenuList.length > 0){
						subMenuList.prepend(subMenuItem);
					}else{
						menuItem.append(subMenuBoxHtml);
						menuItem.find('.sub-pre-menu-list').prepend(subMenuItem);
						menuItem.children('.pre-menu-link').prepend('<i class="menu-dot-icon"></i>');
					}
					
					if(i == 0 && j == 0 ){
						firstBtn = subMenuItem;
					}
				}
			}
		}
		
		//默认点击第一个子菜单
		if(firstBtn){
			firstBtn.parents('.pre-menu-item').trigger('click');
			firstBtn.trigger('click');
		}
		
		//主菜单个数对应样式和html
		if(len == 3){
			menuList.children('.pre-menu-item').addClass('size1of3');
		}else if(len == 2){
			menuList.append(addMenuHtml);
			menuList.children('.pre-menu-item').addClass('size1of3');
		}else if(len == 1){
			menuList.append(addMenuHtml);
			menuList.children('.pre-menu-item').addClass('size1of2');
		}else{
			menuList.append(noneMenuHtml);
			menuList.addClass('no-menu').children('.pre-menu-item').addClass('size1of1');
		}
		
	}
	
	
	
	
});
