function apphome() {
  webkit.messageHandlers.cordova_iab.postMessage(
    JSON.stringify({
      home: "home",
    })
  );
}

// login("http://dashboard.com:1880/ui", "user", "123456");

function login(url, username, password) {
  var element = document.getElementById("nr-dashboard");

  if (typeof element != "undefined" && element != null) {
    //If already login

    var checkExist = setInterval(function () {
      //IF DASHBOARD FOUND, INJECT UI

      if ($("#nr-dashboard").length) {
        $("html").append(
          '<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 0;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>'
        );

        clearInterval(checkExist);
      } //end if check Dashboard existed
    }, 500); // check every 500ms
  } else {
    //Process to login

    var str =
      '<iframe id="MyIFrame" width="100%" height="100%" style="border:none;"></iframe>';
    document.body.insertAdjacentHTML("beforebegin", str);

    var button =
      '<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 0;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>';
    document.body.insertAdjacentHTML("beforebegin", button);

    // alert("login");

    var req = new XMLHttpRequest();
    req.open("POST", url, false, username, password); //use POST to safely send combination
    req.send(); //here you can pass extra parameters through
    // location.reload();

    req.open("POST", url, false); //use POST to safely send combination
    req.send(); //here you can pass extra parameters through
    location.reload();

    // setTimeout(function () {
    //   location.reload();
    // }, 1000);
    //setiFrame's SRC attribute
    // var iFrameWin = document.getElementById(iframeID);
    // iFrameWin.src = iframeURL + "?extraParameters=true";
    //   location.reload();
  }
}
