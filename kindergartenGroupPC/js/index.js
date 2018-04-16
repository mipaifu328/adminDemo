$(function(){
			
	//左侧菜单点击切换内容页面
	$('#leftMenu').on('click','a',function(){
		var contentIframe = document.getElementById('contentIframe');
		var href = $(this).attr('data-url');
		
		$('#leftMenu').find('li').each(function(){
			$(this).removeClass('active');
		});
		$(this).parent().addClass('active');
		$(this).parents('li').addClass('active');
		
		if(href){
			contentIframe.src = href;
		}
	});
	
	//左侧菜单动画
	$('#leftMenu').on('click','li',function(e){
		if($(this).hasClass('menu-title')){
			return;
		}
		var subMenu = $(this).children('.sub-menu');
		if(subMenu){
			if(subMenu.is(":visible")){
				subMenu.slideUp(200);
			}else{
				subMenu.slideDown(200);
			}
		}
		$(this).siblings().children('.sub-menu').each(function(){
			$(this).slideUp(200);
		});
		
		$('.leftMenu').find('li').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
		//$(this).parent().parent().addClass('active');
		e.stopPropagation();
	});
});