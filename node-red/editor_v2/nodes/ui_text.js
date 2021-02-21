var ui_text = {
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_text","z":"a7b82102.9b8d38","group":"${groupId}","order":30,"width":0,"height":0,"name":"","label":"text","format":"{{msg.payload}}","layout":"row-spread","x":360,"y":460,"wires":[]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-card-size="6x1" layout="row" layout-align="space-between center"
    class="grid-stack-item nr-dashboard-text ng-scope _md layout-row layout-align-space-between-center nr-dashboard-widget-text visible"
    ng-class="[ me.item.safeLabel, {'nr-dashboard-disabled':me.item.disabled}]" node-id="${node.id}"
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'        
    style="margin: 0px; border: 3px solid green;">
    ${ui_share.load(node)}
    <p class=" label ng-binding" ng-bind-html="me.item.getLabel()">${node.label}</p>
</md-card>

          `;
  },
  edit: function (node) {
    $(node).find(".label").text($("#node-input-label").val());
    ui_share.edit()
  },
  size: function () {
    return {
      width: 3,
      height: 1,
    };
  },
  load: function (node) {
  
  },
  loadAll: function (node) {},
};//End JS Object

