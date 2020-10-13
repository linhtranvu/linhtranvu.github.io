var checkExist = setInterval(function () {
    if ($('#red-ui-editor').length) {

      myAdminHtml = '<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 10px;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>';

      //Bottom menu		
      myAdminHtml += '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;bottom: 20px; right: 70px;z-index: 9999; ">';
      myAdminHtml += '<button id="btn-mobile-edit" onclick="mobile_edit()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><b>EDIT</b></button>';
      myAdminHtml += '<button id="btn-mobile-nodelist" onclick="mobile_nodelist()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><b>+NODE</b></button>';
      myAdminHtml += '<button id="btn-mobile-righlist" onclick="mobile_righlist()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;  "><b>INFO</b></button>';
      myAdminHtml += '<button id="btn-mobile-refresh"  onclick="mobile_refresh()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #d81b60; " ><b>F5</b></button>';


      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);

      //Top menu
      myAdminHtml = '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 0px; left: 0px;z-index: 9999; ">';
      myAdminHtml += '<button id="btn-mobile-more"  onclick="mobile_more()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"><b>MORE</b></button>';
      myAdminHtml += '<button id="btn-mobile-undo"  onclick="mobile_undo()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><b>UNDO</b></button>';

      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);

      //more menu
      myAdminHtml = '<div class="mobile-more-menu controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 40px; left: 0px;z-index: 9999;display:none ">';
      myAdminHtml += '<button id="btn-mobile-delete" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: red;margin-right:25px"  onclick="mobile_delete()" ><b>DELETE</b></button>';
      myAdminHtml += '<button id="btn-mobile-cut" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"  onclick="mobile_cut()" ><b>CUT</b></button>';
      myAdminHtml += '<button id="btn-mobile-copy" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;"  onclick="mobile_copy()" ><b>COPY</b></button>';
      myAdminHtml += '<button id="btn-mobile-paste" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;"  onclick="mobile_paste()" ><b>PASTE</b></button>';
      myAdminHtml += '<button id="btn-mobile-redo" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;"  onclick="mobile_redo()" ><b>REDO</b></button>';


      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);

      // RED.user.logout();
      // RED.touch.radialMenu.active();
      // console.log(RED.view.selection());

      // console.log(RED);


      clearInterval(checkExist);
    } //end if check existed

    //Check for dashboard

    if ($('#nr-dashboard').length) {

      $("html").append('<button onclick="apphome()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 0;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>');

      clearInterval(checkExist);
    }
  },
  500); // check every 500ms





webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({
  hello: "work here"
}));

function apphome() {

  webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({
    home: "home"
  }));

}

function mobile_edit() {
  RED.actions.invoke("core:edit-selected-node")
}

function mobile_nodelist() {

  RED.actions.invoke("core:toggle-palette")

}

function mobile_righlist() {

  RED.actions.invoke("core:toggle-sidebar")

}

function mobile_undo() {

  RED.actions.invoke("core:undo")

}

function mobile_more() {

  $(".mobile-more-menu").toggle();

}

function mobile_refresh() {

  window.location.reload(true)

}




function mobile_redo() {


  RED.actions.invoke("core:redo")
}

function mobile_delete() {

  RED.actions.invoke("core:delete-selection")
}

function mobile_cut() {
  RED.actions.invoke("core:cut-selection-to-internal-clipboard")
}

function mobile_copy() {
  RED.actions.invoke("core:copy-selection-to-internal-clipboard")
}

function mobile_redo() {
  RED.actions.invoke("core:paste-from-internal-clipboard")
}

function loginAdmin(username, password) {
  var username = username;
  var password = password;
  setTimeout(function () {
    var myEle = document.getElementById("node-dialog-login-submit");
    if (myEle) {

      document.getElementById("node-dialog-login-username").value = username;
      document.getElementById("node-dialog-login-password").value = password;
      jQuery("#node-dialog-login-submit").click();

    }

  }, 2000);



}