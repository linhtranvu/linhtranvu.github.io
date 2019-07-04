<script src="./assets/web/assets/jquery/jquery.min.js" type="text/javascript"></script>

<script>

ip = "<?php echo $_SERVER['REMOTE_ADDR'] ?>";

$.get("http://ip-api.com/json/"+ip,function(data){
	if(data.country == "Vietnam"){
		window.location.href = './index_vi.html';
	}else{
		window.location.href = './index_en.html';
	}
	
})



</script>
 
 