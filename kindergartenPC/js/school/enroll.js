$(function(){
	//模拟后台接口数据
	Mock.mock('/host',{
		"total": 100,   
		'rows|10': [{
			'id|+1':1001,
		    'name|1': ['张三','李四','王五'],
		    'relation|1': ['爸爸','妈妈'],
		    'phone|+10': 13543200111,
		    'school|1': ['越秀幼儿园','天河幼儿园','海珠幼儿园'],
		    'state|0-2':0,
		    'ramark|2-5': '备注'
		}]
	});
	
	
	$(window).resize(function () {
		//窗口变化时，防止表格变样
		$('#enrollTable').bootstrapTable('resetView');
	});
	$('#enrollTable').bootstrapTable({
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
        	width:'10%',
            field: 'name',
            title: '家长名称'
        }, {
        	width:'10%',
            field: 'relation',
            title: '家长关系'
        }, {
        	width:'15%',
            field: 'phone',
            title: '联系电话'
        }, {
        	width:'20%',
            field: 'school',
            title: '意向学校'
        }, {
        	width:'10%',
            field: 'state',
            title: '状态'
        }, {
        	width:'30%',
            field: 'ramark',
            title: '备注'
        }]
    });
    //查询按钮
	$('#btn_query').on('click',function(){
		$('#enrollTable').bootstrapTable('refresh');
    });
    
    //入学弹出框
    $('#addBtn').on('click',function(e){
    	BootstrapDialog.show({
    		id:'123',
            title: '入学与分班',
            message: function(dialogItself){
            	window.dialog = dialogItself;
            	var $content = $('<div></div>').load('../../pages/school/enrollDialog.html');
            	return $content;
            },
            closable: true
        });
    })
})
