$(function(){
	//tab选项卡
	var $tab = $('#tab');
	var $tabItems = $tab.find('.wap-navbar__item');
    var $tabContents = $tab.find('.wap-tab__content');
    
    //默认第一个tab显示
    $tabItems.eq(2).addClass('current');
    $tabContents.eq(2).show();
    
    //tab切换
	$('.wap-tab').on('click', '.wap-navbar__item', function(){
		//tab-navbar
		$tabItems.removeClass('current');
		$(this).addClass('current');
		
		//tab-content
		var index = $(this).index();
		$tabContents.hide();
		$tabContents.eq(index).show();
		
		if(index == 1){
			$('#publishNewTable').bootstrapTable('resetView');
			$('#newTable').bootstrapTable('resetView');
		}
	})
	
	
	//模拟后台接口数据
	Mock.mock('/host',{
		"total": 100,   
		'rows|10': [{
			'id|+1':1001,
		    'title|2-5': '新闻标题',
		    'content|8-100': '新闻内容'
		}]
	});
	
	
	$(window).resize(function () {
		//窗口变化时，防止表格变样
		$('#publishNewTable').bootstrapTable('resetView');
		$('#newTable').bootstrapTable('resetView');
	});
	
	$('#publishNewTable').bootstrapTable({
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
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        height:300,    //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [ {
            field: 'title',
            title: '新闻标题',
            width: '80%'
        }, {
            field: 'operate',
            title: '操作',
            width: '20%',
            formatter: function(value, row, index){
            	return '<a href="#">移除</a>';
            }
        }]
    });
	
	$('#newTable').bootstrapTable({
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
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        height: $('.container-fluid').height() - $('.wap-navbar').outerHeight(true) - 300,    //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [{
        	checkbox: true
        }, {
            field: 'title',
            title: '标题',
            width: '30%'
        }, {
            field: 'content',
            title: '内容',
            width: '70%'
        }]
    });
    
    function showState(value, row, index){
    	if(value == 0){
    		return '待审批';
    	}else{
    		return '通过';
    	}
    }
    
    /**
     * 显示操作
     * @param {Object} value
     * @param {Object} row
     * @param {Object} index
     */
    function showOperate(value, row, index){
    	if(row.state == 0){	
    		return '<a >审批</a>';
    	}else{
    		return '';
    	}
    }
    
    //校园特色
    //左侧二级列表动画
    $('.picture-items input').iCheck({
		checkboxClass: 'icheckbox_flat-green',
		radioClass: 'iradio_flat-green',
		increaseArea: '20%' // optional
	});
	$('.left-container').on('click','.sub-title',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).siblings('.sub-ul').stop().slideUp('200');
		}else{
			$(this).addClass('active');
			$(this).siblings('.sub-ul').stop().slideDown('200');
		}
	});
})
