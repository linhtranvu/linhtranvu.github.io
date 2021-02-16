//Add HTML for iframe Dashboard
var currentTab = "";
var tab_node_id = "";
var iframe = "";
var currentSelectNode = "";
var currentSelectNodeObject = null;
var isLayoutOpen = false;
var enableGridMove = false;
var globalDashboardNode = "";
var editorNodeTypeList = [];
var myChart = []


var checkExistContainer = setInterval(function () {

  var element_container = document.getElementById("btn-editor-container");
  if (typeof element_container != "undefined" && element_container != null) {

    clearInterval(checkExistContainer);
    $("#btn-editor-container").html(
      `<button id="btn-editor" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"  onclick="addIframeHtml()" >EDITOR</button>`
    );    
  }    

}, 1000); // check every 500ms


jQuery.fn.outerHTML = function (s) {
  return s
    ? this.before(s).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
};


//Bottom menu Editor Mode
myAdminHtml = /*html*/ `
  <div class="editor-mode controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;bottom: 20px; right: 70px;z-index: 520;display:none ">
      <button onclick="editDashboardNode()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><i class="fa fa-edit"></i> Node</button>   
    <!--<button onclick="addNewNode()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;">Add Node</button> -->          
    <button onclick="toggleGridMove()"  class="btn-enable-grid ui-button ui-widget ui-corner-all" style="color:white;background-color: #9c27b0;"><i class="fa fa-arrows-alt"></i> <span></span></button> 
    <button onclick="edit_theme()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #d81b60; " ><i class="fa fa-cog"></i></button>
  </div>`;

$("html").append(myAdminHtml);

function addIframeHtml() {
  if ($(".editor-mode").is(":visible")) {
    $(".editor-mode").hide();
    $("#btn-editor").html("Editor")
  } else {
    $(".editor-mode").show();
    $("#btn-editor").html("Admin");
  }

  if ($(".no-editor").is(":visible")) {
    $(".no-editor").hide();
  } else {
    $(".no-editor").show();
  }

  if ($(".red-ui-deploy-button-group").is(":visible")) {
    $(".red-ui-deploy-button-group").hide();
  } else {
    $(".red-ui-deploy-button-group").show();
  }
  
  

  // $(".editor-mode").toggle();
  // $(".no-editor").toggle();
  if ($("#iframe_dashboard").length) {
    $("#iframe_dashboard").toggle();
  } else {
    Swal.fire(
      "WYSIWYG Editor for Dashboard",
      "Dashboard 2.24.1 above (27 Nov 2020) required. Support default node, worldmap. If you need a custom node supported, drop me email. To start, select a Tab and press Edit"
    );
    // alert(params_dashboard.url);
      var nrdashUrl =
        params_dashboard.url +
        "/?username=" +
        params_dashboard.username +
        "&password=" +
        params_dashboard.password;    
    myAdminHtml = /*html*/ `
      <iframe id = "iframe_dashboard"
      src = "${nrdashUrl}"
      style = "z-index:500;position: fixed;top: 40px;left: 0;background-color: white"
      width = "100%"
      height = "100%" > No iframe support </iframe>
      `;
    // $("#btn-editor").html("SHOW/HIDE");
    $("html").append(myAdminHtml);
    // $("#iframe_dashboard").on("load", function () {
    loginDashboardIframe();
    // loadDashboardIframe(2000);
    // });
  }
}

//Login
function loginDashboardIframe() {
  editorNodeTypeList = []; //Reset node array type
  var element = document.getElementById("nr-dashboard");

  if (typeof element != "undefined" && element != null) {
    //If already login
    // var checkExist = setInterval(function () {
    //   //IF DASHBOARD FOUND, INJECT EDITOR
    //   loadDashboardIframe(2000);
    // }, 500); // check every 500ms
  } else {
    //Process to login
    console.log("Login iframe");

    //pre-authenticate
    // $.ajax({
    //     type: 'GET',
    //     url: params_dashboard.url,
    //     //whatever you need
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader(
    //           "Authorization",
    //           make_base_auth(params_dashboard.username, params_dashboard.password)
    //         );
    //     },
    //     success: function (data) {
    //       console.log('login!')
    //       document.getElementById('iframe_dashboard').contentDocument.location.reload(true);
    //     }
    // });

    var req = new XMLHttpRequest();
    req.open(
      "POST",
      params_dashboard.url,
      false,
      params_dashboard.username,
      params_dashboard.password
    ); //use POST to safely send combination
    req.send(null); //here you can pass extra parameters

    setTimeout(function () {
      document
        .getElementById("iframe_dashboard")
        .contentDocument.location.reload(true);
    }, 1000);
  } //end if
}

// Load CSS file

function loadCss() {
  $("#iframe_dashboard")
    .contents()
    .find("head")
    .append(
      $('<link rel="stylesheet" type="text/css" />').attr(
        "href",
        editor_host + "linhtranvu.github.io/node-red/editor/gridstack.min.css"
      )
    );
  $("#iframe_dashboard")
    .contents()
    .find("head")
    .append(
      $('<link rel="stylesheet" type="text/css" />').attr(
        "href",
        editor_host + "linhtranvu.github.io/node-red/editor/gridstack-extra.min.css"
      )
    );
  $("#iframe_dashboard")
    .contents()
    .find("head")
    .append(
      $('<link rel="stylesheet" type="text/css" />').attr(
        "href",
        editor_host + "linhtranvu.github.io/node-red/editor/gridstack.css"
      )
    );
  $("#iframe_dashboard")
    .contents()
    .find("head")
    .append(
      $("<script />").attr(
        "src",
        editor_host + "linhtranvu.github.io/node-red/editor/add-node.js"
      )
    );
}


//Load iframeDashboard

function loadDashboardIframe(interval) {

  RED.nodes.eachConfig(function (n) {
    if (n.type === "ui_base") {
      globalDashboardNode = n;
    }
  });

  iframe = $("#iframe_dashboard").contents();
  if (iframe.find(".old-editor-group").length > 0) {
    return;
  }

  var checkExist = setInterval(function () {

    var attr = iframe.find("md-card").attr("style");
    //DASHBOARD UI FOUND
    if (
      iframe.find("md-card").length > 0 &&
      typeof attr !== typeof undefined &&
      attr !== false
    ) {
      clearInterval(checkExist);
      clearInterval(checkNoTab);
      loadCss();
      // Create change tab button
      iframe
        .find("#nr-dashboard-toolbar button")
        .addClass("btn-change-tab")
        .hide();
      iframe.find("#nr-dashboard-toolbar").prepend(/*html*/ `
      <button class="btn-toolbar-tab md-icon-button md-button md-ink-ripple" type="button" onclick='parent.changeTab()'><ng-md-icon icon="menu" class="ng-scope"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 18h18v-2H3v2z"></path><path d="M3 13h18v-2H3v2z"></path><path d="M3 6v2h18V6H3z"></path></svg></ng-md-icon> <div class="md-ripple-container"></div></button>
      `);

      // iframe.find("body").removeAttr("ng-app");
      //Add Save and column button
      currentTab = iframe.find('md-toolbar h1[node-id*="."]');
      tabId = currentTab.attr("node-id");
      addTabButton(currentTab.attr("node-id"));

      $(".top-menu").find(".btn-tab").remove();
      $(".top-menu").append(/*html*/ `
        <button class="btn-tab btn-save-layout btn-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;border: 1px solid" onclick='saveTheme()' node-id='${tabId}' ><i class="fa fa-save"></i></button>
        <button class="btn-tab btn-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;border: 1px solid" onclick='expandWindow()' node-id='${tabId}' >Expand</button>

        <!-- <button class="btn-tab btn-edit-layout btn-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;border: 1px solid" onclick='saveLayout(true)' node-id='${tabId}' >Column</button>  -->
        `);


      var grid_column = "";

      // Loop through `ui-card-panel` to create grid div
      var node_id = $(".btn-save-layout").attr("node-id");
      $(`div[id="${node_id}"] .nr-db-sb-tab-edit-layout-button`).click(); //Open Layout Editor to get column number

      var checkExistLayoutEditor = setInterval(function () {
        if ($(".grid-stack-item").length > 0) {
          clearInterval(checkExistLayoutEditor);
          // Loop through grid-stack in Layout Editor to create Group div, even with empty one
          $(".grid-stack").each(function () {
            grid_column = $(this).attr("grid-column");
            let groupId = $(this).attr("node-id");

            //iframe.find(find("ui-card-panel[node-id*='" + groupId + "']")).find('')

            iframe.find("ui-card-panel").parent().append(/*html*/ `
                  <div class="div-card-panel" node-id="${groupId}" style="border:1px solid red">
                      <div class='div-group-title' style='font-size:larger'></div>
                      <div>
                        <button onclick="parent.editGroup('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-edit"></i></button>
                        <button onclick="parent.addNode('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-plus"></i> Node</button>
                        <button onclick="parent.checkBeforeGroupGoUp('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #0094ce;"><i class="fa fa-arrow-up"></i> </button>
                        <button onclick="parent.checkBeforeGroupGoDown('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #0094ce;"><i class="fa fa-arrow-down"></i> </button>
                      </div>            
                      <div node-id="${groupId}" class="grid-stack old-editor-group grid-stack-${grid_column}" column="${grid_column}" 
                        style="${calGridStyle(grid_column)}" >
                      </div>
                  </div>
                `);
          });

          // Loop through card-panel and md-card to processing
          iframe.find("ui-card-panel").each(function () {
            let currentGroupNodeId = $(this).attr("node-id");
            // console.log(currentGroupNodeId);

            if (!$(this).hasClass("new-editor-group")) {
              //Process group title
              $(this).find(".nr-dashboard-cardtitle").removeAttr("style");
              $(this)
                .find(".nr-dashboard-cardtitle")
                .appendTo(
                  $(this)
                    .parent()
                    .find(".div-card-panel[node-id='" + currentGroupNodeId + "']")
                    .find(".div-group-title")
                );

              //Processing md-card object
              $(this)
                .find("md-card")
                .each(function () {
                  var currentNodeId = $(this).attr("node-id");
                  if (
                    $(this).children().length == 0 ||
                    $(this).hasClass("nr-dashboard-spacer")
                  ) {
                    $(this).remove(); //Remove empty md-card
                  }

                  $(this).addClass("grid-stack-item");
                  $(this)
                    .children()
                    .addClass("grid-stack-item-content")
                    .css("inset", 0);
                  $(this).find("input").attr("disabled", "disabled");

                  //Calculate Width and Height
                  let ui_size = $(this).attr("ui-card-size").split("x");
                  $(this).attr("data-gs-width", ui_size[0]);
                  $(this).attr("data-gs-height", ui_size[1]);

                  //Calculate X and Y
                  var blockX =
                    globalDashboardNode.site.sizes.sx +
                    globalDashboardNode.site.sizes.cx; 
                  var blockY =
                    globalDashboardNode.site.sizes.sy +
                    globalDashboardNode.site.sizes.cy; 

                  $(this).attr(
                    "data-gs-x",
                    parseInt($(this).css("left"), 10) / blockX
                  );
                  // console.log($(this).attr("node-id") + ':x:'+ parseInt($(this).css("left"), 10) / blockX)
                  $(this).attr(
                    "data-gs-y",
                    parseInt($(this).css("top"), 10) / blockY
                  );

                  //Remove style and border
                  $(this).removeAttr("style").css({
                    margin: "0px",
                    border: "3px solid green",
                  });

                  //Attach md-card to gridstack
                  $(this).appendTo(
                    iframe.find(".grid-stack[node-id='" + currentGroupNodeId + "']")
                  );

                  $(this).append(
                    `<div class="ui-button btn-editor ui-widget ui-corner-all md-card-ui-select"><i class="fa fa-hand-pointer-o" style='background-color:white'></i></div>`
                  );

                  $(this)
                    .find(".md-card-ui-select")
                    .click(function () {
                      currentSelectNode = this.closest("md-card");
                      prepareClickOnNodeDashboard();
                    }); //End handle click on UI node

                  // Process UI of md-card to Editor Mode, more simple and elegant

                  if (typeof currentNodeId !== "undefined") {
                    // console.log(currentNodeId);
                    let currentNodes = RED.search.search(currentNodeId);
                    if(currentNodes.length > 0){
                      let currentNode = currentNodes[0].node;

                      if (nodeList.includes(currentNode.type)) {
                        eval(currentNode.type).load(currentNode);
                      }

                      if (editorNodeTypeList.indexOf(currentNode.type) === -1) {
                        editorNodeTypeList.push(currentNode.type);
                        // console.log(editorNodeTypeList);
                      }
                    }
                  }
                }); //end loop each md-card
            }
          }); //end loop each panel

          iframe.find(".nr-dashboard-cardcontainer").remove();
          iframe.find("ui-card-panel").remove();

          // Apply Grid stack
          setTimeout(() => {
            $(".red-ui-tray").find("#node-dialog-cancel").click(); //Close background Layout Editor
            iframe.find(".nr-dashboard-spacer").remove();

            iframe.find(".grid-stack").each(function () {
              if (!$(this).hasClass("new-editor-group")) {
                $(this).gridstack({
                  cellHeight: globalDashboardNode.site.sizes.sy + globalDashboardNode.site.sizes.cy - 7, //-7 = (3 top border + 3 bottom border + 1 space between widget)
                  verticalMargin: 1,
                  float: true,
                  alwaysShowResizeHandle: true,
                  disableOneColumnMode: true,
                  column: $(this).attr("column"),
                  enableMove: false,
                  enableResize: false,
                  // acceptWidgets: true,
                  // column: 6,
                });
                $(this).data("gridstack").disable();
              }
            });
          }, 300);

          // grid = $("#iframe_dashboard")
          //   .contents()
          //   .find(".grid-stack")
          //   .data("gridstack");

          //FINISH GRID STACK INITIALIZE
          iframe
            .find(".masonry-container")
            .removeClass("masonry-container")
            .addClass("tab-content nr-dashboard-layout-row")
            .css("min-height", "100px"); //Make whole layout responsive
          // iframe.find("body").css('height', '130%') //Increase height to fix all content
        } //end check if layout editor open existed
      }, 500); // check every 500ms
    } //end if dashboard found
  }, 500); // check every 500ms

  var checkNoTab = setInterval(function(){
    if (iframe.find(".node-red-ui--notabs").length > 0 ){
      clearInterval(checkExist);
      clearInterval(checkNoTab);
      Swal.fire(
        "No UI",
        "No UI found, create a default workspace. Accept deploy and Edit again"
      );
      //   $(".nr-db-sb-list-button-group > a:nth-child(3)").click();
      //   setTimeout(function () {
      //     var noTab_TabId = $('.nr-db-sb-tab-list li').last().find('.nr-db-sb-list-header-button-group').attr('id')
      //     $('.nr-db-sb-tab-list li').last().find('.nr-db-sb-tab-add-group-button').click()
      //     setTimeout(function () {
      //       var noTab_GroupId = $(".nr-db-sb-tab-list li").last().find('.nr-db-sb-list-header-button-group').attr('id')
      //     },500)

      // }, 500);

      RED.actions.invoke("core:show-import-dialog");
      $("#red-ui-clipboard-dialog-import-text").val(`

        [{"id":"43bc6447.1b17d4","type":"ui_button","z":"2cc48a6d.a2ff26","name":"","group":"2bdcc764.24f779","order":0,"width":0,"height":0,"passthru":false,"label":"button","tooltip":"","color":"","bgcolor":"","icon":"","payload":"","payloadType":"str","topic":"topic","topicType":"msg","x":100,"y":140,"wires":[[]]},{"id":"2bdcc764.24f779","type":"ui_group","name":"Group 1","tab":"da97a8ee.720bg","order":1,"disp":true,"width":6},{"id":"da97a8ee.720bg","type":"ui_tab","name":"Tab 4","icon":"dashboard","order":4}]

      `);
      $("#red-ui-clipboard-dialog-ok").removeClass(
        "ui-button-disabled ui-button-disabled ui-state-disabled"
      );
      $("#red-ui-clipboard-dialog-ok").prop("disabled", false);
      $("#red-ui-clipboard-dialog-ok").click();
      RED.nodes.dirty(true);
      RED.view.redraw();      
      setTimeout(function () {
        $("#red-ui-header-button-deploy").click();
      },500)
      
    }

  },500) //end check No Tab interval
}

function toggleGridMove() {
  if (enableGridMove == true) {
    iframe.find(".grid-stack").each(function () {
      $(this).data("gridstack").disable();
      $(".btn-enable-grid").find("span").text("");
    });
    enableGridMove = false;
  } else {
    iframe.find(".grid-stack").each(function () {
      $(this).data("gridstack").enable();
      $(".btn-enable-grid").find("span").text("OFF");
    });
    enableGridMove = true;
  }
}

var heightExpand = 0;

function expandWindow() {
  heightExpand = heightExpand + 200;
  height = iframe.find(".tab-content")[0].scrollHeight;
  iframe.find(".tab-content").css("min-height", height + heightExpand);
}

function changeTab() {
  if (iframe.find(".old-editor-group").length > 0) {
    Swal.fire({
      title: "What do you want do do?",
      text: "Note: You need to Edit after changing tab",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save, deploy and Change tab`,
      denyButtonText: `Discard and Change tab`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire("", "Deploy done! Change tab and Reload", "success");
        isLayoutOpen = true;
        saveLayout(false); // var: editColumn:true,false
        deployAndReload(false); // var: Reload:true,false
        iframe.find(".div-card-panel").remove();
      } else if (result.isDenied) {
        // Swal.fire('', 'You need to Reload after change tab', 'info')
        iframe.find(".div-card-panel").remove();
        iframe.find(".btn-change-tab").click().show();
        iframe.find(".btn-toolbar-tab").remove(); // Remove tab button
        $(".top-menu").find(".btn-tab").remove(); // Remove tab button
      }
    });
  } else {
    // Swal.fire("", "You need to Reload after change tab", "info");
    iframe.find(".btn-change-tab").click().show();
    iframe.find(".btn-toolbar-tab").remove(); // Remove tab button
    $(".top-menu").find(".btn-tab").remove(); // Remove tab button
  }
}

function prepareClickOnNodeDashboard() {
  $(".nr-db-sb-tab-list").find("a[node-id*='" + tab_node_id + "']");
  $("#iframe_dashboard")
    .contents()
    .find(".selected")
    .css("border", "3px solid green")
    .removeClass("selected");
  $(currentSelectNode).addClass("selected").css("border", "3px solid red");
}

function checkBeforeGroupGoUp(groupId) {
  if ($("#red-ui-sidebar").is(":visible") === false) {
    RED.actions.invoke("core:toggle-sidebar");
  }
  $("#red-ui-tab-dashboard-link-button").click();

  // $.blockUI()

  if ($("#dashboard-layout").is(":visible") == false) {
    // $('#red-ui-tab-dashboard-link-button').click()

    var checkExist = setInterval(function () {
      if ($("#dashboard-layout").is(":visible") == true) {
        clearInterval(checkExist);
        groupGoUp(groupId);
        $.unblockUI();
      }
    }, 500); // check every 500ms
  } else {
    groupGoUp(groupId);
    $.unblockUI();
  }
}

function groupGoUp(groupId) {
  current = $('div[id="' + groupId + '"]').closest("li");
  current.prev().before(current); //up for group in list

  current = iframe
    .find('.grid-stack[node-id="' + groupId + '"]')
    .closest(".div-card-panel");
  current.prev().before(current); //up for editor

  groupList = $(`div[id="${groupId}"]`)
    .closest("ol .nr-db-sb-group-list")
    .children("li")
    .children("div");
  saveSortGroup(groupList);
  resetGroupAfterMove(groupId);
}

function checkBeforeGroupGoDown(groupId) {
  // $.blockUI();
  if ($("#red-ui-sidebar").is(":visible") === false) {
    RED.actions.invoke("core:toggle-sidebar");
  }
  $("#red-ui-tab-dashboard-link-button").click();

  if ($("#dashboard-layout").is(":visible") == false) {
    // $("#red-ui-tab-dashboard-link-button").click();

    var checkExist = setInterval(function () {
      if ($("#dashboard-layout").is(":visible") == true) {
        clearInterval(checkExist);
        groupGoDown(groupId);
        $.unblockUI();
      }
    }, 500); // check every 500ms
  } else {
    groupGoDown(groupId);
    $.unblockUI();
  }
}

function groupGoDown(groupId) {
  current = $('div[id="' + groupId + '"]').closest("li");
  current.next().after(current); //down for group in list

  current = iframe
    .find('.grid-stack[node-id="' + groupId + '"]')
    .closest(".div-card-panel");
  current.next().after(current); //down for editor

  groupList = $(`div[id="${groupId}"]`)
    .closest("ol .nr-db-sb-group-list")
    .children("li")
    .children("div");
  saveSortGroup(groupList);
  resetGroupAfterMove(groupId);
}

function resetGroupAfterMove(groupId) {
  // var grid = iframe.find(".grid-stack[node-id='"+groupId+"']").data('gridstack')
  // grid.destroy(false);
  // iframe.find(".grid-stack[node-id='"+groupId+"']").gridstack({
  //   cellHeight: Number($("#nr-db-field-sy").val()) +
  //     Number($("#nr-db-field-cy").val()) - 7, //-7 = (3 top border + 3 bottom border + 1 space between widget)
  //   verticalMargin: 1,
  //   float: true,
  //   alwaysShowResizeHandle: true,
  //   disableOneColumnMode: true,
  //   column: $(this).attr("column"),
  //   acceptWidgets: true,
  //   // column: 6,
  // });

  var currentGroup = iframe.find(".grid-stack[node-id='" + groupId + "']");

  column = currentGroup.css("background-size").split(" ");
  column = column[0].slice(0, -1);
  column = Math.round(100 / column);

  currentGroup.after(
    `<div class="grid-stack grid-stack-${column} reset-group" node-id="${groupId}" style='${currentGroup.attr(
      "style"
    )}'></div>`
  );
  currentGroup.find("md-card").each(function () {
    $(this).appendTo(iframe.find(".reset-group"));
  });
  currentGroup.remove();

  iframe.find(".reset-group").gridstack({
    cellHeight: globalDashboardNode.site.sizes.sy + globalDashboardNode.site.sizes.cy - 7,//-7 = (3 top border + 3 bottom border + 1 space between widget)
    verticalMargin: 1,
    float: true,
    alwaysShowResizeHandle: true,
    disableOneColumnMode: true,
    column: $(this).attr("column"),
    acceptWidgets: true,
    // column: 6,
  });

  if (enableGridMove == false) {
    iframe.find(".reset-group").data("gridstack").disable();
  }

  iframe.find(".reset-group").removeClass("reset-group");
}

function saveSortGroup(items) {
  var historyEvents = [];
  items.each(function (i, el) {
    var groupData = $(el).data("data");
    var node = groupData.node;
    var hev = {
      t: "edit",
      node: node,
      changes: {
        order: node.order,
        tab: node.tab,
      },
      dirty: node.dirty,
      changed: node.changed,
    };
    historyEvents.push(hev);
    var changed = false;
    if (node.order !== i + 1) {
      node.order = i + 1;
      changed = true;
    }
    if (changed) {
      node.dirty = true;
      node.changed = true;
    }
    /*
      if (node.tab !== item.node.id) {
          var oldTabNode = RED.nodes.node(node.tab);
          if (oldTabNode) {
              var index = oldTabNode.users.indexOf(node);
              oldTabNode.users.splice(index,1);
          }
          node.tab = item.node.id;
          item.node.users.push(node);
          changed = true;
      }*/
  });
  RED.history.push({
    t: "multi",
    events: historyEvents,
  });
  RED.nodes.dirty(true);
  RED.view.redraw();
}

function editGroup(nodeId) {
  var cardPanel = iframe.find(`.div-card-panel[node-id*="${nodeId}"]`);

  $('div[id="' + nodeId + '"]')
    .find(".nr-db-sb-edit-group-button")
    .click();

  var checkExist = setInterval(function () {
    if ($("#node-config-dialog-ok").length > 0) {
      clearInterval(checkExist);
      $("#red-ui-editor-stack").css("z-index", 520);
      $(".leftButton").hide();
      // $("#node-input-size").hide();
      // $("#node-config-input-width").attr("type", "text");
      $(".red-ui-tray-toolbar").prepend(
        `<button class="ui-button ui-corner-all ui-widget btn-remove-group">Delete</button>`
      );

      //Close side bar if opened
      if ($("#red-ui-sidebar").is(":visible") === true) {
        RED.actions.invoke("core:toggle-sidebar");
      }

      // Show number block size group
       $("#node-input-size").click(function () {
         $("body > div:nth-child(12)").css('z-index',520)
       })
      


      // Save Group
      $("#node-config-dialog-ok").click(function () {
        //Set width
        currentGroup = iframe.find(".grid-stack[node-id='" + nodeId + "']");
        grid_column = $("#node-config-input-width").val();
        $(currentGroup)
          .removeClass(function (index, className) {
            return (className.match(/\bgrid-stack-\d+/g) || []).join(" ");
          })
          .addClass("grid-stack-" + grid_column); //apply new grid-stack-columnNumber
        $(currentGroup).css({
          width: calGridWith(grid_column),
          "background-size": calGridBackground(grid_column),
        });
        $(currentGroup).attr("column", grid_column);
        $(currentGroup).data("gridstack").setColumn(grid_column, true); //true: no auto resize widget width

        // Set title
        if ($("#node-config-input-disp:checked").length > 0) {
          cardPanel.find(".nr-dashboard-cardtitle").show();
          if ($(cardPanel).find(".nr-dashboard-cardtitle").length > 0) {
            $(cardPanel)
              .find(".nr-dashboard-cardtitle")
              .html($("#node-config-input-name").val());
          } else {
            cardPanel.prepend(
              `<p class="nr-dashboard-cardtitle">${$(
                "#node-config-input-name"
              ).val()}</p>`
            );
          }
        } else {
          cardPanel.find(".nr-dashboard-cardtitle").hide();
        }
      });

      // Remove Group
      $(".btn-remove-group").click(function (e) {
        if ($(cardPanel).find("md-card").length > 0) {
          swal.fire("", "This group is not empty");
        } else {
          $(".leftButton").click();
          $(cardPanel).closest(".div-card-panel").remove();
        }
      });
    }
  }, 100); // check every 500ms
}

function calGridStyle(grid_column) {
  // let gridWidth =
  //   Number($("#nr-db-field-px").val()) * 2 +
  //   Number($("#nr-db-field-sx").val()) +
  //   (Number($("#nr-db-field-sx").val()) + Number($("#nr-db-field-cx").val())) *
  //     (Number(grid_column) - 1);
  // return `width: ${gridWidth}px; background-size: ${
  //   100 / Number(grid_column)
  // }% ${
  //   Number($("#nr-db-field-sx").val()) + Number($("#nr-db-field-px").val())
  // }px`;

  let gridWidth =
    globalDashboardNode.site.sizes.px * 2 +
    globalDashboardNode.site.sizes.sx +
    (globalDashboardNode.site.sizes.sx + globalDashboardNode.site.sizes.cx) *
      (Number(grid_column) - 1);
  return `width: ${gridWidth}px; background-size: ${
    100 / Number(grid_column)
  }% ${
    globalDashboardNode.site.sizes.sx + globalDashboardNode.site.sizes.px
  }px`;

}

function calGridWith(grid_column) {
  // let gridWidth =
  //   Number($("#nr-db-field-px").val()) * 2 +
  //   Number($("#nr-db-field-sx").val()) +
  //   (Number($("#nr-db-field-sx").val()) + Number($("#nr-db-field-cx").val())) *
  //     (Number(grid_column) - 1);
  // return `${gridWidth}px`;

  let gridWidth =
    globalDashboardNode.site.sizes.px * 2 +
    globalDashboardNode.site.sizes.sx +
    (globalDashboardNode.site.sizes.sx + globalDashboardNode.site.sizes.cx) *
      (Number(grid_column) - 1);
  return `${gridWidth}px`;

}

function calGridBackground(grid_column) {
  return `${100 / Number(grid_column)}% ${
    globalDashboardNode.site.sizes.sx + globalDashboardNode.site.sizes.px
  }px`;
}
//Save layout

function editDashboardNode() {
  /*
    let labelName = currentSelectNode.find("label").html();
    console.log(labelName);
    if (labelName == undefined) {
      labelName = currentSelectNode.find(".label").html();
    }
    RED.actions.invoke("core:search");
    $(".red-ui-searchBox-input").val(labelName);

    // RED.actions.invoke("core:edit-selected-node");
    $("#red-ui-search").css("z-index", "9999");

    var e = $.Event("keydown");
    e.which = 13; //choose the one you want
    e.keyCode = 13;
    $(".red-ui-searchBox-input").trigger(e);
    $(".red-ui-searchBox-form").submit();
    */

  //Close side bar if opened
  if ($("#red-ui-sidebar").is(":visible") === true) {
    RED.actions.invoke("core:toggle-sidebar");
  }

  if (RED.search.search($(currentSelectNode).attr("node-id")).length == 0) {
    currentSelectNode.remove();
    return;
  }

  currentSelectNodeObject = RED.search.search(
    $(currentSelectNode).attr("node-id")
  )[0].node;
  RED.editor.edit(currentSelectNodeObject);

  setEditPanelLayout(); //Set Edit Layout for Mobile

  // Remove Dashboard Node
  $(".leftButton").click(function (e) {
    $(currentSelectNode).remove();
  });

  // Save Dashboard Node
  $("body").delegate("#node-dialog-ok-save", "click", function () {
    if (
      $("#node-input-group option:selected").val() !==
      currentSelectNodeObject.group
    ) {
      console.log("Different groupid");

      var groupList = [];
      var selectGroupId = $("#node-input-group option:selected").val();

      iframe.find(".grid-stack").each(function (i, v) {
        groupList[i] = $(this).attr("node-id");
      });

      if (groupList.includes(selectGroupId)) {
        //Found in current Tab
        // console.log(groupList);
        $(currentSelectNode).find(".ui-resizable-handle").remove();
        var grid = iframe
          .find(".grid-stack[node-id='" + selectGroupId + "']")
          .data("gridstack");
        grid.addWidget(
          $(currentSelectNode).outerHTML(),
          $(currentSelectNode).attr("data-gs-x"),
          $(currentSelectNode).attr("data-gs-y"),
          $(currentSelectNode).attr("data-gs-width"),
          $(currentSelectNode).attr("data-gs-height"),
          true
        );

        iframe
          .find(".grid-stack[node-id='" + selectGroupId + "']")
          .find("md-card[node-id='" + currentSelectNodeObject.id + "']")
          .find(".md-card-ui-select")
          .click(function () {
            currentSelectNode = this.closest("md-card");
            prepareClickOnNodeDashboard();
          });

        $(currentSelectNode).remove();
      } else {
        Swal.fire(
          "",
          "Change node group to an empty or other tab. Need Deploy"
        );
      }
    }

    // Format HTML on Dashboard After save
    if (nodeList.includes(currentSelectNodeObject.type)){
      eval(currentSelectNodeObject.type).edit(currentSelectNode);
    }
      

    $("#node-dialog-ok").click(); //Actual save
  });
}

function editColumn() {
  // Close side bar if opened
  if ($("#red-ui-sidebar").is(":visible") === true) {
    RED.actions.invoke("core:toggle-sidebar");
  }

  // Open Layout Editor, set data and click Save
  $(".btn-tab").hide();
  $("#iframe_dashboard").hide();
  $(".grid-stack").css({
    postion: "fixed",
    left: 5000,
    height: 0,
  });
  $("#node-dialog-cancel").hide();

  $(".nr-dashboard-layout-row")
    .addClass("nr-dashboard-layout-column")
    .removeClass("nr-dashboard-layout-row");
  // $(".nr-dashboard-layout-span2").addClass('nr-dashboard-layout-span6').removeClass('nr-dashboard-layout-span2');
  $(".nr-dashboard-layout-span6 div").css("overflow", "unset");

  $("#node-dialog-ok").click(function () {
    $("#iframe_dashboard").show();
    $(".btn-tab").show();
    //Apply colum valuen to Dashboard
    for (columnObject of $('input[id*="change-width"]')) {
      var grid_column = Number($(columnObject).val());

      currentGroup = iframe.find(
        ".grid-stack[node-id='" + $(columnObject).attr("node-id") + "']"
      );
      if (currentGroup.length > 0) {
        $(currentGroup)
          .removeClass(function (index, className) {
            return (className.match(/\bgrid-stack-\d+/g) || []).join(" ");
          })
          .addClass("grid-stack-" + grid_column); //apply new grid-stack-columnNumber
        $(currentGroup).css({
          width: calGridWith(grid_column),
          "background-size": calGridBackground(grid_column),
        });
        $(currentGroup).attr("column", grid_column);
        $(currentGroup).data("gridstack").setColumn(grid_column, true); //true: no auto resize widget width
      }
    }
  }); //end click function
  $.unblockUI();
}

function saveLayout(isEditColumn = false) {
  if ($("#iframe_dashboard").contents().find(".grid-stack").length == 0) {
    Swal.fire("", "Press Edit to before Saving");
    return;
  }

  $.blockUI();
  isLayoutOpen = true;
  //Close side bar if opened
  if ($("#red-ui-sidebar").is(":visible") === true) {
    RED.actions.invoke("core:toggle-sidebar");
  }

  var node_id = $(".btn-save-layout").attr("node-id");
  $(`div[id="${node_id}"] .nr-db-sb-tab-edit-layout-button`).click();

  var checkExist = setInterval(function () {
    if ($(".grid-stack-item").length > 0) {
      clearInterval(checkExist);
      $(".red-ui-tray").css("z-index", 10);

      $("#iframe_dashboard")
        .contents()
        .find("md-card")
        .each(function () {
          let currentItem = $(
            ".grid-stack-item[data-gs-id='" + $(this).attr("node-id") + "']"
          );

          currentItem.attr("data-noderedsizeauto", "false"); //remove auto resize
          let currentItemNodeData = currentItem.data("_gridstack_node");

          if (currentItemNodeData !== undefined) {
            currentItemNodeData.width = Number($(this).attr("data-gs-width"));
            currentItemNodeData.height = Number($(this).attr("data-gs-height"));
            currentItemNodeData.x = Number($(this).attr("data-gs-x"));
            currentItemNodeData.y = Number($(this).attr("data-gs-y"));

            currentItem.attr("data-gs-width", $(this).attr("data-gs-width"));
            currentItem.attr("data-gs-height", $(this).attr("data-gs-height"));
            currentItem.attr("data-gs-x", $(this).attr("data-gs-x"));
            currentItem.attr("data-gs-y", $(this).attr("data-gs-y"));
          }
        });

      if (isEditColumn == true) {
        $.unblockUI();
        editColumn();
        return;
      }

      $(".red-ui-tray #node-dialog-ok").click();
      var checkExistOkButton = setInterval(function () {
        if ($("#node-dialog-ok").length == 0) {
          clearInterval(checkExistOkButton);
          $.unblockUI();
          isLayoutOpen = false;
        } //end if check existed
      }, 500); // check every 500ms
    } //end if check existed
  }, 500); // check every 500ms
}

//Add button for theme edit
html = /*html*/ `
  <button onclick='restoreThemeUI()' style="position: fixed;top: 40px; right: 3px;z-index: 540; color:white;background-color: #d81b60; display:none"  class="btn-editor-theme ui-button ui-widget ui-corner-all"> <b> X </b></button>
  <button onclick="saveTheme()" style="position: fixed;top: 40px; right: 50px;z-index: 540; color:white;background-color: #21ba45; display:none"  class="btn-editor-theme ui-button ui-widget ui-corner-all"> Save</button>
  `;
$("html").append(html);

var checkExistGroupButton = "";

function edit_theme() {
  $(".btn-editor-theme").show();
  $(".red-ui-tab-link-buttons").hide();

  $("#dash-link-button").hide();
  $("#red-ui-sidebar").find(".fa-angle-double-up").parent().hide();
  $("#red-ui-sidebar").find(".fa-angle-double-down").parent().hide();
  $("red-ui-sidebar").find(".nr-db-sb-list-header-button-group").hide();
  $("#red-ui-tab-dashboard-link-button").click();
  //Value here must be reset when turn off layout editor
  $("#red-ui-sidebar").css("z-index", "540"); //Default is 10. Must return after called on editor mode
  $("#red-ui-sidebar").find(".fa-pencil,.fa-plus").parent().hide();

  $(".nr-db-sb-list-button-group > a:nth-child(3)").show(); // Add tab button
  $(".nr-db-sb-list-button-group > a:nth-child(4)").show(); // Add link button
  $("#red-ui-sidebar-content").prepend(
    `<div id='edit-theme-info' style="color:red;padding:10px">Any here required 'Save'</div>`
  );

  checkExistGroupButton = setInterval(function () {
    if ($(".nr-db-sb-list-header-button-group").length > 0) {
      $(".nr-db-sb-list-header-button-group").hide();
    }
  }, 500); // check every 500ms

  if (!$("#red-ui-sidebar").is(":visible")) {
    RED.actions.invoke("core:toggle-sidebar");
  }
}

function restoreThemeUI() {
  clearInterval(checkExistGroupButton);
  //Value above must be restore
  $(".nr-db-sb-list-header-button-group").show();
  $("#red-ui-sidebar").find(".fa-pencil,.fa-plus").parent().show();
  $("#red-ui-sidebar").css("z-index", "10");
  $(".red-ui-tab-link-buttons").show();
  $("#edit-theme-info").remove();

  $(".btn-editor-theme").hide();
}

function saveTheme() {
  Swal.fire({
    title: "Save will also deploy NR. You need to choose tab and Re-Edit",
    showCancelButton: true,
    confirmButtonText: `Save`,
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      clearInterval(checkExistGroupButton); //important for editTheme
      restoreThemeUI();
      isLayoutOpen = true;
      saveLayout(false); // var: editColumn:true,false
      deployAndReload(false); // var: Reload:true,false
    }
  });
}

function deployAndReload(reload = true) {
  var checkExist = setInterval(function () {
    if (isLayoutOpen == false) {
      clearInterval(checkExist);
      RED.actions.invoke("core:deploy-flows");

      iframe.find(".new-editor-group").remove(); // Remove this to differ from group created by Editor
      iframe.find(".btn-toolbar-tab").remove(); // Remove tab button
      $(".top-menu").find(".btn-tab").remove(); // Remove tab button
      $("#red-ui-notifications").css("z-index", "1300");
      iframe.find(".div-card-panel").remove();

      if (reload == true) {
        var checkDeployFinish = setInterval(function () {
          console.log("Checking deploy finish...");
          if (iframe.find(".grid-stack").length == 0) {
            clearInterval(checkDeployFinish);
            loadDashboardIframe(2000);
          }
        }, 500); // check every 1000ms
      } else {
        iframe.find(".btn-change-tab").show();
      }
    }

    // if (!$("#red-ui-header-button-deploy").hasClass("disabled")) {
    //   clearInterval(checkExist);
    // }
  }, 500); // check every 500msa
}

function setEditPanelLayout() {
  var checkExist = setInterval(function () {
    if ($("#node-dialog-ok").length > 0) {
      clearInterval(checkExist);
      var groupList = [];

      iframe.find(".grid-stack").each(function (i, v) {
        groupList[i] = $(this).attr("node-id");
      });
      $("#node-input-group option").each(function () {
        if (!groupList.includes($(this).val())) {
          $(this).remove();
        }
      });

      $("#node-dialog-ok").hide();
      $("#node-dialog-ok-save").remove("");
      $(".red-ui-tray-toolbar").append(
        `<button class="ui-button ui-corner-all ui-widget primary" id="node-dialog-ok-save">Save</button>`
      );
      $("#red-ui-editor-stack").css("z-index", "520");
      // $("#red-ui-editor-stack").css("width", screen.width)
      // $(".red-ui-tray-toolbar").append(`<button class="ui-button ui-corner-all ui-widget btn-remove-node" id="node-dialog-delete">Delete</button>`);
      // $(".leftButton").hide() //Hide delete button

      $("#node-input-method").css("width", "50%");
      $(".red-ui-typedInput-container").css("width", "37%");
      $("#node-input-lookup-group").hide();
      $(".red-ui-tab-link-buttons,#node-input-lookup-group").css(
        "right",
        "70px"
      );
      $("#red-ui-editor-stack").find("select").css("width", "50%");
      $("#red-ui-editor-stack").find("input:text").css("width", "50%");
      $("#red-ui-editor-stack").find("#node-input-size").closest("div").hide();

      $("#red-ui-editor-stack")
        .find("#node-input-format-editor")
        .css("width", "80%");

      $("#node-input-size").click(function () {
        setTimeout(function () {
          $('a:contains("auto")').parent().parent().css("z-index", "9999");
        }, 100); //End settimeout, wait 0.1s after open panel
      });
    }
  }, 500); // check every 500ms
}

function addNode(groupId) {
  if ($("#editor-node-list").length == 0) {
    // Create Node list for choosing

    html = /*html*/ `
      <button class="close-add-node-layout add-node-layout" style="position: fixed;top: 3px; right: 3px;z-index: 1220; color:white;background-color: #d81b60;"
        class="ui-button ui-widget ui-corner-all" onclick=''>
        <b> X </b>
      </button>
      <div class="add-node-layout" style='width:100%;height:100%;position:fixed;left:0;top:0;z-index:530;background-color:white' >`;

    for (i = 0; i < nodeList.length; i++) {
      html += eval(nodeList[i]).node;
    }

    html += "</div>";

    $("html").append(html);

    // Close UI

    $(".close-add-node-layout").click(function () {
      $(".add-node-layout").hide();
    });

    // Add new node

    $(".btn-add-node").click(function () {
      type = $(this).attr("type");

      // Import Node to workspace

      RED.actions.invoke("core:show-import-dialog");

      // import_code = eval(nodeList[0]).createNode(groupId);
      import_code = eval(type).createNode(groupId);

      $("#red-ui-clipboard-dialog-import-text").val(import_code);
      $("#red-ui-clipboard-dialog-ok").removeClass(
        "ui-button-disabled ui-button-disabled ui-state-disabled"
      );
      $("#red-ui-clipboard-dialog-ok").prop("disabled", false);
      $("#red-ui-clipboard-dialog-ok").click();
      $(".add-node-layout").hide();
      newNode = RED.view.selection().nodes[0]; //node.id
      newNodeId = newNode.id; //node.id
      console.log(newNodeId);
      var grid = iframe
        .find(".grid-stack[node-id='" + groupId + "']")
        .data("gridstack");

      // Add HTML code to Dashboard

      html_code = eval(type).createHTML(newNodeId);
      widget_size = eval(type).size();
      console.log(widget_size)
      if(widget_size.width > 0){
        grid.addWidget(html_code, 1, 1, widget_size.width, widget_size.height, true);        
      }else{
        grid.addWidget(html_code, 1, 1, 3, 1, true);
      }

      eval(type).load(newNode) // Process new Node if neccessary  

      iframe
        .find("md-card[node-id='" + newNodeId + "']")
        .append(
          `<div class="ui-button btn-editor ui-widget ui-corner-all md-card-ui-select"><i class="fa fa-hand-pointer-o" style='background-color:white'></i></div>`
        );

      iframe
        .find("md-card[node-id='" + newNodeId + "']")
        .find(".md-card-ui-select")
        .click(function () {
          currentSelectNode = this.closest("md-card");
          prepareClickOnNodeDashboard();
        });
      if (enableGridMove == false) {
        iframe
          .find(".grid-stack[node-id='" + groupId + "']")
          .data("gridstack")
          .disable();
      }
    }); // End click function
  } else {
    $(".add-node-layout").show();
  }
}

function addGroup(tabId) {
  $(`div[id='${tabId}'] .nr-db-sb-tab-add-group-button`).click();

  setTimeout(function () {
    groupId = $(`div[id='${tabId}'] .nr-db-sb-tab-add-group-button`)
      .closest(".red-ui-editableList-item-content")
      .find(".red-ui-editableList")
      .find(".nr-db-sb-list-header-button-group")
      .last()
      .attr("id");
    style = calGridStyle(6);
    iframe.find(".tab-content").append(/*html*/ `
        <div class="div-card-panel new-editor-group" node-id="${groupId}" style="border:1px solid red">
            <div class='div-group-title' style='font-size:larger'>
              <p class="nr-dashboard-cardtitle" >New group</p>          
            </div>
            <div>
              <button onclick="parent.editGroup('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-edit"></i></button>
              <button onclick="parent.addNode('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-plus"></i> Node</button>
              <button onclick="parent.checkBeforeGroupGoUp('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #0094ce;"><i class="fa fa-arrow-up"></i> </button>
              <button onclick="parent.checkBeforeGroupGoDown('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #0094ce;"><i class="fa fa-arrow-down"></i> </button>
            </div>            
            <div node-id="${groupId}" class="grid-stack old-editor-group grid-stack-6" column="6" 
              style="${calGridStyle(6)}" >
            </div>

        </div>
      `);

    iframe.find('.grid-stack[node-id*="' + groupId + '"]').gridstack({
      cellHeight: globalDashboardNode.site.sizes.sy + globalDashboardNode.site.sizes.cy - 7, 
      verticalMargin: 1,
      float: true,
      alwaysShowResizeHandle: true,
      disableOneColumnMode: true,
      // acceptWidgets: true,
      column: 6,
    });
  }, 200);
}

function addTabButton(tabId) {
  iframe
    .find("#nr-dashboard-toolbar")
    .find("h1")
    .each(function () {
      if (
        typeof $(this).attr("node-id") !== typeof undefined &&
        ($(this).attr("node-id") !== false) !== "" &&
        $(this).is(":visible")
      ) {
        $(this).html(/*html*/ `
          <span id='tab-label'>${$(this).text()}</span>
          <button onclick="parent.editTab('${tabId}')" class="btn-toolbar-tab btn-editor ui-button ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-edit"></i></button>          
          <button onclick="parent.addGroup('${tabId}')" class="btn-toolbar-tab btn-editor ui-button ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-plus"></i> Group</button>`);
      }

    });
}

function editTab(tabId) {
  $(`div[id="${tabId}"] .nr-db-sb-tab-edit-button`).click();
  var checkExist = setInterval(function () {
    if ($("#node-config-dialog-ok").length > 0) {
      clearInterval(checkExist);
      $("#red-ui-editor-stack").css("z-index", "520");
      $("#node-config-dialog-ok").click(function () {
        iframe.find("#tab-label").text($("#node-config-input-name").val());
      });
    }
  }, 500); // check every 500ms
}
