var ui_template = {

  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_template","z":"a7b82102.9b8d38","group":"${groupId}","name":"","order":24,"width":"6","height":"4","format":"<div ng-bind-html=\\"msg.payload\\"></div>","storeOutMessages":true,"fwdInMessages":true,"resendOnRefresh":true,"templateScope":"local","x":110,"y":580,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-template="me.item.format" ui-card-size="6x4" class="grid-stack-item nr-dashboard-template ng-scope _md visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" ng-show="true" node-id="${node.id}" 
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'        
    aria-hidden="false"
    style="margin: 0px; border: 3px solid green;">
    ${ui_share.load(node)}
    <div ng-bind-html="msg.payload" class="ng-binding ng-scope "><B>TEMPLATE</B></div>
</md-card>

          `;
  },
  edit: function (node) {
    // $(node).find(".label").text($("#node-input-title").val());
    ui_share.edit()
  },
  size: function () {
    return {
      width: 4,
      height: 4,
    };
  },
  load: function (node) {

  },
  loadAll: function (node) {},
};//End JS Object

