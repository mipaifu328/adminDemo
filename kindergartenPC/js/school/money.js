$(function(){
	//模拟后台接口数据
	Mock.mock('/host',{
		"total": 100,   
		'rows|10': [{
			'id|+1':1001,
		    'date|1': ['2018-07-01','2018-07-02','2018-07-03'],
		    'project|1': ['越秀幼儿园','天河幼儿园','海珠幼儿园'],
		    'money|+1840': 18000,
		    'type|0-2':0,
		    'payer|1': ['张三','李四','王五'],
		    'state|0-2':0
		}]
	});
	
	
	$(window).resize(function () {
		//窗口变化时，防止表格变样
		$('#moneyTable').bootstrapTable('resetView');
	});
	$('#moneyTable').bootstrapTable({
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
        height: $('.container-fluid').height(),    //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [{
        	width:'5%',
            checkbox: true
        }, {
        	width:'15%',
            field: 'date',
            title: '日期'
        }, {
        	width:'40%',
            field: 'project',
            title: '项目'
        }, {
        	width:'10%',
            field: 'money',
            title: '金额'
        }, {
        	width:'10%',
            field: 'type',
            title: '类型'
        }, {
        	width:'10%',
            field: 'payer',
            title: '支付人'
        }, {
        	width:'10%',
            field: 'state',
            title: '状态'
        }],
        onClickRow: function(row, $element, field){
        	location.href = 'moneyContent.html';
        }
    });
    //查询按钮
	$('#btn_query').on('click',function(){
		$('#moneyTable').bootstrapTable('refresh');
    });
})
