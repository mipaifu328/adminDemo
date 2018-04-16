$(function(){
	
	//模拟后台数据
	Mock.mock('/host',{   
		'list': [{
			'id':1001,
		    'type': '早餐',
		    'food|1': ['鸡蛋，牛奶','粥，青菜','米饭，肉类' ,'米饭，肉类'],
		    'picture': '../../images/school/food_demo.png'
		},{
			'id':1002,
		    'type': '午餐',
		    'food|1':  ['鸡蛋，牛奶','粥，青菜','米饭，肉类' ,'米饭，肉类'],
		    'picture': '../../images/school/food_demo.png'
		},{
			'id':1003,
		    'type': '下午茶',
		    'food|1':  ['鸡蛋，牛奶','粥，青菜','米饭，肉类' ,'米饭，肉类'],
		    'picture': '../../images/school/food_demo.png'
		},{
			'id':1004,
		    'type': '晚餐',
		    'food|1':  ['鸡蛋，牛奶','粥，青菜','米饭，肉类' ,'米饭，肉类'],
		    'picture': '../../images/school/food_demo.png'
		}]
	});
	
	//日历
	laydate.render({
	  elem: '#calendar',
	  position: 'static',
	  change: function(value, date){ //监听日期被切换
	  	$.ajax({
	  		url: '/host',
			type:'post',
			data:{
				date: value
			},
			dataType:'json',
			success:function(data){
				var html = '';
				$.each(data.list,function(idx,one){
					html += '<tr data-id="'+ one.id +'" >' +
								'<td><input type="checkbox"/></td>' +
								'<td>'+ one.type +'</td>' +
								'<td>'+ one.food +'</td>' +
								'<td><img class="food-img" src="'+ one.picture +'"></td>' +
								'<td><a href="#">编辑</a></td>' +
							'</tr>';
				});
				console.log(html);
				$('.food-table tbody').html(html);
				$('input').iCheck({
					checkboxClass: 'icheckbox_flat-green',
					radioClass: 'iradio_flat-green',
					increaseArea: '20%' // optional
				});
			},
			error: function(e){
				
			}
	  	})
	  }
	});
	
	//初始化checkbox
	$('input').iCheck({
		checkboxClass: 'icheckbox_flat-green',
		radioClass: 'iradio_flat-green',
		increaseArea: '20%' // optional
	});
	
	//全选
	$('#allCheck').on('ifChanged',function(){
		if($(this).is(':checked')){
			$('.food-table tbody').find('input').each(function(){
				$(this).iCheck('check');
			})
		}else{
			$('.food-table tbody').find('input').each(function(){
				$(this).iCheck('uncheck');
			})
		}
	});
	
	
})
