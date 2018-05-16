$(function(){
	//模拟后台数据
	Mock.mock('/getCourse',{
		"list":[
			{
			    id:1,
			    title: '跳舞',
			    start:  '2018/5/15 10:30',
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
	/* initialize the external events
    -----------------------------------------------------------------*/

    $('#external-events .fc-event').each(function() {

      // store data so the calendar knows to render an event upon drop
      $(this).data('event', {
        title: $.trim($(this).text()), // use the element's text as the event title
        stick: true // maintain when user navigates (see docs on the renderEvent method)
      });

      // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex: 999,
        revert: true,      // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
      });

    });


    /* initialize the calendar
    -----------------------------------------------------------------*/

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
				}
			});
		},
		drop: function() {
			
		},
		eventDrop: function(event, delta, revertFunc){
			updateTime(event,delta);
		},
		eventResize: function(event, delta, revertFunc){
			updateTime(event,delta);
		}
	});
    
    
    /**
     * 修改课程时间
     * @param {Object} event
     * @param {Object} delta
     */
    function updateTime(event,delta){
    	var param = {
    		'title': event.title,
    		'start': event.start.format('YYYY-MM-DD HH:mm:ss'),
    		'end': event.end.format('YYYY-MM-DD HH:mm:ss')
    	}
    	$.ajax({
			url: '/updateCourse',
			type: 'post',
            dataType: 'json',
            data: param,
            success: function(data) { // 获取当前月的数据
                alert(JSON.stringify(param));
            }
        });
    }
	
})
