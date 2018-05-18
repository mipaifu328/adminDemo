$(function(){
	//模拟后台数据
	Mock.mock('/loadCourse',{
		"list":[{
			'name': '跳舞'
		},{
			'name': '唱歌'
		},{
			'name': '游戏'
		},{
			'name': '礼仪'
		},{
			'name': '讲故事'
		},{
			'name': '户外'
		},{
			'name': '手工'
		},{
			'name': '交流'
		},{
			'name': '活动'
		},{
			'name': '劳动'
		}]
	});
	Mock.mock('/getCourse',{
		"list":[
			{
			    id:1,
			    title: '跳舞',
			    start:  '2018/5/15 10:20',
			    end: '2018/5/15 11:30'
			},
			{
			    id:2,
			    title: '游戏',
			    start:  '2018/5/15  14:20',
			    end: '2018/5/15  15:20',
			},
			{
			    id:1,
			    title: '唱歌',
			    start:  '2018/5/16 9:30',
			    end: '2018/5/16 11:00'
			},
			{
			    id:2,
			    title: '练字',
			    start:  '2018/5/16 13:20',
			    end: '2018/5/16 16:20',
			},
			{
			    id:1,
			    title: '跳舞',
			    start:  '2018/5/17 10:30',
			    end: '2018/5/17 11:30'
			},
			{
			    id:2,
			    title: '游戏',
			    start:  '2018/5/17  14:20',
			    end: '2018/5/17  15:20',
			},
			{
			    id:1,
			    title: '跳舞',
			    start:  '2018/5/18 10:30',
			    end: '2018/5/18 11:30'
			},
			{
			    id:2,
			    title: '游戏',
			    start:  '2018/5/18  14:20',
			    end: '2018/5/18  15:20',
			}]
		}
	);
	Mock.mock('/updateCourse',{});
	Mock.mock('/addCourse',{});
	Mock.mock('/deleteCourse',{});
	Mock.mock('/deleteEvent',{});
	
	//加载课程列表
	loadCourse();
	
	//增加课程列表
	$('.add-course').on('click',function(){
		var text = $.trim($('.course-input').val());
		if(text !== ''){
			$.ajax({
				url: '/addCourse',
				type: 'post',
				dataType: 'json',
				data: {
				},
				success: function(data) { // 获取当前月的数据
					var $newCourse = $('<div class="fc-event">'+ text +'</div>');
					$('#external-events p').before($newCourse);
					initDrag($newCourse);
				},
				error:function(e){
					console.log(e);
				}
			});
			
		}
	});
	
	//删除课程列表
	$('#external-events').on('dblclick','.fc-event',function(){
		var $this = $(this);
		$.ajax({
				url: '/deleteCourse',
				type: 'post',
				dataType: 'json',
				data: {
				},
				success: function(data) { // 获取当前月的数据
					$this.remove();
				},
				error:function(e){
					console.log(e);
				}
			});
	});
	
    
	//初始化日历
    $('#calendar').fullCalendar({
		defaultView: 'agendaWeek',
		allDaySlot: false,
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'agendaWeek,month'
		},
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar
		events: function(start,end,timezone,callback){
			var date = this.getDate().format('YYYY-MM');
			$.ajax({
				url: '/getCourse',
				type: 'post',
				dataType: 'json',
				data: {
				    'date': date,
				},
				success: function(data) { // 获取当前月的数据
					var events = [];
					$.each(data.list,function(i,c) {
						events.push({
							title: c.title,
							start: c.start ,
							end: c.end
						});
					});
					callback(events);
				},
				error:function(e){
					console.log(e);
				}
			});
		},
		eventDrop: function(event, delta, revertFunc){
			updateTime(event,delta);
		},
		eventResize: function(event, delta, revertFunc){
			updateTime(event,delta);
		},
		eventClick: function(event, jsEvent, view ){
			if(confirm('删除“”'+ event.title +'”课程吗?')){
				deleteEvent(event._id);
			}
		}
	});
    
    
    /**
     * 修改课程时间
     * @param {Object} event
     * @param {Object} delta
     */
    function updateTime(event,delta){
    	var param = {
    		'id': event._id,
    		'title': event.title,
    		'start': event.start ? event.start.format('YYYY-MM-DD HH:mm:ss') : '',
    		'end': event.end ? event.end.format('YYYY-MM-DD HH:mm:ss') : ''
    	}
    	$.ajax({
			url: '/updateCourse',
			type: 'post',
            dataType: 'json',
            data: param,
            success: function(data) { // 获取当前月的数据
                alert(JSON.stringify(param));
            },
			error:function(e){
				console.log(e);
			}
        });
    }
    
    /**
     * 加载课程列表
     * @param {Object} event
     * @param {Object} delta
     */
    function loadCourse(){
    	$.ajax({
			url: '/loadCourse',
			type: 'post',
            dataType: 'json',
            data: {
            	
            },
            success: function(data) {
            	var html = '';
				$.each(data.list, function(index,element) {
					html += '<div class="fc-event">'+ element.name +'</div>';
				});
				$('#external-events p').before(html);
				
				//初始化课程拖拽事件
				$('#external-events .fc-event').each(function() {
					initDrag($(this));
				});
            },
			error:function(e){
				console.log(e);
			}
        });
    }
	
	/**
	 * 初始化课程拖拽事件
	 * @param {Object} $obj 课程jquery对象
	 */
	function initDrag($obj){
		 // store data so the calendar knows to render an event upon drop
		$obj.data('event', {
			title: $.trim($obj.text()), // use the element's text as the event title
	        stick: true // maintain when user navigates (see docs on the renderEvent method)
		});
	
		// make the event draggable using jQuery UI
		$obj.draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
	}
	
	/**
	 * 删除课程日程
	 * @param {Object} eventId 日程id
	 */
	function deleteEvent(eventId){
		$.ajax({
			url: '/deleteEvent',
			type: 'post',
            dataType: 'json',
            data: {
            	id: eventId
            },
            success: function(data) {
            	//删除成功
            	$('#calendar').fullCalendar('refetchEvents'); //重新获取
            },
			error:function(e){
				console.log(e);
			}
        });
	}
})
