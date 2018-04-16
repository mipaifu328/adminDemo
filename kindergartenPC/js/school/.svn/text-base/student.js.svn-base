$(function(){
	//模拟后台接口数据
	Mock.mock('/host',{
		"total": 100,   
		'rows|10': [{
			'id|+1':1001,
		    'no|+1': 201810086,
		    'name|1': ['陈晓明','张晓霞','李宇春','郭子轩','叶小倩'],
		    'sex|1': ['男','女'],
		    'birthday|1': ['2015-01-22','2016-02-11','2014-11-11']
		}]
	});
	
	$(window).resize(function () {
		//窗口变化时，防止表格变样
		$('#studentTable').bootstrapTable('resetView');
	});
	$('#studentTable').bootstrapTable({
	    url: '/host',         //请求后台的URL（*）
	    method: 'post',                      //请求方式（*）
	    toolbar: '#toolbar',                //工具按钮用哪个容器
	    striped: true,                      //是否显示行间隔色
	    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,                   //是否显示分页（*）
	    sortable: false,                     //是否启用排序
	    sortOrder: "asc",                   //排序方式
	    queryParams: function (params) {
	        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	            limit: params.limit,   //页面大小
	            offset: params.offset,  //页码
	        };
	        return temp;
	    },//传递参数（*）
	    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	    pageNumber:1,                       //初始化加载第一页，默认第一页
	    pageSize: 10,                       //每页的记录行数（*）
	    pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
	    search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	    strictSearch: true,
	    showColumns: true,                  //是否显示所有的列
	    showRefresh: true,                  //是否显示刷新按钮
	    minimumCountColumns: 2,             //最少允许的列数
	    clickToSelect: true,                //是否启用点击选中行
	    height: $('.container-fluid').height() - $('.right-title').outerHeight(),    //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	    uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
	    showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
	    cardView: false,                    //是否显示详细视图
	    detailView: false,                   //是否显示父子表
	    columns: [{
	        checkbox: true
	    }, {
	        field: 'no',
	        title: '学号'
	    }, {
	        field: 'name',
	        title: '姓名'
	    }, {
	        field: 'sex',
	        title: '性别'
	    }, {
	        field: 'birthday',
	        title: '出生日期'
	    }]
	});
	
	//调班
	$('#chooseBtn').on('click',function(){
		BootstrapDialog.show({
            title: '选择调往班级',
            message: function(dialogItself){
            	window.dialog = dialogItself;
            	var $content = $('<div></div>').load('../../pages/school/studentChooseDialog.html');
            	return $content;
            },
            closable: true
        });
	});
	
	//毕业
	$('#finishBtn').on('click',function(){
		BootstrapDialog.show({
            title: '毕业',
            message: function(dialogItself){
            	var html = '';
            		html += '<div>';
	            		html += '<form class="form-horizontal">';
	            			html += '<div class="form-group">';
	            				html += '<label for="name" class="col-sm-2 control-label">批次名称</label>';
	            				html += '<div class="col-sm-10">';
	            					html += '<input type="email" class="form-control" id="name" placeholder="批次名称">';
	            				html += '</div>';
	            			html += '</div>';
	            			html += '<div class="form-group">';
	            				html += '<label for="remark" class="col-sm-2 control-label">批次说明</label>';
	            				html += '<div class="col-sm-10">';
	            					html += '<textarea id="remark" class="form-control" rows="3" placeholder="批次说明"></textarea>';
	            				html += '</div>';
	            			html += '</div>';
	            			html += '<div class="dialog-bottom">';
	            				html += '<button class="btn btn-ys">提交</button>';
	            			html += '</div>';
	            		html += '</form>';
	            	html += '</div>';
            	var $content = $(html);
            	
            	$content.find('button').click(function(){
            		dialogItself.close();
            	});
            	return $content;
            },
            closable: true
        });
	});
});
