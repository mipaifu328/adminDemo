$(function(){
	
	//上传图片
	weui.uploader('#uploader', {
	   url: '/host',
	   auto: true,
	   type: 'file',
	   fileVal: 'fileVal',
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
	       if(this.size > 10 * 1024 * 1024){
	           weui.alert('请上传不超过10M的图片');
	           return false;
	       }
	
	       // return true; // 阻止默认行为，不插入预览图的框架
	   },
	   onQueued: function(){
	       console.log(this);
	
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
})
