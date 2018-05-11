$(function(){
	//模拟后台数据
	Mock.mock('/getCookbook',{   
		"list": [
		    {
				"date":"2018-05-11",
				"cookbook":[
					{
						"type": "早餐",
						"foodlist": [
							{
								"name": "牛奶",
								"url": "http://www.google.com",
								"remark": "营养好"
							},{
								"name": "面包",
								"url": "http://www.google.com",
								"remark": "营养好"
							},{
								"name": "鸡蛋",
								"url": "http://www.google.com",
								"remark": "营养好"
							}
						]
					},{
						"type": "午餐",
						"foodlist": [
							{
								"name": "番茄炒蛋",
								"url": "http://www.google.com",
								"remark": "营养好"
							},{
								"name": "香菇滑鸡",
								"url": "http://www.google.com",
								"remark": "营养好"
							},{
								"name": "莲藕排骨汤",
								"url": "http://www.google.com",
								"remark": "营养好"
							}
						]
					}
				]
		    },{
				"date":"2018-05-12",
				"cookbook":[
					{
						"type": "早餐",
						"foodlist": [
							{
								"name": "益力多",
								"url": "http://www.google.com",
								"remark": "营养好"
							},{
								"name": "三明治",
								"url": "http://www.google.com",
								"remark": "营养好"
							}
						]
					},{
						"type": "午餐",
						"foodlist": [
							{
								"name": "红烧排骨",
								"url": "http://www.google.com",
								"remark": "营养好"
							},{
								"name": "韭黄炒蛋",
								"url": "http://www.google.com",
								"remark": "营养好"
							},{
								"name": "瑶柱虾仁汤",
								"url": "http://www.google.com",
								"remark": "营养好"
							}
						]
					}
				]
		    }
	    ]
	});
	
	var activeDate = new Date();  //当前显示的周数对应的日期参照
	var isSave = true;		//当前是否已保存
	var activeLen = 0;		//当前保存了的菜谱数
	
    init();
    
    
    //禁止选中文本
    document.querySelector('.cookbook-container').onselectstart=function() {
        return false;
    };
    
    //删除
    $('.calendar-container').on('dblclick','.food-list-items',function(){
    	$(this).remove();
    	
    	//删除，需要保存
      	isSave = false;
    })
	
	//上一周
	$('.calendar-tool').on('click','.js_prev_week',function(){
		if(!isSave ){
			submitCookbook();
		}
		activeDate = new Date(activeDate.getTime() - 1000 * 60 * 60 * 24 * 7);
		init(activeDate);
	});
	//下一周
	$('.calendar-tool').on('click','.js_next_week',function(){
		if(!isSave){
			submitCookbook();
		}
		activeDate = new Date(activeDate.getTime() + 1000 * 60 * 60 * 24 * 7);
		init(activeDate);
	});
	//回到本周
	$('.calendar-tool').on('click','.js_this_week',function(){
		if(!isSave){
			submitCookbook();
		}
		activeDate = new Date();
		init(activeDate);
	});
	
	//保存菜谱
	$('.calendar-tool').on('click','.js_save',function(){
		submitCookbook();
	})
    
    /**
     * 初始化具体某个日期对应的周食谱
     * @param {String | Object} date  日期
     */
    function init(date){
    	
    	allLen = 0; //初始化重置
    	isSave = true;//初始化重置
    	
    	
		var types = ['早餐','课间','午餐','下午茶','晚餐'];
    	var today = date ? new Date(date) : new Date();
    	var day = today.getDay();
    	var monday = new Date(today.getTime() - 1000 * 60 *60 *24 * (day - 1));
    	var tuesday = new Date(monday.getTime() + 1000 * 60 *60 *24);
    	var wednesday = new Date(tuesday.getTime() + 1000 * 60 *60 *24);
    	var thursday = new Date(wednesday.getTime() + 1000 * 60 *60 *24);
    	var friday = new Date(thursday.getTime() + 1000 * 60 *60 *24);
    	var saturday = new Date(friday.getTime() + 1000 * 60 *60 *24);
    	var sunday = new Date(saturday.getTime() + 1000 * 60 *60 *24);
    	//创建日期和星期
    	var theadHtml = '<table>' +
						'<thead>' +
							'<tr>' +
								'<th></th>' +
								'<th>周一（'+ (monday.getMonth()+1) +'/'+ monday.getDate() +'）</th>' +
								'<th>周二（'+ (tuesday.getMonth()+1) +'/'+ tuesday.getDate() +'）</th>' +
								'<th>周三（'+ (wednesday.getMonth()+1) +'/'+ wednesday.getDate() +'）</th>' +
								'<th>周四（'+ (thursday.getMonth()+1) +'/'+ thursday.getDate() +'）</th>' +
								'<th>周五（'+ (friday.getMonth()+1) +'/'+ friday.getDate() +'）</th>' +
								'<th>周六（'+ (saturday.getMonth()+1) +'/'+ saturday.getDate() +'）</th>' +
								'<th>周日（'+ (sunday.getMonth()+1) +'/'+ sunday.getDate() +'）</th>' +
							'</tr>'
						'</thead>'
					'</table>';
					
		//创建食谱类型
		var tbodyHtml =  '<table><tbody>'
		for(var i = 0, len = types.length; i < len; i++){
			tbodyHtml += '<tr><td>' + types[i] + '</td>';
			for(var j = 0; j < 7; j++){
				tbodyHtml += '<td><div class="food-box" data-date="' + new Date(monday.getTime() + 1000 * 60 *60 *24 * j).toLocaleDateString() +'" data-type="'+ types[i] +'"></div></td>';
			}
			tbodyHtml += '</tr>';
		}
		
		tbodyHtml += '</tbody></table>';
    	$('.calendar-view').html(theadHtml+tbodyHtml);
    	initDragEvent();
    	loadCookbook();
    }
    
    /**
     * 拖拽
     */
    function initDragEvent(){
    	$('.calendar-container .food-box').sortable({
	      revert: true
	    });
	    $('.food-list-items').draggable({
	      connectToSortable: '.food-box',
	      opacity: 0.7,
	      helper: 'clone',
	      cursor: 'move',
	      revert: 'invalid',
	      stop: function(){
	      	//拖拽完，判断是菜谱否有改动，则保存
	      	var len = $('.calendar-container .food-list-items').length;
	      	if(len !== activeLen){
	      		isSave = false;
	      	}
	      }
	    });
    }
	
    /**
     * 加载菜谱
     */
    function loadCookbook(){
    	$.ajax({
    		url: '/getCookbook',
    		type:"post",
			data:{},
			dataType:"json",
			success:function(data){
				$.each(data.list, function(index,element) {
					var date = new Date(element.date).toLocaleDateString();	//日期
					
					$.each(element.cookbook, function(idx,ele) {
						var type = ele.type;
						var foodlist = ele.foodlist;
						for(var i = 0, len = foodlist.length; i < len; i++){
							var html = '<div class="food-list-items">'+ foodlist[i].name +'</div>';
							$('[data-date="' + date + '"][data-type="' + type + '"]').append(html);
						}
					});
					
				});
    			allLen = $('.calendar-container .food-list-items').length;
			},
			error:function(e){
				console.log(e);
			}
    	})
    }
    
    
    /*
     * 提交菜谱
     */
    
    function submitCookbook(){
    	var list = [];
    	//获取菜谱json
    	$('.food-box').each(function(){
    		var $this = $(this);
    		var $foodLists = $this.find('.food-list-items');
    		if($foodLists.length > 0){
    			var date = $this.attr('data-date');
    			var type = $this.attr('data-type');
    			for(var i = 0, len = $foodLists.length; i < len; i++){
    				var name = $foodLists.eq(i).text();
    				list.push({
    					'date':date,
    					'type':type,
    					"name": name
    				})
    			}
    		}
    	});
    	
    	//具体根据后台需要调整数据结构
    	alert('(具体根据后台需要调整数据结构)\n'+JSON.stringify(list));
    	
    	$.ajax({
    		url: '/getCookbook',
    		type:"post",
			data:{
				list: list
			},
			dataType:"json",
			success:function(data){
				isSave = true;
			},
			error:function(e){
				console.log(e);
			}
    	})
    }
	
})
