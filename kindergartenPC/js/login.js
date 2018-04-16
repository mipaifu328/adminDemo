$(function(){
	//模拟登陆跳转进入首页
	document.querySelector('#loginBtn').addEventListener('click',function(e){
		e.preventDefault();
		window.location.href='index.html';
	});
	
	//初始化checkbox
	$('input').iCheck({
		checkboxClass: 'icheckbox_flat-green',
		radioClass: 'iradio_flat-green',
		increaseArea: '20%' // optional
	});
});
