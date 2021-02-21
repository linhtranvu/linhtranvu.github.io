var ui_worldmap = {
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_worldmap","z":"a7b82102.9b8d38","group":"${groupId}","order":4,"width":4,"height":5,"name":"","lat":"","lon":"","zoom":"","layer":"","cluster":"","maxage":"","usermenu":"hide","layers":"hide","panit":"false","panlock":"false","zoomlock":"false","hiderightclick":"true","coords":"none","showgrid":"false","path":"/worldmap","x":500,"y":180,"wires":[]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `


<md-card ui-template="me.item.format" ui-card-size="6x4" class="grid-stack-item nr-dashboard-template ng-scope _md visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" ng-show="true" node-id="${node.id}" aria-hidden="false"
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'      
    style="margin: 0px; border: 3px solid green;">
    ${ui_share.load(node)}
    <div class='div_map_iframe'>
      <iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${this.getUrl(node.lat,node.lon)}" style="border: 1px solid black"></iframe>
    </div>    
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

    var editNode = {
      lon: $("#node-input-lon").val(),
      lat: $("#node-input-lat").val(),
      id: currentSelectNodeObject.id
    };
    $(node).find('iframe').attr('src',this.getUrl(editNode.lat,editNode.lon))

    ui_share.edit()
    
    //$(node).find(".label").text($("#node-input-label").val());
  },
  load: function (node) {

  },
  loadAll: function (node) {},
  getUrl: function (lat,lon) {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lon)-0.0511}%2C${parseFloat(lat)-0.029249}%2C${parseFloat(lon)+0.0511}%2C${parseFloat(lat)+0.02932}&amp;layer=mapnik&amp;marker=${lat}%2C${lon}`
  },
};//End JS Object


