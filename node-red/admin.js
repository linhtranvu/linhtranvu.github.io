var params_dashboard = {
    url: 'http://admin.com:1880/ui',
    username: 'user',
    password: '123456'
}

var location_url = "http://admin.com:1880"; // Dont allow to comment out.Global variable, must keep

// $.getScript("https://cdn.jsdelivr.net/npm/sweetalert2@10", function () {});

var checkExist = setInterval(function () {


        //ADMIN UI FOUND
        if ($('#red-ui-editor').length) {

            // swal("1111");

            //Process CSS to get a Clean UI for Mobile

            $("#red-ui-header-button-user").parent().hide();
            $("#red-ui-header-button-deploy-icon").hide();
            $(".red-ui-header-logo").hide();

            cssHtml = `<style>
        .ui-dialog .ui-dialog-titlebar {
          background: #1976d2;
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

            //Sidebar button 
            $("#red-ui-palette").append( /*html*/ `<button id="btn-mobile-nodelist" onclick="mobile_nodelist()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;top:calc(50% - 26px);position:absolute;left:calc(100%);z-index:90  "><b> + <br> + </b></button>`)



            //Admin home button
            myAdminHtml = /*html*/ `
      <button onclick="mobile_admin_home()" class="md-raised md-button md-ink-ripple" type="button" aria-label="button" style="color:white; background-color: orange; z-index: 9999; padding: 10px;border-radius: 50%; position: fixed;bottom: 10px;right: 0;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg></button>`;

            //Bottom menu		
            myAdminHtml += /*html*/ `
      <div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;bottom: 20px; right: 70px;z-index: 1000; ">
        <button id="btn-mobile-edit" onclick="mobile_edit()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><i class="fa fa-edit"></i> Edit</button>   
        <button id="btn-mobile-righlist" onclick="mobile_righlist()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;">Info</button>           
        <button onclick="mobile_search_node()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #9c27b0;"><i class="fa fa-search"></i></button>
        <button id="btn-mobile-refresh"  onclick="mobile_refresh()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #d81b60; " ><b>F5</b></button>
      </div>`;

            $("html").append(myAdminHtml);

            //Top menu
            myAdminHtml = /*html*/ `
      <div class="controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 0px; left: 0px;z-index: 1000; ">
        <button onclick="mobile_more()"  class="no-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><b>MORE</b></button>
        <button onclick="mobile_undo()"  class="no-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;  "><i class="fa fa-undo"></i></button>
        <button class="no-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;"  onclick="mobile_redo()" ><i class="fa fa-repeat"></i></button>
<!--
        <button id="btn-editor" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"  onclick="addIframeHtml()" ><b>EDITOR</b></button>
        <button id="btn-editor-reload" class="editor-mode ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;display:none"  onclick="loadDashboarIframe()" ><b>RELOAD</b></button>
        <button class=" ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45"  onclick="document.getElementById('iframe_dahsboard').contentWindow.location.reload()" ><b>F5</b></button>
        <div class='container_btn_save_layout'></div>
!-->
      </div>`
            $("html").append(myAdminHtml);

            //More menu
            myAdminHtml = /*html*/ `
      <div class="mobile-more-menu controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 40px; left: 0px;z-index: 1000;display:none ">
        <button id="btn-mobile-delete" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: red;margin-right:25px;border-radius:5px""  onclick="mobile_delete()" ><i class="fa fa-trash" style="font-size:30px"></i></button>
        <button id="btn-mobile-cut" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;border-radius:5px"  onclick="mobile_cut()" ><i class="fa fa-cut" style="font-size:30px"></i></button>
        <button id="btn-mobile-copy" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;;border-radius:5px"  onclick="mobile_copy()" ><i class="fa fa-copy" style="font-size:30px"></i></button>
        <button id="btn-mobile-paste" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;;border-radius:5px"  onclick="mobile_paste()" ><i class="fa fa-paste" style="font-size:30px"></i></button>
      </div>`;
            $("html").append(myAdminHtml);


          //Admin context app menu
          contextAppHtml = /*html*/ `
          <div class="mobile_context_app" style="background-color: black;position: fixed;top: 0px; left: 0px;width:3000px;height:5000px;display:none;z-index:1010;opacity: 0.8; "></div>
          <button id=" btn-mobile-delete" class="mobile_context_app ui-button ui-widget ui-corner-all" style="color:white;background-color:red;position: fixed;top: 0px; right: 0px;display:none;z-index:1020;font-size:15px"  onclick="apphome()" ><i class="fa fa-power-off"></i>&nbsp;&nbsp;QUIT ADMIN</button>
          <div class="mobile_context_app controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;top: 160px; left: 10px;z-index: 1020;display:none ">
            <!--<button class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;border-radius:5px"  onclick="mobile_mqtt()" >MQTT</button>-->
            <button class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #1976d2;border-radius:5px"  onclick="mobile_location_guide()" >
                <i style='font-size:45px' class="fa fa-map-marker"></i><br><br>
                <b>LOCATION</b>
            </button>
            <!--<button class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;border-radius:5px"  onclick="mobile_voice()" >VOICE</button>-->
          </div>`

          $("html").append(contextAppHtml);

          //Geolocation layout (Dialog popup) 
          myAdminHtml = /*html*/ `     
          <div id="dialog" title="Location Tracking" style="display:none">
          <div id='dialog_content_test_loc'>If created location nodes, show Debug to see data</div>
          <div id='dialog_content'>
            <p > <b>To use location tracking, you need to do these steps:</b></p> 
            <ul>
                <li>Save Location Setting</li>
                <li>Create Nodes to receive location data.Below button create a
                default flows, App will POST location data to <b> <span style = "color:blue" > "${location_url}?lat=lat_data&lon=lon_data" </span></b > and update to map</li>
                <li>Use "Test" in Location Setting to debug.</li>
            </ul>
            <p>No guarantee for background tracking work perfectly because of <a href="https://dontkillmyapp.com/">App killing mechanism</a></p>
          </div>
          <button class = "btn-create-location ui-button ui-widget ui-corner-all"
          style = "color:white;background-color: #1976d2;border-radius:5px"
          onclick = "mobile_create_location_node()" >CREATE LOCATION NODES</button> 
          <!--<button class = "ui-button ui-widget ui-corner-all"
          style = "color:white;background-color:orange;border-radius:5px"
          onclick = "mobile_send_location()" > TEST LOCATION </button> -->
          </div>`;
          $("html").append(myAdminHtml);


            clearInterval(checkExist);
        } //end if check Admin existed

    },
    500); // check every 500ms



// Post message
function apphome() {

    webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({
        home: "home"
    }));

}

//FUNCTION LIST FOR ADMIN

function mobile_location_guide() {
    $("#dialog").dialog({
        width: 0.95*screen.width,
        height: screen.height - 200,
    });
    $('.btn-create-location, #dialog_content').show()
    $('#dialog_content_test_loc').hide()
    $(".mobile_context_app").toggle();
}

function mobile_create_location_node() {

    RED.actions.invoke("core:show-import-dialog");
    $("#red-ui-clipboard-dialog-import-text").val(`
[
    {
        "id": "aea403fb.fe3e38",
        "type": "http in",
        "z": "a7b82102.9b8d38",
        "name": "POST Location",
        "url": "/location",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 180,
        "y": 680,
        "wires": [
            [
                "dea7069f.fe6408",
                "8ee57422.db181",
                "718d2eb8.af3c6",
                "aa317b6c.ce7fe8",
                "907686df.c5f198"
            ]
        ]
    },
    {
        "id": "8ee57422.db181",
        "type": "debug",
        "z": "a7b82102.9b8d38",
        "name": "Debug Location",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 280,
        "y": 960,
        "wires": []
    },
    {
        "id": "dea7069f.fe6408",
        "type": "http response",
        "z": "a7b82102.9b8d38",
        "name": "",
        "statusCode": "",
        "headers": {
            "content-type": "text/html"
        },
        "x": 350,
        "y": 780,
        "wires": []
    },
    {
        "id": "408a907d.418de8",
        "type": "ui_ui_control",
        "z": "a7b82102.9b8d38",
        "name": "When connect",
        "events": "connect",
        "x": 320,
        "y": 840,
        "wires": [
            [
                "9276f3da.e84988"
            ]
        ]
    },
    {
        "id": "9276f3da.e84988",
        "type": "switch",
        "z": "a7b82102.9b8d38",
        "name": "=true",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "connect",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 1,
        "x": 470,
        "y": 840,
        "wires": [
            [
                "73186778.3c4848"
            ]
        ]
    },
    {
        "id": "718d2eb8.af3c6",
        "type": "function",
        "z": "a7b82102.9b8d38",
        "name": "Save Latest Location",
        "func": "//global.set('pos',[])\\nvar currentLoc = global.get('pos') || [];\\n\\n//Save Location history, for other usage\\nvar locHistory = global.get('locHistory') || [];\\nlocHistory.push(msg.payload[0])\\nif(locHistory.length > 500){ //Maxium location saved\\n    locHistory.shift();\\n}\\n\\n//Search array for current Device location, update\\nfor (var i in currentLoc) {\\n if (currentLoc[i].name == msg.payload[0].name) {\\n    currentLoc[i].lat = msg.payload[0].lat;\\n    currentLoc[i].lon = msg.payload[0].lon;\\n    currentLoc[i].icon = msg.payload[0].icon;\\n    currentLoc[i].iconColor = msg.payload[0].iconColor;\\n    currentLoc[i].time = msg.payload[0].time;\\n    global.set('pos',currentLoc);\\n    return msg;\\n }\\n}\\n//If no existed device saved\\ncurrentLoc.push(msg.payload[0])\\nglobal.set('pos',currentLoc);\\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 460,
        "y": 480,
        "wires": [
            []
        ]
    },
    {
        "id": "73186778.3c4848",
        "type": "function",
        "z": "a7b82102.9b8d38",
        "name": "Get Latest Location",
        "func": "//global.set('pos',[])\\nmsg.payload = global.get('pos');\\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 660,
        "y": 840,
        "wires": [
            [
                "8ee57422.db181",
                "73bf9c7f.bd608c"
            ]
        ]
    },
    {
        "id": "aa317b6c.ce7fe8",
        "type": "ui_worldmap",
        "z": "a7b82102.9b8d38",
        "group": "f6cc6a.538f6398",
        "order": 1,
        "width": 0,
        "height": 0,
        "name": "",
        "lat": "16.072",
        "lon": "108.250",
        "zoom": "14",
        "layer": "OSM",
        "cluster": "",
        "maxage": "",
        "usermenu": "hide",
        "layers": "hide",
        "panit": "false",
        "panlock": "false",
        "zoomlock": "false",
        "hiderightclick": "true",
        "coords": "none",
        "showgrid": "false",
        "path": "/worldmap",
        "x": 980,
        "y": 520,
        "wires": []
    },
    {
        "id": "73bf9c7f.bd608c",
        "type": "delay",
        "z": "a7b82102.9b8d38",
        "name": "Delay for map load",
        "pauseType": "delay",
        "timeout": "7",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 650,
        "y": 720,
        "wires": [
            [
                "aa317b6c.ce7fe8",
                "907686df.c5f198"
            ]
        ]
    },
    {
        "id": "907686df.c5f198",
        "type": "worldmap-tracks",
        "z": "a7b82102.9b8d38",
        "name": "",
        "depth": 20,
        "layer": "combined",
        "x": 770,
        "y": 440,
        "wires": [
            [
                "aa317b6c.ce7fe8"
            ]
        ]
    },
    {
        "id": "f6cc6a.538f6398",
        "type": "ui_group",
        "z": "",
        "name": "map",
        "tab": "afd9c0f1.b47828",
        "order": 1,
        "disp": true,
        "width": "6",
        "collapse": false
    },
    {
        "id": "afd9c0f1.b47828",
        "type": "ui_tab",
        "z": "",
        "name": "Test Tab 1",
        "icon": "dashboard",
        "order": 1,
        "disabled": false,
        "hidden": false
    }
]    
    `);

    $("#red-ui-clipboard-dialog-ok").removeClass("ui-button-disabled ui-button-disabled ui-state-disabled");
    $("#red-ui-clipboard-dialog-ok").prop("disabled", false);
    $("#red-ui-clipboard-dialog-ok").click();
    $("#dialog").dialog('close');

}

function mobile_send_location() {
  $('.btn-create-location, #dialog_content').hide()
  $('#dialog_content_test_loc').html('If created location nodes, show Debug to see data')
  $('#dialog_content_test_loc').show()
  $('.ui-dialog').css({
    width: 0.6*screen.width,
    height: '200px'
  })
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


function mobile_search_node() {
    RED.actions.invoke("core:search")
}


function mobile_nodelist() {

    RED.actions.invoke("core:toggle-palette")

}

function mobile_righlist() {

    RED.actions.invoke("core:toggle-sidebar")
    // $('.red-ui-sidebar-control-right').click()

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


function loginAdmin(username, password, params_admin_url, dashboard_url, dashboar_username, dashboard_password, call_url) {

    params_dashboard = {
        url: dashboard_url,
        username: dashboar_username,
        password: dashboard_password
    }
    console.log(call_url);

    location_url = call_url; //Variable location_url is global to use in other function
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