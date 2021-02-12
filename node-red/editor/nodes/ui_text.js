var ui_text = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_text"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Text
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_text.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_text.png");'
            ></div>
          </div>
        </div>

    `,
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"f43d6c55.a2e4d","type":"ui_text","z":"a7b82102.9b8d38","group":"${groupId}","order":30,"width":0,"height":0,"name":"","label":"text","format":"{{msg.payload}}","layout":"row-spread","x":360,"y":460,"wires":[]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId) {
    return /*html*/ `

<md-card ui-card-size="6x1" layout="row" layout-align="space-between center"
    class="grid-stack-item nr-dashboard-text ng-scope _md layout-row layout-align-space-between-center nr-dashboard-widget-text visible"
    ng-class="[ me.item.safeLabel, {'nr-dashboard-disabled':me.item.disabled}]" node-id="${newNodeId}"
    style="margin: 0px; border: 3px solid green;">
    <p class="grid-stack-item-content label ng-binding" ng-bind-html="me.item.getLabel()">text</p>
</md-card>

          `;
  },
  edit: function (node) {
    $(node).find(".label").text($("#node-input-label").val());
  },
  size: function () {
    return {
      width: 3,
      height: 1,
    };
  },
  load: function (node) {},
  loadAll: function (node) {},
};//End JS Object

