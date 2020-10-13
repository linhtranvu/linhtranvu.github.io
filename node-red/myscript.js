
 setTimeout(function(){  


  
if($('#red-ui-editor').length == 0) {

  $("html").append('<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 0;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>');	  
	

}else{
	
  myAdminHtml = '<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 10px;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>';

//Bottom menu		
  myAdminHtml += '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;bottom: 20px; right: 70px;z-index: 9999; ">';
  myAdminHtml += '<button id="btn-mobile-edit" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><b>EDIT</b></button>';
  myAdminHtml += '<button id="btn-mobile-nodelist" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><b>+NODE</b></button>';
  myAdminHtml += '<button id="btn-mobile-righlist" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;  "><b>INFO</b></button>';
  
  myAdminHtml += '</div>';
  $("html").append(myAdminHtml);	
  
  //Top menu
  myAdminHtml = '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 0px; left: 0px;z-index: 9999; ">';
  myAdminHtml += '<button id="btn-mobile-more" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"><b>MORE</b></button>';
  myAdminHtml += '<button id="btn-mobile-undo" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><b>UNDO</b></button>';
  
  myAdminHtml += '</div>';
  $("html").append(myAdminHtml);
  
  //more menu
  myAdminHtml = '<div class="mobile-more-menu controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 40px; left: 0px;z-index: 9999;display:none ">';
  myAdminHtml += '<button id="btn-mobile-delete" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: red;margin-right:25px"><b>DELETE</b></button>';
  myAdminHtml += '<button id="btn-mobile-cut" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;  "><b>CUT</b></button>';  
  myAdminHtml += '<button id="btn-mobile-copy" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><b>COPY</b></button>';
  myAdminHtml += '<button id="btn-mobile-paste" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;  "><b>PASTE</b></button>';
  myAdminHtml += '<button id="btn-mobile-redo" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;  "><b>REDO</b></button>';
  
  
  myAdminHtml += '</div>';
  $("html").append(myAdminHtml);	  
  
  // RED.user.logout();
  // RED.touch.radialMenu.active();
  // console.log(RED.view.selection());
  
  // console.log(RED);
  
  
}  

  
  

  
  $("#btn-mobile-edit").click(function(){
        // RED.actions.add("core:copy-selection-to-internal-clipboard",copySelection);
        // RED.actions.add("core:cut-selection-to-internal-clipboard",function(){copySelection();deleteSelection();});
        // RED.actions.add("core:paste-from-internal-clipboard",function(){importNodes(clipboard);});
        // RED.actions.add("core:delete-selection",deleteSelection);
        // RED.actions.add("core:edit-selected-node",editSelection);
        // RED.actions.add("core:undo",RED.history.pop);
        // RED.actions.add("core:redo",RED.history.redo);
        // RED.actions.add("core:select-all-nodes",selectAll);
        // RED.actions.add("core:zoom-in",zoomIn);
        // RED.actions.add("core:zoom-out",zoomOut);
        // RED.actions.add("core:zoom-reset",zoomZero);
        // RED.actions.add("core:enable-selected-nodes", function() { setSelectedNodeState(false)});
        // RED.actions.add("core:disable-selected-nodes", function() { setSelectedNodeState(true)});	  
	  // RED.editor.edit(RED.view.selection().nodes[0]);
	  RED.actions.invoke("core:edit-selected-node")

  })
  
  $("#btn-mobile-nodelist").click(function(){
	
	RED.actions.invoke("core:toggle-palette")

  })  
  
   $("#btn-mobile-righlist").click(function(){
	
	RED.actions.invoke("core:toggle-sidebar")

  })  
  
  $("#btn-mobile-undo").click(function(){
	
	RED.actions.invoke("core:undo")

  })  

  $("#btn-mobile-more").click(function(){
	
	$(".mobile-more-menu").toggle();

  })  
  
  
  
  
   $("#btn-mobile-redo").click(function(){	
	RED.actions.invoke("core:redo")
  })    
  
   $("#btn-mobile-delete").click(function(){	
	RED.actions.invoke("core:delete-selection")
  })  
   $("#btn-mobile-cut").click(function(){	
	RED.actions.invoke("core:cut-selection-to-internal-clipboard")
  })    
   $("#btn-mobile-copy").click(function(){	
	RED.actions.invoke("core:copy-selection-to-internal-clipboard")
  })   
   $("#btn-mobile-paste").click(function(){	
	RED.actions.invoke("core:paste-from-internal-clipboard")
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

