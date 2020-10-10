// var tag = document.createElement("<a>dsdsds</a>");
// var element = document.getElementsByTagName("html");
// element.innerHTML ="<a>dsdsdsdsds</a><br>dsdsds<br>dsdsds<br>dsdsds<br>dsdsds<br>dsdsds<br>dsdsds<br>dsdsds";
document.querySelector("html").insertAdjacentHTML("afterbegin", '<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1; padding: 10px;border-radius: 50%; position: fixed;bottom: 0;right: 0;"> <ui-icon style="color:white" icon="home"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg> </ui-icon></span> </button>');

webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({hello: "work here"}));

function apphome(){
	
	webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({home: "home"}));
	
}



