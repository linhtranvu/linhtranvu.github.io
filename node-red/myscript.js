 

 setTimeout(function(){ 

  document.querySelector("html").insertAdjacentHTML("afterbegin", '<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 0;right: 0;"> <ui-icon style="color:white" icon="home"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg> </ui-icon></span> </button>');


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
