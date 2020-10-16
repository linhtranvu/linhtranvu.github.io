// Important API
// RED.search.search("8f364e30.2b8a3") 
// RED.editor.edit(a[0].node)
//  src = "${params_dashboard.url}/?username=${params_dashboard.username}&token=${params_dashboard.password}"

var params_dashboard = {
  url: 'http://localhost:1880/ui',
  username: 'user',
  password: '123456'
}

var checkExist = setInterval(function () {


    //ADMIN UI FOUND
    if ($('#red-ui-editor').length) {

      //Process CSS to get a Clean UI for Mobile

      $("#red-ui-header-button-user").parent().hide();
      $("#red-ui-header-button-deploy-icon").hide();
      $(".red-ui-header-logo").hide();

      cssHtml = `<style>
        .ui-dialog .ui-dialog-titlebar {
          background: #1c1a1a;
          color: white;
        }
        .red-ui-search {
          width: ${screen.width-50}px;
          left: 70%
        }

        .red-ui-editor .form-row input, .red-ui-editor .form-row div[contenteditable="true"], .red-ui-editor-dialog .form-row input, .red-ui-editor-dialog .form-row div[contenteditable="true"] {
          width: 50%;
        }
        

        
      </style>`
      $("html").append(cssHtml);


      //Admin home button
      myAdminHtml = '<button onclick="mobile_admin_home()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 9999; padding: 10px;border-radius: 50%; position: fixed;bottom: 10px;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>';

      //Bottom menu		
      myAdminHtml += '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;bottom: 20px; right: 70px;z-index: 1000; ">';
      myAdminHtml += '<button id="btn-mobile-edit" onclick="mobile_edit()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><i class="fa fa-edit"></i></button>';
      myAdminHtml += '<button onclick="mobile_search_node()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #9c27b0;"><i class="fa fa-search"></i></button>';

      myAdminHtml += '<button id="btn-mobile-nodelist" onclick="mobile_nodelist()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><b>+NODE</b></button>';
      myAdminHtml += '<button id="btn-mobile-righlist" onclick="mobile_righlist()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;  "><b>INFO</b></button>';
      myAdminHtml += '<button id="btn-mobile-refresh"  onclick="mobile_refresh()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #d81b60; " ><b>F5</b></button>';


      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);

      //Top menu
      myAdminHtml = '<div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 0px; left: 0px;z-index: 1000; ">';
      myAdminHtml += '<button id="btn-mobile-more"  onclick="mobile_more()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"><b>MORE</b></button>'
      myAdminHtml += '<button id="btn-mobile-undo"  onclick="mobile_undo()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><i class="fa fa-undo"></i></button>';
      myAdminHtml += '<button id="btn-mobile-redo" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;"  onclick="mobile_redo()" ><i class="fa fa-repeat"></i></button>';
      myAdminHtml += '<button class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;"  onclick="addIframeHtml()" ><i class="fa fa-window-maximize"></i></button>';


      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);

      //More menu
      myAdminHtml = '<div class="mobile-more-menu controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 40px; left: 0px;z-index: 1000;display:none ">';
      myAdminHtml += '<button id="btn-mobile-delete" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: red;margin-right:25px;border-radius:5px""  onclick="mobile_delete()" ><i class="fa fa-trash" style="font-size:30px"></i></button>';
      myAdminHtml += '<button id="btn-mobile-cut" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;border-radius:5px"  onclick="mobile_cut()" ><i class="fa fa-cut" style="font-size:30px"></i></button>';
      myAdminHtml += '<button id="btn-mobile-copy" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;;border-radius:5px"  onclick="mobile_copy()" ><i class="fa fa-copy" style="font-size:30px"></i></button>';
      myAdminHtml += '<button id="btn-mobile-paste" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;;border-radius:5px"  onclick="mobile_paste()" ><i class="fa fa-paste" style="font-size:30px"></i></button>';


      myAdminHtml += '</div>';
      $("html").append(myAdminHtml);


      //Admin context app menu
      contextAppHtml = '<div class="mobile_context_app" style="background-color: black;position: fixed;top: 0px; left: 0px;width:3000px;height:5000px;display:none;z-index:1010;opacity: 0.8; "></div>';

      contextAppHtml += '<button id=" btn-mobile-delete" class="mobile_context_app ui-button ui-widget ui-corner-all" style="color:white;background-color:red;position: fixed;top: 0px; right: 0px;display:none;z-index:1020;font-size:15px"  onclick="apphome()" ><i class="fa fa-power-off"></i>&nbsp;&nbsp;QUIT ADMIN</button>';
      contextAppHtml += '<div class="mobile_context_app controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 160px; left: 10px;z-index: 1020;display:none ">';
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
        <li>Create Nodes to receive location data.Below button create a
        default flows, App will call <span style="color:blue"> "${admin_url}location/lat=lat_data&lon=lon_data"</span> to send location data, then update to MQTT</li>
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


//Add HTML for iframe Dashboard
function addIframeHtml() {

  if ($("#iframe_dahsboard").length) {

  } else {
    myAdminHtml = `
      <iframe id = "iframe_dahsboard"
      src = "${params_dashboard.url}/?username=${params_dashboard.username}&token=${params_dashboard.password}"
      style = "z-index:1200;position: fixed;top: 40px;left: 0;"
      width = "100%"
      height = "100%" > No iframe support </iframe>
      <button onclick="$('#iframe_dahsboard').toggle()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;position: fixed;top: 0px; left: 300px;z-index: 1050; "><i class="fa fa-window-close"></i></button>
      `
    $("html").append(myAdminHtml);
    $('#iframe_dahsboard').on('load', function () {
      loadDashboarIframe(2000);
    });
  }



}

function loadDashboarIframe(interval) {

  var checkExist = setInterval(function () {

      console.log('find dashboard')

      //ADMIN UI FOUND
      if ($("#iframe_dahsboard").contents().find('md-content').length) {
        clearInterval(checkExist);

        console.log('found!')

        $("#iframe_dahsboard").contents().find("md-card").css("border", "2px solid #120f4a").click(function (event) {

          /*
          let labelName = $(this).find("label").html();
          console.log(labelName);
          if (labelName == undefined) {
            labelName = $(this).find(".label").html();
          }
          RED.actions.invoke("core:search");
          $(".red-ui-searchBox-input").val(labelName)

          // RED.actions.invoke("core:edit-selected-node");
          $("#red-ui-search").css("z-index","9999");

          var e = $.Event("keydown");
          e.which = 13; //choose the one you want
          e.keyCode = 13;
          $(".red-ui-searchBox-input").trigger(e);
          $(".red-ui-searchBox-form").submit();
          */

          let searchNode = RED.search.search($(this).attr("node-id"));
          RED.editor.edit(searchNode[0].node);
          setEditPanelLayout(1);

        }) //End handle click on UI node

        $("#iframe_dahsboard").contents().find("ui-card-panel").css("border", "1px solid red")


      } //end if check existed

    },
    500); // check every 500ms	  
}

function mobile_location_guide() {
  $("#dialog").dialog({
    width: screen.width,
    height: screen.height - 200,
  });
  $(".mobile_context_app").toggle();
}

function mobile_create_location_node() {

  RED.actions.invoke("core:show-import-dialog");
  $("#red-ui-clipboard-dialog-import-text").val(`[{"id":"daf21f1.bb4216","type":"http in","z":"b18b632d.3d3d7","name":"Get Location","url":"/location","method":"get","upload":false,"swaggerDoc":"","x":810,"y":260,"wires":[["b668cfa6.11cc2","b821bdc5.79e3b8","864b8ed5.23895"]]},{"id":"864b8ed5.23895","type":"http response","z":"b18b632d.3d3d7","name":"","statusCode":"","headers":{"content-type":"text/html"},"x":1010,"y":240,"wires":[]},{"id":"b668cfa6.11cc2","type":"mqtt out","z":"b18b632d.3d3d7","name":"","topic":"phone/location","qos":"","retain":"","broker":"b5997a7e.f2121","x":1020,"y":320,"wires":[]},{"id":"b821bdc5.79e3b8","type":"debug","z":"b18b632d.3d3d7","name":"Debug Location","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":990,"y":380,"wires":[]},{"id":"b5997a7e.f2121","type":"mqtt-broker","z":"","name":"MQTT Server","broker":"localhost","port":"1883","clientid":"","usetls":false,"compatmode":false,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","closeTopic":"","closeQos":"0","closePayload":"","willTopic":"","willQos":"0","willPayload":""}]`);

  $("#red-ui-clipboard-dialog-ok").removeClass("ui-button-disabled ui-button-disabled ui-state-disabled");
  $("#red-ui-clipboard-dialog-ok").prop("disabled", false);
  $("#red-ui-clipboard-dialog-ok").click();
  $("#dialog").dialog('close');

}

function mobile_send_location() {
  webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({
    location: "location"
  }));
}


function mobile_admin_home() {
  $(".mobile_context_app").toggle();
}

function mobile_edit() {
  RED.actions.invoke("core:edit-selected-node");
  setEditPanelLayout(0)

}


function setEditPanelLayout(deploy) {

  setTimeout(function () {
    $("#red-ui-editor-stack").css("z-index", "9999")
    $("#node-input-method").css("width", "50%")
    $(".red-ui-typedInput-container").css("width", "37%")
    $(".red-ui-tab-link-buttons,#node-input-lookup-group").css("right", "70px")
    $("#red-ui-editor-stack").find("select").css("width", "50%")
    $("#red-ui-editor-stack").find("input:text").css("width", "50%")
    $("#red-ui-editor-stack").find("#node-input-format-editor").css("width", "80%")

    if (deploy == 1) { //Nếu cho deploy sau khi bấm Lưu

      let count = 0;
      $("#node-dialog-ok").click(function () {

        count++;
        var checkExist = setInterval(function () {

            if (count == 6) {
              clearInterval(checkExist);
            }

            if (!$("#red-ui-header-button-deploy").hasClass("disabled")) {
              clearInterval(checkExist);
              RED.actions.invoke("core:deploy-flows");
              loadDashboarIframe(2000)
            }

          },
          500); // check every 500ms

      })
    }
  }, 1000) //End settimeout, chờ 1s sau khi mở edit panel

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

var admin_url = "";

function loginAdmin(username, password, params_admin_url, params_dashboard) {

  params_dashboard = params_dashboard;
  admin_url = params_admin_url;
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