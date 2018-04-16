$(function(){
	//左侧二级列表动画
	$('.left-container').on('click','.sub-title',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).siblings('.sub-ul').stop().slideUp('200');
		}else{
			$(this).addClass('active');
			$(this).siblings('.sub-ul').stop().slideDown('200');
		}
	});
	
	//鼠标移动显示删除按钮
	$('.left-container').on('mouseenter', 'a', function() {
	    $(this).append('<i></i>');
	});
	$('.left-container').on('mouseleave', 'a', function() {
	    $(this).children('i').remove();
	});
	
	//删除按钮
	$('.left-container').on('click','i',function(){
		$(this).closest('li').remove();
	});
});