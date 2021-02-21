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
    $("#btn-editor-container").html(/*html*/
      `
      <button id="btn-editor" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"  onclick="addIframeHtml()" >EDITOR</button>    
      `
    ); 
  }    

}, 1000); // check every 500ms


jQuery.fn.outerHTML = function (s) {
  return s
    ? this.before(s).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
};



function addIframeHtml() {

  $('.no-editor').hide()
  if ($("#div_iframe_dashboard").length) {
    $("#div_iframe_dashboard").toggle();
  } else {
    loadCSS();
    // Swal.fire(
    //   "WYSIWYG Editor for Dashboard",
    //   "Dashboard 2.24.1 above (27 Nov 2020) required. Support default node, worldmap. If you need a custom node supported, drop me email. To start, select a Tab and press Edit"
    // );
    html = /*html*/ `
    <div id='div_iframe_dashboard' style='z-index:3;position: fixed;width:100vw;background-color: white'>
    `;
    html += loadTabList()
    html += /*html*/`
    </div>`;
    $('body').append(html);
  }

}

function toggleDashboarEditor(){
  $("#div_iframe_dashboard").hide()
  $('.no-editor').show()
}

// Load CSS file

function loadTabList(){

  if ($("#red-ui-sidebar").is(":visible") === true) {
    RED.actions.invoke("core:toggle-sidebar");
  }  

  var nodesSet = RED.nodes.createCompleteNodeSet(false);
  var html = /*html*/ `
    <button onclick="newTab()" class="btn-toolbar-tab btn-editor ui-button ui-widget ui-corner-all" style="width:80vw;background-color: #0094ce;"><i class="fa fa-plus"></i> 
        New Tab
    </button><br><br><br>  
    <button onclick="toggleDashboarEditor()" class="btn-toolbar-tab btn-editor ui-button ui-widget ui-corner-all" style="position:fixed;right:3px;top:3px;background-color: red"><i class="fa fa-window-close"></i> 
    </button>    
  `;
  html += /*html*/`<div style='height:100vh'>`
  for (var cnt = 0; cnt < nodesSet.length; cnt++) {
    if (nodesSet[cnt].type == "ui_tab" ) {

      let tabStatus = "";


      if (nodesSet[cnt].disabled == true) {
        tabStatus += `Disabled: True`;
      } else {
        tabStatus += `Disabled: False`;
      }
      if (nodesSet[cnt].hidden == true) {
        tabStatus += `. Navigation Menu: False`;
      } else {
        tabStatus += `. Navigation Menu: True`;
      }

      html += /*html*/ `
        <button onclick="initTab('${nodesSet[cnt].id}')" class="btn-toolbar-tab btn-editor ui-button ui-widget ui-corner-all" style="width:80vw;background-color: #21ba45;"><i class="fa fa-edit"></i> 
           ${nodesSet[cnt].name} - ${tabStatus}
        </button><br><br>
      `;
    }  
  }
  html += "</div>";
  return html


}

function newTab() {
  tabId = Math.random().toString(36).substr(2, 15);
  RED.nodes.import(
    `[{"id":"${tabId}","type":"ui_tab","name":"New Tab","icon":"dashboard","order":1,"disabled":false,"hidden":false}]`
  );
  initTab(tabId);
}

function editTab(tabId) {
  $(`div[id="${tabId}"] .nr-db-sb-tab-edit-button`).click();
  var checkExist = setInterval(function () {
    if ($("#node-config-dialog-ok").length > 0) {
      $(".leftButton").hide();
      clearInterval(checkExist);
      $("#red-ui-editor-stack").css("z-index", "520");
      $("#node-config-dialog-ok").click(function () {
        iframe.find("#tab-label").text($("#node-config-input-name").val());
        tabNode = {
          disabled: $("#node-config-input-disabled").is(":checked"),
          hidden: $("#node-config-input-hidden").is(":checked"),
        };
        iframe.find("#tab-status").html(loadTabStatus(tabNode));
      });
      
    }
  }, 500); // check every 500ms
}

function initTab(tabId){
  
  tabNode = RED.search.search(`${tabId}`)[0].node;

  // console.log(tabNode);
    myAdminHtml = /*html*/ `
      
        <div style='background:#000'>
          <button class="btn-tab btn-save-layout btn-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #0094ce;border: 1px solid" onclick='openTab()' node-id='${tabNode.id}' ><i class="fa fa-folder-open"></i></button>
          <button class="btn-tab btn-save-layout btn-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #0094ce;border: 1px solid" onclick='saveTheme()' node-id='${tabNode.id}' ><i class="fa fa-save"></i></button>
          <button class="btn-tab btn-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #0094ce;border: 1px solid" onclick='expandWindow()' node-id='${tabNode.id}' >Expand</button>
          <button class="btn-tab btn-editor ui-button ui-widget ui-corner-all" style="color:white;background-color: #0094ce;border: 1px solid;position:fixed;right:0px" onclick='toggleDashboarEditor()' node-id='${tabNode.id}' ><i class="fa fa-window-minimize"></i></button>          

        </div>
        <div id="iframe_dashboard"  style="top: 40px;left: 0;height:calc(100vh - 40px);overflow:auto"></div>

        <div class="editor-mode controlgroup ui-controlgroup ui-controlgroup-horizontal ui-helper-clearfix" style="position: fixed;bottom: 20px; right: 70px;z-index:500">
            <button onclick="editDashboardNode()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45;"><i class="fa fa-edit"></i> Node</button>   
            <button onclick="revealDashboardNode()"  class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #0094ce;"><i class="fa fa-search"></i> </button>   

          <!--<button onclick="addNewNode()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #31ccec;">Add Node</button> -->          
          <button onclick="toggleGridMove()"  class="btn-enable-grid ui-button ui-widget ui-corner-all" style="color:white;background-color: #9c27b0;"><i class="fa fa-arrows-alt"></i> <span></span></button> 
          <button onclick="editTheme()" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: #d81b60; " ><i class="fa fa-cog"></i></button>
        </div>

      `;
    $("#div_iframe_dashboard").html(myAdminHtml);
    iframe = $("#iframe_dashboard");
    
    loadTab(tabNode);  
}

function revealDashboardNode(){
  if(currentSelectNode.length > 0){
    toggleDashboarEditor()
    RED.view.reveal(currentSelectNodeObject.id)    
  }else{
    Swal.fire('','Select node to reveal on Workspace')
  }
}

function openTab(){

  Swal.fire({
    title: "",
    text: "Do you want to save and edit other tab",
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: `Save`,
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      if ($(".grid-stack-item").length > 0) {
        clearInterval(checkExistGroupButton); //important for editTheme
        restoreThemeUI();
        isLayoutOpen = true;
        saveLayout(false); // var: editColumn:true,false
      }
      var html = loadTabList();
      $("#div_iframe_dashboard").html(html);
    } else if (result.isDenied) {
      var html = loadTabList();
      $("#div_iframe_dashboard").html(html);
    }
  });

}

function loadCSS() {
//   $("#iframe_dashboard")
//     .contents()
//     .find("head")
//     .append(
//       $('<link rel="stylesheet" type="text/css" />').attr(
//         "href",
//         editor_host + "linhtranvu.github.io/node-red/editor/gridstack.min.css"
//       )
//     );
  // $("head")
  //   .append(
  //     $('<link rel="stylesheet" type="text/css" />').attr(
  //       "href",
  //       editor_host + "linhtranvu.github.io/node-red/editor/gridstack-extra.min.css"
  //     )
  //   );
  $("head")
    .append(
      $('<link rel="stylesheet" type="text/css" />').attr(
        "href",
        editor_host + "linhtranvu.github.io/node-red/editor_v2/gridstack.css"
      )
    );
  
}

// Load iframeDashboard

function loadTab(tabNode) {
  RED.nodes.eachConfig(function (n) {
    if (n.type === "ui_base") {
      globalDashboardNode = n;
    }
  });

  $.getScript(
    editor_host + "linhtranvu.github.io/node-red/editor_v2/theme.js",
    function () {}
  );

  var tabStatus = loadTabStatus(tabNode)
  var dbHtml = /*html*/ `


<div id="nr-dashboard" layout="column" style="background: " class="nr-dashboard-theme layout-column">
   <!----><!---->
   <md-content ng-if="main.loaded" ng-include="'partials/main.html'" layout="column" flex="" class="_md layout-column flex" style="">
      <md-toolbar ng-show="main.hideToolbar !== true" id="toolbar" class="_md _md-toolbar-transitions" aria-hidden="false">
         <div class="md-toolbar-tools" id="nr-dashboard-toolbar">
            <button class="md-icon-button md-button md-ink-ripple ng-hide" type="button" ng-transclude="" ng-show="!(main.lockMenu != 'false') &amp;&amp; main.len > 1" ng-click="main.toggleSidenav()" aria-label="menu button" aria-hidden="true">
               <ng-md-icon icon="menu">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                     <path d="M3 18h18v-2H3v2z"></path>
                     <path d="M3 13h18v-2H3v2z"></path>
                     <path d="M3 6v2h18V6H3z"></path>
                  </svg>
               </ng-md-icon>
            </button>
            <h1 node-id="${tabNode.id}">
              <span id='tab-label'>${tabNode.name}</span>
              <span id='tab-status'>${tabStatus}</span>
              <button onclick="editTab('${tabNode.id}')" class="btn-toolbar-tab btn-editor ui-button ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-edit"></i></button>                
              <button onclick="addGroup('${tabNode.id}')" class="btn-toolbar-tab btn-editor ui-button ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-plus"></i> Group</button>
            </h1>
         </div>
      </md-toolbar>
      <section layout="row" flex="" class="layout-row flex">
         <md-sidenav ng-hide="main.len <= 1" class="md-sidenav-left md-closed _md ng-hide" md-component-id="left" md-is-locked-open="(main.lockMenu != 'false')" tabindex="-1" aria-hidden="true">
            <md-list role="list">
               <!----><!---->
               <md-list-item ng-repeat="obj in main.menu" ng-class="{'nr-menu-item-active':location.$$path=='/'+$index}" role="listitem" class="_md-button-wrap _md nr-menu-item-active" tabindex="-1" aria-disabled="false">
                  <div class="md-button md-no-style">
                     <!----><button class="md-no-style md-button md-ink-ripple" type="button" ng-transclude="" ng-if="!obj.hidden" ng-click="main.open(obj, $index)" ng-disabled="obj.disabled" aria-label="Tab 1"></button><!---->   
                     <div class="md-list-item-inner" aria-hidden="true">
                        <ui-icon icon="dashboard" style="margin:5px">
                           <!---->
                           <ng-md-icon ng-if="iconType==='angular-material'" icon="dashboard">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                 <path d="M3 13h8V3H3v10z"></path>
                                 <path d="M3 21h8v-6H3v6z"></path>
                                 <path d="M13 21h8V11h-8v10z"></path>
                                 <path d="M13 3v6h8V3h-8z"></path>
                              </svg>
                           </ng-md-icon>
                           <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> 
                        </ui-icon>
                        <p style="margin-right:12px; min-width:120px;" ng-show="(main.lockMenu != 'icon')" aria-hidden="false">Tab 1</p>
                     </div>
                     <div class="md-secondary-container"></div>
                  </div>
               </md-list-item>
               <!----><!----> 
            </md-list>
         </md-sidenav>
         <md-content flex="" class="_md flex">
            <div ui-masonry="" ng-show="main.selectedTab.header" id="Tab_Tab_1" class="tab-content nr-dashboard-layout-row" aria-hidden="false" style="min-height: 117px;">

  `;

  dbHtml += loadGroup(tabNode);

  dbHtml += /*html*/ `

            </div>
         </md-content>
      </section>
      <div id="nr-dashboard-footer" layout="row" class="layout-row"></div>
   </md-content>
</div>    
    
    `;

  iframe.html(dbHtml);

  loadGridStack();
}

function loadTabStatus(node){

  let html =''

  if(node.disabled == true){
    html += `<i class="fa fa-ban"></i>`;
  }
  if (node.hidden == true) {
    html += `<i class="fa fa-eye-slash"></i>`;
  }  
  return html

}


function loadGroup(tabNode){

  // var nodesSet = RED.nodes.createCompleteNodeSet(false);
  var nodesSet = RED.search.search(tabNode.id);
  nodesSet.sort(compareGroupOrder)
  
  var html =''

  for (var cnt = 0; cnt < nodesSet.length; cnt++) {
    if (nodesSet[cnt].node.type == "ui_group" && nodesSet[cnt].node.tab == tabNode.id) {

        var grid_column = nodesSet[cnt].node.width;
        var groupId = nodesSet[cnt].node.id;

        html += /*html*/ `
          <!----><!---->
          <div class="div-card-panel" node-id="${groupId}" style="border:1px solid red" class="visible">
            <div class='div-group-title' style='font-size:larger'>
              <p class="nr-dashboard-cardtitle" ng-style="{width:ctrl.width-12}" ng-if="group.header &amp;&amp; group.header.config.disp &amp;&amp; group.header[group.header.length-1]!='!'" style="">${
                nodesSet[cnt].node.name
              }</p>            
            </div>
            <div>
              <button onclick="parent.editGroup('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-edit"></i></button>
              <button onclick="parent.addNode('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #21ba45;"><i class="fa fa-plus"></i> Node</button>
              <button onclick="parent.checkBeforeGroupGoUp('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #0094ce;"><i class="fa fa-arrow-up"></i> </button>
              <button onclick="parent.checkBeforeGroupGoDown('${groupId}')"  class="ui-button btn-editor ui-widget ui-corner-all" style="background-color: #0094ce;"><i class="fa fa-arrow-down"></i> </button>
            </div>     
            <div node-id="${groupId}" class="grid-stack grid-stack-${grid_column}" column="${grid_column}" style="${calGridStyle(
          grid_column
        )}" >               
        `;

        html += loadWidget(nodesSet[cnt].node);

        html += /*html*/ `
        <!----><!---->
            </div>
          </div>
        `;
    }
  }
  return html   
}

function loadWidget(groupNode){

  var nodesSet = RED.nodes.createCompleteNodeSet(false);
  var groupWidth = groupNode.width
  var html = ''
  var widgets = []

  for (var cnt = 0; cnt < nodesSet.length; cnt++) {
    if (nodesSet[cnt].group == groupNode.id) {
      // console.log(nodesSet[cnt]);
      if(parseInt(nodesSet[cnt].width) > 0){
         
      }else{
        nodesSet[cnt].width = groupNode.width
      }

      if (parseInt(nodesSet[cnt].height) > 0) {
      } else {
        nodesSet[cnt].height = 4;
      } 
      widgets.push(nodesSet[cnt]);
    }
  }// End loop through all node to find group


  widgets.sort(compareOrder);

  var tbl = {};
  for (var cnt2 = 0; cnt2 < widgets.length; cnt2++) {
    // Set default value when there is auto width
    if (widgets[cnt2].auto == true) {

      widgets[cnt2].width = groupWidth;
      // Adjust to the group width
      } else if (widgets[cnt2].width > groupWidth) {
          widgets[cnt2].width = groupWidth;
      }
      // Auto support
      // if (widgets[cnt2].auto === true || widgets[cnt2].type === 'ui_form') {
      //     widgets[cnt2].height = getDefaultHeight(widgets[cnt2].id, groupWidth);
      // }
      // Calculate coordinates to be placed
      var point = search_point(Number(widgets[cnt2].width), Number(widgets[cnt2].height), groupWidth, 256, tbl);
      if (point) {
        widgets[cnt2].xcord = point.x;
        widgets[cnt2].ycord = point.y;
      if (nodeList.includes(widgets[cnt2].type)) {
        // console.log(widgets[cnt2]);
        html += eval(widgets[cnt2].type).createHTML(widgets[cnt2]);     
      } else {
        if (widgets[cnt2].type !== "ui_spacer") {
          html += ui_unsupport.createHTML(widgets[cnt2], widgets[cnt2].type);
        }
        
      }          
    }

  } //end loop through widgets

  return html

}

  ////////////////////////////////////////
  // Sort by order
  ////////////////////////////////////////
  function compareOrder(a, b) {
      var r = 0;
      if (a.order < b.order) { r = -1; }
      else if (a.order > b.order) { r = 1; }
      return r;
  }

  function compareGroupOrder(a, b) {
      var r = 0;
      if (a.node.order < b.node.order) { r = -1; }
      else if (a.node.order > b.node.order) { r = 1; }
      return r;
  }  

function loadGridStack(){

  $('md-card[load="load"]').each(function(){
    drawNode = RED.search.search($(this).attr('node-id'))[0].node
    eval(drawNode.type).load(drawNode)
  })
  
  // setTimeout(() => {

    iframe.find(".grid-stack").each(function () {
        $(this).gridstack({
          cellHeight:
            globalDashboardNode.site.sizes.sy +
            globalDashboardNode.site.sizes.cy -
            7, //-7 = (3 top border + 3 bottom border + 1 space between widget)
          verticalMargin: 1,
          float: true,
          alwaysShowResizeHandle: true,
          disableOneColumnMode: true,
          column: $(this).attr("column"),
          enableMove: true,
          enableResize: true,
          // acceptWidgets: true,
        });
        $(this).data("gridstack").disable();
    });
  // }, 300);
}

  ///////////////////////////////////////////////////////
  // Placeable location search (placed in the upper left)
  ///////////////////////////////////////////////////////
  function search_point(width, height, maxWidth, maxHeight, tbl) {
      for (var y=0; y < maxHeight; y++) {
          for (var x=0; x < maxWidth; x++) {
              if (check_matrix(x, y, width, height, maxWidth, tbl)) {
                  fill_matrix(x, y, width, height, maxWidth, tbl);
                  return  {x:x, y:y};
              }
          }
      }
      return false;
  }

    // Check placement position
    function check_matrix(px, py, width, height, maxWidth, tbl) {
        if (px+width > maxWidth) return false;
        for (var y=py; y < py+height; y++) {
            for (var x=px; x<px+width; x++) {
                if (tbl[maxWidth*y+x]) return false;
            }
        }
        return true;
    }
    // Mark the placement position
    function fill_matrix(px, py, width, height, maxWidth, tbl) {
        for (var y=py; y < py+height; y++) {
            for (var x=px; x < px+width; x++) {
                tbl[maxWidth*y+x] = 1;
            }
        }
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
  heightExpand = heightExpand + 20;
  height = iframe.find(".tab-content")[0].scrollHeight;
  iframe.find(".tab-content").css("min-height", height + heightExpand);
}


function selectNode(nodeId) {
      iframe
        .find(".selected")
        .css("border", "3px solid green")
        .removeClass("selected");
      currentSelectNode = $(`md-card[node-id*="${nodeId}"]`);
      currentSelectNode.addClass("selected").css("border", "3px solid red");
      currentSelectNodeObject = RED.search.search($(currentSelectNode).attr("node-id"))[0].node;
}

function checkBeforeGroupGoUp(groupId) {
  if ($("#red-ui-sidebar").is(":visible") === false) {
    RED.actions.invoke("core:toggle-sidebar");
  }
  $("#red-ui-sidebar").css("z-index", 1);
  $("#red-ui-sidebar-separator").css("z-index", 1);
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


// Go up
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
  $("#red-ui-sidebar").css("z-index", 1);
  $("#red-ui-sidebar-separator").css("z-index", 1);
  
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
    cellHeight:
      globalDashboardNode.site.sizes.sy + globalDashboardNode.site.sizes.cy - 7, //-7 = (3 top border + 3 bottom border + 1 space between widget)
    verticalMargin: 1,
    float: true,
    column: $(this).attr("column"),
    acceptWidgets: false,

    alwaysShowResizeHandle: true,
    disableOneColumnMode: true,
    enableMove: true,
    enableResize: true,
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
      $("#red-ui-editor-stack").css("z-index", 4);
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

  if(currentSelectNode.length == 0){
    Swal.fire('','Select UI to edit')
    return
  }
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
  $("body").undelegate("#node-dialog-ok-save", "click").delegate("#node-dialog-ok-save", "click", function () {
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
    }else{
      ui_unsupport.edit(currentSelectNode);
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

  $.blockUI();
  isLayoutOpen = true;
  //Close side bar if opened
  if ($("#red-ui-sidebar").is(":visible") === true) {
    RED.actions.invoke("core:toggle-sidebar");
  }

  var node_id = $(".btn-save-layout").attr("node-id");
  $(`div[id="${node_id}"] .nr-db-sb-tab-edit-layout-button`).click();

  var checkExist = setInterval(function () {
    if ($(".ui-spinner-input").length > 0) {
      clearInterval(checkExist);
      $(".red-ui-tray").css("z-index", 10);

      var mdcardList = iframe.find("md-card");
      for(i=0;i<mdcardList.length;i++){
        currentCard = $(mdcardList[i]);
        let currentItem = $(
          "#red-ui-editor-stack .grid-stack-item[data-gs-id='" +
            currentCard.attr("node-id") +
            "']"
        );

        currentItem.attr("data-noderedsizeauto", "false"); //remove auto resize
        let currentItemNodeData = currentItem.data("_gridstack_node");

        if (currentItemNodeData !== undefined) {
          currentItemNodeData.width = Number(currentCard.attr("data-gs-width"));
          currentItemNodeData.height = Number(currentCard.attr("data-gs-height"));
          currentItemNodeData.x = Number(currentCard.attr("data-gs-x"));
          currentItemNodeData.y = Number(currentCard.attr("data-gs-y"));

          currentItem.attr("data-gs-width", currentCard.attr("data-gs-width"));
          currentItem.attr("data-gs-height", currentCard.attr("data-gs-height"));
          currentItem.attr("data-gs-x", currentCard.attr("data-gs-x"));
          currentItem.attr("data-gs-y", currentCard.attr("data-gs-y"));
        }
      };

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
  <!-- <button onclick="saveTheme()" style="position: fixed;top: 40px; right: 50px;z-index: 540; color:white;background-color: #21ba45; display:none"  class="btn-editor-theme ui-button ui-widget ui-corner-all"> Save</button> -->
  `;
$("html").append(html);

var checkExistGroupButton = "";

function editTheme() {
  $(".btn-editor-theme").show();
  $('#dashboard-tabs-list > li:nth-child(1)').hide() //Hide Layout tab


  $("#red-ui-tab-dashboard-link-button").click();
  $('.red-ui-tab-link-buttons').hide()
  $('#dashboard-layout').hide()
  $('#dashboard-tabs-list > li:nth-child(2)').click() 
  //Value here must be reset when turn off layout editor
  $("#red-ui-sidebar").css("z-index", "20"); //Default is 10. Must return after called on editor mode
  // $("#red-ui-sidebar").find(".fa-pencil,.fa-plus").parent().hide();

  // $(".nr-db-sb-list-button-group > a:nth-child(3)").show(); // Add tab button
  // $(".nr-db-sb-list-button-group > a:nth-child(4)").show(); // Add link button
  // $("#red-ui-sidebar-content").prepend(
  //   `<div id='edit-theme-info' style="color:red;padding:10px">Any here required 'Save'</div>`
  // );


  if (!$("#red-ui-sidebar").is(":visible")) {
    RED.actions.invoke("core:toggle-sidebar");
  }
}

function restoreThemeUI() {

  $('#dashboard-tabs-list > li:nth-child(1)').show()
  $('.red-ui-tab-link-buttons').show()
  $('#dashboard-layout').show()
  // $("#red-ui-sidebar").css("z-index", "2");
  RED.actions.invoke("core:toggle-sidebar");  
  $(".btn-editor-theme").hide();
  RED.nodes.eachConfig(function (n) {
    if (n.type === "ui_base") {
      globalDashboardNode = n;
    }
  });

  $('#mywystheme').remove()

  $.getScript(
    editor_host + "linhtranvu.github.io/node-red/editor_v2/theme.js",
    function () {}
  );  
}

function saveTheme() {
  if ($("md-card").length == 0) {
    Swal.fire("", "Please add node before save");
    return;
  }  
  Swal.fire({
    title: "Do you want to save",
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
      //deployAndReload(false); // var: Reload:true,false
    }
  });
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
      $("#red-ui-editor-stack").css("z-index", "4");
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
      <div class="add-node-layout" style='width:100%;height:100%;position:fixed;left:0;top:0;z-index:530;background-color:white;overflow:auto' >`;
      html += $("#red-ui-palette-dashboard").outerHTML();
    // for (i = 0; i < nodeList.length; i++) {
    //   html += eval(nodeList[i]).node;
    // }

    html += "</div>";

    $("html").append(html);

    $(".add-node-layout .red-ui-palette-node").each(function(){
      if(nodeExcludeList.includes($(this).attr("data-palette-type"))){
        $(this).remove()
      }
    });    

    // Close UI

    $(".close-add-node-layout").click(function () {
      $(".add-node-layout").hide();
    });

    // Add new node

    // $(".btn-add-node").click(function () {
    $(".add-node-layout .red-ui-palette-node").click(function () {
      type = $(this).attr("data-palette-type");
      // Import Node to workspace
      RED.actions.invoke("core:show-import-dialog");
      
      if(nodeList.includes(type)){
        import_code = eval(type).createNode(groupId);
      }else{
        Swal.fire('','This node not fully supported, resize and move only. Email me if you want supported')
        import_code = ui_unsupport.createNode(groupId,type);
      }
      

      $("#red-ui-clipboard-dialog-import-text").val(import_code);
      $("#red-ui-clipboard-dialog-ok").removeClass(
        "ui-button-disabled ui-button-disabled ui-state-disabled"
      );
      $("#red-ui-clipboard-dialog-ok").prop("disabled", false);
      $("#red-ui-clipboard-dialog-ok").click();
      $(".add-node-layout").hide();
      newNode = RED.view.selection().nodes[0]; //node.id
      newNodeId = newNode.id; //node.id
      var grid = iframe
        .find(".grid-stack[node-id='" + groupId + "']")
        .data("gridstack");

      // Add HTML code to Dashboard
      if(nodeList.includes(type)){
         html_code = eval(type).createHTML(newNode);
         widget_size = eval(type).size();
      }else{
        
        html_code = ui_unsupport.createHTML(newNode,$(this).find(".red-ui-palette-label").text());
        widget_size = ui_unsupport.size();
      }
     
      
      // console.log(widget_size);
      if (widget_size.width > 0) {
        grid.addWidget(
          html_code,
          1,
          1,
          widget_size.width,
          widget_size.height,
          true
        );
      } else {
        grid.addWidget(html_code, 1, 1, 3, 1, true);
      }

      // if (nodeList.includes(type)) {
      //   eval(type).load(newNode); // Process new Node if neccessary
      // } else {
        // ui_unsupport.load(newNode); // Process new Node if neccessary
      // } 
      if($(`md-card[node-id="${newNodeId}"]`).attr('load') == 'load'){
        eval(newNode.type).load(newNode);
      }           

      if (enableGridMove == false) {
        iframe
          .find(".grid-stack[node-id='" + groupId + "']")
          .data("gridstack")
          .disable();
      }
      var checkExist = setInterval(function () {				
        if ($("#red-ui-notifications").children.length > 0) {
          clearInterval(checkExist);
          $("#red-ui-notifications").html('')
        } //end if check existed
      }, 500); // check every 500ms	   2c0e3956.f777ae    
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



