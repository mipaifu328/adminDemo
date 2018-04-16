$(function(){
	//模拟后台请求
	// errno 即错误代码，0 表示没有错误。
    // 如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
    // data 是一个数组，返回若干图片的线上地址
	Mock.mock('/upload',{
    	"errno": 0,
    	"data": [
    		'../../images/school/wap_demo.png',
    		'../../images/school/wap.png'
    	]
	})
	
	
	
	var E = window.wangEditor;
	var editor = new E('#editorToolbar','#editorText');
	
	
	//API	https://www.kancloud.cn/wangfupeng/wangeditor3/335782
	//图片上传地址
	editor.customConfig.uploadImgServer = '/upload';
	// 限制一次最多上传 8张图片
	editor.customConfig.uploadImgMaxLength = 8;
	editor.customConfig.uploadImgHooks = {
	    before: function (xhr, editor, files) {
	        // 图片上传之前触发
	        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
	        
	        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
	        // return {
	        //     prevent: true,
	        //     msg: '放弃上传'
	        // }
	        console.log('before');
	    },
	    success: function (xhr, editor, result) {
	        // 图片上传并返回结果，图片插入成功之后触发
	        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
	         console.log('success');
	    },
	    fail: function (xhr, editor, result) {
	        // 图片上传并返回结果，但图片插入错误时触发
	        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
	         console.log('fail');
	    },
	    error: function (xhr, editor) {
	        // 图片上传出错时触发
	        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
	         console.log('error');
	    },
	    timeout: function (xhr, editor) {
	        // 图片上传超时时触发
	        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
	         console.log('timeout');
	    },
	
	    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
	    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
	    customInsert: function (insertImg, result, editor) {
	        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
	        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
	
	        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
	        
			console.log('customInsert');
	        $.each(result.data, function(index,element) {
	        	insertImg(element);
	        });
	
	        // result 必须是一个 JSON 格式字符串！！！否则报错
	    }
	}
	
	
	editor.create();
	
	
	$('#saveBtn').on('click',function(){
		console.log(editor.txt.html());
		console.log(editor.txt.text());
	});
	
})

