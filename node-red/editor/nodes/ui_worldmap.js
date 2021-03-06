var ui_worldmap = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_worldmap"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Worldmap
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red/white-globe.svg"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red/white-globe.svg");'
            ></div>
          </div>
        </div>

    `,
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_worldmap","z":"a7b82102.9b8d38","group":"${groupId}","order":4,"width":4,"height":5,"name":"","lat":"","lon":"","zoom":"","layer":"","cluster":"","maxage":"","usermenu":"hide","layers":"hide","panit":"false","panlock":"false","zoomlock":"false","hiderightclick":"true","coords":"none","showgrid":"false","path":"/worldmap","x":500,"y":180,"wires":[]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId) {
    return /*html*/ `


<md-card ui-template="me.item.format" ui-card-size="6x4" class="grid-stack-item nr-dashboard-template ng-scope _md visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" ng-show="true" node-id="${newNodeId}" aria-hidden="false"
    style="margin: 0px; border: 3px solid green;">
    <img style='width:100%' class='grid-stack-item-content' src="${editor_host}linhtranvu.github.io/node-red/editor/images/worldmap.jpg">
</md-card>

          `;
  },
  size: function () {
    return {
      width: 4,
      height: 4,
    };
  },
  edit: function (node) {

    var node = {
      lon: $("#node-input-lon").val(),
      lat: $("#node-input-lat").val(),
      id: currentSelectNodeObject.id
    };

    this.load(node)

    //$(node).find(".label").text($("#node-input-label").val());
  },
  load: function (node) {
    iframe.find("md-card[node-id*='" + node.id + "']").children().not('.md-card-ui-select').remove()
    iframe.find("md-card[node-id*='" + node.id + "']").prepend(
      `
        <img style='width:100%;height:100%;opacity: 0;position:absolute;z-index:15' class='grid-stack-item-content'  src="${editor_host}linhtranvu.github.io/node-red/editor/images/blank.jpg">

<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${node.lon-0.0511}%2C${node.lat-0.029249}%2C${parseInt(node.lon)+0.0511}%2C${parseInt(node.lat)+0.02932}&amp;layer=mapnik&amp;marker=${node.lat}%2C${node.lon}" style="border: 1px solid black"></iframe>

        `
    );  

  },
  loadAll: function (node) {},
};//End JS Object


