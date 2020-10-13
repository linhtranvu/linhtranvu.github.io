
 setTimeout(function(){ 


  $("html").append('<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 0;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>');	  
  
if($('#red-ui-editor').length == 0) {
	

}else{
	
  myAdminHtml = '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;bottom: 20px; right: 80px;z-index: 9999; ">';
  myAdminHtml += '<button id="btn-mobile-edit" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><b>EDIT</b></button>';
  myAdminHtml += '<button id="btn-mobile-nodelist" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><b>+NODE</b></button>';
  myAdminHtml += '<button id="btn-mobile-righlist" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;  "><b>INFO</b></button>';
  
  myAdminHtml += '</div>';
  $("html").append(myAdminHtml);	
  
  // RED.user.logout();
  // RED.touch.radialMenu.active();
  // console.log(RED.view.selection());
  
  console.log(RED);
  
  
}  

  
  

  
  $("#btn-mobile-edit").click(function(){
	  
	  RED.editor.edit(RED.view.selection().nodes[0]);


  })
  
  $("#btn-mobile-nodelist").click(function(){
	
	$(".red-ui-sidebar-control-left").click();	

  })  
  
   $("#btn-mobile-righlist").click(function(){
	
	$(".red-ui-sidebar-control-right").click();	

  })  
  
  


}, 2000);  


webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({hello: "work here"}));

function apphome(){
	
	webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({home: "home"}));
	
}

function loginAdmin(username,password){
  jQuery("html").prepend("<h3>PLEASE WAIT 3S FOR AUTOMATICALLY LOGIN TO PROCEED</h3>")
  var username = username;
  var password = password;
  setTimeout(function(){ 
  var myEle = document.getElementById("node-dialog-login-submit");
		if(myEle){
        
			 document.getElementById("node-dialog-login-username").value = username; 
       document.getElementById("node-dialog-login-password").value = password; 
         jQuery("#node-dialog-login-submit").click();

	  }	

  }, 2000);  


	
}

