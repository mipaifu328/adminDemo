$(function(){
	if($('.website').length>0){
		var width = document.body.offsetHeight - $('.website').height();
		$('.container-fluid').height(width);
	}
})