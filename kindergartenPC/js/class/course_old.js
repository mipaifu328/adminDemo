$(function(){
	
	//模拟后台数据
	Mock.mock('/host',{   
		'list': [{
			'id':1001,
		    'courseTime': '08:00--09:30',
		    'courseContent|1': ['唱歌','穿衣服','游戏' ,'跳舞'],
		},{
			'id':1002,
		    'courseTime': '10:00--10:30',
		    'courseContent|1': ['唱歌','穿衣服','游戏' ,'跳舞'],
		},{
			'id':1003,
		    'courseTime': '11:00--11:30',
		    'courseContent|1': ['唱歌','穿衣服','游戏' ,'跳舞'],
		},{
			'id':1004,
		    'courseTime': '11:30--12:00',
		    'courseContent|1': ['唱歌','穿衣服','游戏' ,'跳舞'],
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
								'<td>'+ (idx+1) +'</td>'+
								'<td>'+ one.courseTime +'</td>' +
								'<td>'+ one.courseContent +'</td>' +
							'</tr>';
				});
				console.log(html);
				$('.course-table tbody').html(html);
			},
			error: function(e){
				
			}
	  	})
	  }
	});
	
})
