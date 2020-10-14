var checkExist = setInterval(function () {
    if ($('#red-ui-editor').length) {

      cssHtml = `<style>
        .ui-dialog .ui-dialog-titlebar {
          background: #1c1a1a;
          color: white;
        }
        .red-ui-search {
          width: ${screen.width-50}px;
          left: 70%
        }
      </style>`
      $("html").append(cssHtml);

      myAdminHtml = '<button onclick="mobile_admin_home()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 1000; padding: 10px;border-radius: 50%; position: fixed;bottom: 10px;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>';

      //Bottom menu		
      myAdminHtml += '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;bottom: 20px; right: 70px;z-index: 9999; ">';
      myAdminHtml += '<button id="btn-mobile-edit" onclick="mobile_edit()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><i class="fa fa-edit"></i></button>';
      myAdminHtml += '<button onclick="mobile_search_node()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #9c27b0;"><i class="fa fa-search"></i></button>';

      myAdminHtml += '<button id="btn-mobile-nodelist" onclick="mobile_nodelist()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><b>+NODE</b></button>';
      myAdminHtml += '<button id="btn-mobile-righlist" onclick="mobile_righlist()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;  "><b>INFO</b></button>';
      myAdminHtml += '<button id="btn-mobile-refresh"  onclick="mobile_refresh()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #d81b60; " ><b>F5</b></button>';


      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);

      //Top menu
      myAdminHtml = '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 0px; left: 0px;z-index: 9999; ">';
      myAdminHtml += '<button id="btn-mobile-more"  onclick="mobile_more()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"><b>MORE</b></button>'
      myAdminHtml += '<button id="btn-mobile-undo"  onclick="mobile_undo()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><i class="fa fa-undo"></i></button>';
      myAdminHtml += '<button id="btn-mobile-redo" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;"  onclick="mobile_redo()" ><i class="fa fa-repeat"></i></button>';


      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);

      //More menu
      myAdminHtml = '<div class="mobile-more-menu controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 40px; left: 0px;z-index: 9999;display:none ">';
      myAdminHtml += '<button id="btn-mobile-delete" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: red;margin-right:25px;border-radius:5px""  onclick="mobile_delete()" ><i class="fa fa-trash" style="font-size:30px"></i></button>';
      myAdminHtml += '<button id="btn-mobile-cut" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;border-radius:5px"  onclick="mobile_cut()" ><i class="fa fa-cut" style="font-size:30px"></i></button>';
      myAdminHtml += '<button id="btn-mobile-copy" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;;border-radius:5px"  onclick="mobile_copy()" ><i class="fa fa-copy" style="font-size:30px"></i></button>';
      myAdminHtml += '<button id="btn-mobile-paste" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;;border-radius:5px"  onclick="mobile_paste()" ><i class="fa fa-paste" style="font-size:30px"></i></button>';


      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);


      //Admin context app menu
      contextAppHtml = '<div class="mobile_context_app" style="background-color: black;position: fixed;top: 0px; left: 0px;width:3000px;height:500px;display:none;z-index:500;opacity: 0.5; "></div>';

      contextAppHtml += '<button id=" btn-mobile-delete" class="mobile_context_app ui-button ui-widget ui-corner-all" style="color:white;background-color: red;border-radius:5px;position: fixed;top: 0px; right: 0px;display:none;z-index:9999"  onclick="apphome()" >QUIT APP</button>';
      contextAppHtml += '<div class="mobile_context_app controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 160px; left: 10px;z-index: 9999;display:none ">';
      contextAppHtml += '<button class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;border-radius:5px"  onclick="mobile_mqtt()" >MQTT</button>';
      contextAppHtml += '<button class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;border-radius:5px"  onclick="mobile_location_guide()" >LOCATION</button>';
      contextAppHtml += '<button class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;border-radius:5px"  onclick="mobile_voice()" >VOICE</button>';

      $("html").append(contextAppHtml);

      //Geolocation layout
      myAdminHtml = `     
      <div id="dialog" title="Location Tracking" style="display:none">
      <p > <b>To use location tracking, you need to do these steps:</b></p> 
      <ul>
        <li>Turn on Location setting on Phone</li>
        <li >Create Nodes to receive location data. Below button create a default flows, APp call "HTTP IN" to send location data, then update to MQTT</li>
        <li>Use "Send location" to check if data sent in Debug node</li>
      </ul>
      <p>App use background location tracking, try to send location data even when running in background. However, there is no guarantee for this feature to work perfectly because of "app killing mechanism". <a href="https://dontkillmyapp.com/">Visit here to learn more</a></p>
       <button class = "ui-button ui-widget ui-corner-all"
       style = "color:white;background-color: #1976d2;border-radius:5px"
       onclick = "mobile_create_location_node()" >CREATE LOCATION NODES</button> 
       <button class = "ui-button ui-widget ui-corner-all"
       style = "color:white;background-color:orange;border-radius:5px"
       onclick = "mobile_send_location()" > SEND LOCATION </button>        
      </div>`;
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



// Post message

webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({
  hello: "work here"
}));

function apphome() {

  webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({
    home: "home"
  }));

}

//FUNCTION LIST FOR ADMIN

function mobile_location_guide() {
  $("#dialog").dialog({
    width: screen.width
  });
  $(".mobile_context_app").toggle();
}

function mobile_create_location_node() {

  RED.actions.invoke("core:show-import-dialog");
  $("#red-ui-clipboard-dialog-import-text").val(`[{"id":"b3d47392.90a89","type":"ip","z":"b18b632d.3d3d7","name":"ip","https":false,"timeout":"5000","internalIPv4":false,"internalIPv6":false,"publicIPv4":true,"publicIPv6":false,"x":330,"y":100,"wires":[["d1cea111.5ffa2","d420f642.a1f178"]]},{"id":"75d3a8f5.175928","type":"inject","z":"b18b632d.3d3d7","name":"","topic":"","payload":"","payloadType":"date","repeat":"600","crontab":"","once":true,"onceDelay":"0.1","x":110,"y":100,"wires":[["b3d47392.90a89"]]}]`);

  $("#red-ui-clipboard-dialog-ok").removeClass("ui-button-disabled ui-button-disabled ui-state-disabled");
  $("#red-ui-clipboard-dialog-ok").prop("disabled", false);
  $("#red-ui-clipboard-dialog-ok").click();
  $("#dialog").dialog('close');

}

function mobile_send_location() {

}


function mobile_admin_home() {
  $(".mobile_context_app").toggle();
}

function mobile_edit() {
  RED.actions.invoke("core:edit-selected-node")
}

function mobile_search_node() {
  RED.actions.invoke("core:search")
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

function mobile_paste() {
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