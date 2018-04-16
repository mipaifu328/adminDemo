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
	
	
	$('.chat-input textarea').on('keyup',function(e){
		if(e.keyCode == 13){
			if(this.value.trim() != ''){
				var content = document.querySelector('.chat-content');
				var html = '<div class="mine">园丁 上午 11:24:36</div>'+
							'<div class="txt">'+ this.value +'</div>';
				$(content).append(html);
				content.scrollTop = content.scrollHeight;
			}
			this.value = '';
		}
	});
	
	$('#sendBtn').on('click',function(){
		var textarea = document.querySelector('.chat-input textarea');
		var content = document.querySelector('.chat-content');
		if(textarea.value.trim() != ''){
			var html = '<div class="mine">园丁 上午 11:24:36</div>'+
						'<div class="txt">'+ textarea.value +'</div>';
			$(content).append(html);
			content.scrollTop = content.scrollHeight;
		}
		textarea.value = '';
	});
	
});