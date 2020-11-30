z-index order:
	iframe: 500
	bottom button: 520
	add node list: 530
	
iframe = $("#iframe_dahsboard").contents()

var checkExist = setInterval(function () {
          if (count == 6) {
            clearInterval(checkExist);
          }
		}, 500); // check every 500ms
		
 //Close side bar if opened
  if ($("#red-ui-sidebar").is(":visible") === true) {
    RED.actions.invoke("core:toggle-sidebar");
  }		
		
var grid = iframe.find(".grid-stack[node-id='f6c209df.8c14c']").data("gridstack");
grid.addWidget(html_code, 1, 1, 3, 1, true);
iframe.find("md-card[node-id='" + newNodeId + "']").click(function () {
  currentSelectNode = this;
  prepareClickOnNodeDashboard();
});   

//Up and down
RED.editor.editConfig("", groupNode.type, groupNode.id);

  current = $('a[node-id="76d110d5.29ead8"]').closest('li')
  current.prev().before(current);//up
  current.next().after(current);//down

		

style="width: 324px; background-size: 16.6667% 54px;"           
		   
		                 style="width: 324px; background-size: ${100/Number(grid_column)} ${Number($("#nr-db-field-sx").val()) + Number($("#nr-db-field-px").val())}px;"

			
				
panel width = (group padding)*2 + widget size + (widget size + widget spacing)*(column - 1)

Number($("#nr-db-field-px").val())*2 + Number($("#nr-db-field-sx").val()) + (Number($("#nr-db-field-sx").val()) + Number($("#nr-db-field-cx").val()))*(Number(grid_column)-1)  

$(gridID+'.grid-stack').css("background-size", 100/columnNumber + (widget size + widget spacing));
				
  var node_id = $(".btn-save-layout").attr("node-id");
  $(".tab-edit-layout-button-" + node_id).click();

  var checkExist = setInterval(function () {				
    if ($(".grid-stack-item").length) {
      clearInterval(checkExist);				
    } //end if check existed
  }, 500); // check every 500ms	   2c0e3956.f777ae
  
<md-card class="nr-dashboard-button ng-scope _md visible grid-stack-item"  style="margin: 0px; border: 3px solid green;">  <div class="md-button grid-stack-item-content" style="z-index: 1; padding: 0px; inset: 0px;" node-id="2c0e3956.f777ae"><span ng-bind-html="me.item.getLabel()" class="ng-binding ng-scope">TTT BBB</span></div></md-card>  




//Sort Item after changing group order
 sortItems($('.nr-db-sb-tab-list > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > ol:nth-child(1) > li > .red-ui-editableList-item-content'))         


