$(function(){
	
	$('input').iCheck({
		checkboxClass: 'icheckbox_flat-green',
		radioClass: 'iradio_flat-green',
		increaseArea: '20%' // optional
	});
	
	//内容回复
	
	$('.msg-sender-area').hover(function(){
		$('.msg-sender-wrp').show();
	},function(){
		$('.msg-sender-wrp').hide();
	})
	
	//内容列表编辑
	$('.keywords-reply-list').on('click', '[data-operate="edit"]', function(){
		var textItem = $(this).parents('.reply-media-text');
		if(textItem.length > 0){
			var content = textItem.find('span').text();
			showDialog('添加回复文字', content, function(content){
				//确定
				textItem.find('span').html(content);
			},function(){
				//取消
			});
		}
	})
	//内容列表删除
	$('.keywords-reply-list').on('click', '[data-operate="delete"]', function(){
		$(this).parents('.keywords-reply-item').remove();
	})
	
	//图文
	$('.msg-sender__tab_appmsg').on('click',function(){
		location.href='editorContent.html';
	})
	
	//文字
	$('.msg-sender__tab_text').on('click',function(){
		showDialog('添加回复文字','',function(content){
			//确定
			var newReply = '<li class="keywords-reply-item">' +
								'<div class="reply-media-text">' +
									'<span>' + content +'</span>' +
									'<div class="reply-media-opr">' +
										'<a data-operate="edit">编辑</a>' +
										'<a data-operate="delete">删除</a>' +
									'</div>' +
								'</div>' +
							'</li>';
			$('.keywords-reply-list').append(newReply);
		},function(){
			//取消
		});
	})
	
	/**
	 * 文本信息弹出框
	 * @param {Stirng} title	标题
	 * @param {String} content	内容
	 * @param {Function} okCallback	确定回调函数
	 * @param {Function} cancelCallback	取消回调函数
	 */
	function showDialog(title,content,okCallback,cancelCallback){
		BootstrapDialog.show({
            title: title,
            message: function(dialogItself){
            	var html = '';
    			html += '<div id="replyText" class="form-control dialog-edit-area" contenteditable="true">'+ content +'</div>';
    			html += '<div class="dialog-bottom-toolbar">';
    				html += '<a id="dialogOk" class="btn btn-ys">确定</a><a id="dialogCancel" class="btn btn-default">取消</a>';
    			html += '</div>';
            	var $content = $(html);
            	
            	$content.find('#dialogOk').click(function(){
            		okCallback($('#replyText').html());
            		dialogItself.close();
            	});
            	
            	$content.find('#dialogCancel').click(function(){
            		cancelCallback();
            		dialogItself.close();
            	});
            	
            	return $content;
            },
            closable: true
        });
	}
})

