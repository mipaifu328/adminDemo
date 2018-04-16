(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	
	//alert
	$.alert = function(str){
		BootstrapDialog.show({
	        title : '提示 ',
	        message : str,
	        size : BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
	        buttons : [ {// 设置关闭按钮
	            label : '确定',
	            action : function(dialogItself) {
	                dialogItself.close();
	            }
	        } ]
	    });
	}
	
	//弹出错误提示框
	$.showErr = function(str, func) {
	    // 调用show方法
	    BootstrapDialog.show({
	        type : BootstrapDialog.TYPE_DANGER,
	        title : '错误 ',
	        message : str,
	        size : BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
	        buttons : [ {// 设置关闭按钮
	            label : '关闭',
	            action : function(dialogItself) {
	                dialogItself.close();
	            }
	        } ],
	        // 对话框关闭时带入callback方法
	        onhide : func
	    });
	};
	
	//confirm确认框
	$.showConfirm = function(str, funOk, funCancel) {
	    BootstrapDialog.confirm({
	        title : '确认',
	        message : str,
	        //type : BootstrapDialog.TYPE_WARNING, // <-- Default value is
	        // BootstrapDialog.TYPE_PRIMARY
	        closable : true, // <-- Default value is false，点击对话框以外的页面内容可关闭
	        draggable : true, // <-- Default value is false，可拖拽
	        btnCancelLabel : '取消', // <-- Default value is 'Cancel',
	        btnOKLabel : '确定', // <-- Default value is 'OK',
	        btnOKClass : 'btn-ys', // <-- If you didn't specify it, dialog type
	        size : BootstrapDialog.SIZE_SMALL,
	        // 对话框关闭的时候执行方法
	        //onhide : funClose,
	        callback : function(result) {
	            // 点击确定按钮时，result为true
	            if (result) {
	                // 执行方法
	            	funOk.call();
	            }else{
	            	funCancel.call();
	            }
	        }
	    });
	};
	
	$.showSuccessTimeout = function(str, func) {
	    BootstrapDialog.show({
	        type : BootstrapDialog.TYPE_SUCCESS,
	        title : '成功 ',
	        message : str,
	        size : BootstrapDialog.SIZE_SMALL,
	        buttons : [ {
	            label : '确定',
	            action : function(dialogItself) {
	                dialogItself.close();
	            }
	        } ],
	        // 指定时间内可自动关闭
	        onshown : function(dialogRef) {
	            setTimeout(function() {
	                dialogRef.close();
	            }, 1000);
	        },
	        onhide : func
	    });
	};
	
	
	
	$.fn.extend({
		ajaxTodialog : function() {
			 return this.click(function(event) {
				 var $this = $(this);
				 var title = $this.attr('title') || $this.text();
				 var url=$this.attr('href');
				
				 $.ajax({
		                type : 'POST',
		                url : url,
		                cache : false,
		                success : function(response) {
		                	 var response = '<a href="http://www.baidu.com">123</a>';
		                    ajaxDialog = BootstrapDialog.show({
		                        message : function(dialog) {
		                            var $message = $('<div></div>');
		                            $message.html(response);// 把传回来的页面作为message返回

		                            return $message;
		                        },
		                        title : title,
		                    });
		                }
				 });
				 event.preventDefault();
		         return false;
			 });
		}
	});
	
}));
