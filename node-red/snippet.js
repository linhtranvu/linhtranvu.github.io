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
		
var grid = iframe.find(".grid-stack[node-id='a6bf4948.17197']").data("gridstack");
grid.addWidget(html_code, 1, 1, 3, 1, true);
iframe.find("md-card[node-id='" + newNodeId + "']").click(function () {
  currentSelectNode = this;
  prepareClickOnNodeDashboard();
});   

//Grid resize stop
var grid = iframe.find(".grid-stack[node-id='a6bf4948.17197']").data("gridstack");

grid.on('resizestop', function(event, el) {
  let width = parseInt(el.getAttribute('gs-w')) || 0;
  console.log(width)u
  // or all values...
  // let node: GridStackNode = el.gridstackNode; // {x, y, width, height, id, ....}
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

RED.view.select('208f3317.9fc2ac')
RED.view.selection()
RED.view.selection().nodes[0]
RED.view.reveal('208f3317.9fc2ac')

red-ui-search-result-node-id

  currentSelectNodeObject = RED.search.search(
    $(currentSelectNode).attr("node-id")
  )[0].node;
  RED.editor.edit(currentSelectNodeObject);

    currentSelectNodeObject = RED.search.search('a353dba9.0637')[0].node;
    currentSelectNodeObject.type

  RED.editor.edit(currentSelectNodeObject);
eval(type).createHTML(newNodeId);
  182e1d16.4a00bb

     iframe
      .find("md-card[node-id*='" + node.id + "']") 


      ////////////////////




      iframe.find("md-card[node-id*='182e1d16.4a00bb']").find('.grid-stack-item-content').remove()
      iframe.find("md-card[node-id*='182e1d16.4a00bb']").prepend(`
      <canvas class='grid-stack-item-content' id='canvas-182e1d16.4a00bb'>
       
      </canvas>`);
      var myiframe = document.getElementById("iframe_dashboard");
       var ctx =  myiframe.contentWindow.document.getElementById('canvas-182e1d16.4a00bb').getContext('2d');
        myDoughnut = new Chart(ctx, config);


myChart['182e1d16.4a00bb'].data.datasets[0].backgroundColor[1] = '#ff0000'; 
myChart['182e1d16.4a00bb'].update();

      myDoughnut.updateDataset({
            data: [60, 60, 60],
            backgroundColor: ['#ff0000', '#00ff00', '#0000ff'],
            label: "Dataset 1",
                 
}) 
          
