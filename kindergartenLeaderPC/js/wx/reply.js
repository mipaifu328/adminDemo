$(function(){
	
	var tabs = $('.msg-sender-tab'),
		panel = $('.msg-sender-panel');
	//默认第一个显示
	tabs.eq(0).addClass('msg-sender-tab-selected');
	panel.eq(0).show();
	
	tabs.on('click',function(){
		var index = $(this).index();
		tabs.removeClass('msg-sender-tab-selected');
		$(this).addClass('msg-sender-tab-selected');
		panel.hide();
		panel.eq(index).show();
	})
	
	
	//文本域
	$('.edit-area').on('keyup',function(){
		var text = $(this).text();
		var len = text.length;
		if(len <= 600){
			$('.num-tip').removeClass('warn').html('还可以输入<em>'+ (600-len)+'</em>字');
		}else{
			$('.num-tip').addClass('warn').html('已超出<em>' + (len-600) + '</em>字');
		}
	});
	
	
	
	//图片上传
	
	weui.uploader('#uploader', {
	   url: '/host',
	   auto: true,
	   type: 'file',
	   fileVal: 'uploadFile',
	   compress: {
	       width: 1600,
	       height: 1600,
	       quality: .8
	   },
	   onBeforeQueued: function(files) {
	       // `this` 是轮询到的文件, `files` 是所有文件
	       if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
	           weui.alert('请上传图片');
	           return false; // 阻止文件添加
	       }
	       if(this.size > 1010241024){
	           weui.alert('请上传不超过10M的图片');
	           return false;
	       }
	       // return true; // 阻止默认行为，不插入预览图的框架
	   },
	   onQueued: function(){
	       console.log(this);
			if($('.img-uploaded').length>0){
				$('.img-uploaded').html('<i class="img-thumb" style="background-image: url(&quot;'+ this.url +'&quot;);"></i>');
			}else{
				var html = ''+
					'<div class="img-uploaded">'+
					'<i class="img-thumb" style="background-image: url(&quot;'+ this.url +'&quot;);"></i>'+
					'</div>';
				$('.msg-sender-panel-img').prepend(html);
			}
	       // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
	       // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
	       // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
	       // this.stop(); // 中断上传
	       // return true; // 阻止默认行为，不显示预览图的图像
	   },
	   onBeforeSend: function(data, headers){
	       console.log(this, data, headers);
	       // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
	       // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
	       // return false; // 阻止文件上传
	   },
	   onProgress: function(procent){
	       console.log(this, procent);
	       // return true; // 阻止默认行为，不使用默认的进度显示
	   },
	   onSuccess: function (ret) {
	       console.log(this, ret);
	       // return true; // 阻止默认行为，不使用默认的成功态
	       
	   },
	   onError: function(err){
	       console.log(this, err);
	       // return true; // 阻止默认行为，不使用默认的失败态
	   }
	});
});
