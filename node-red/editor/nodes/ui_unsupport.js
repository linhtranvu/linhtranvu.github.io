var ui_unsupport = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_template"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Template
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_template.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_template.png");'
            ></div>
          </div>
        </div>

    `,
  //        ${groupId}
  createNode: function (groupId,type) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"${type}","z":"a7b82102.9b8d38","group":"${groupId}","name":"","order":24,"width":"6","height":"4","format":"<div ng-bind-html=\\"msg.payload\\"></div>","storeOutMessages":true,"fwdInMessages":true,"resendOnRefresh":true,"templateScope":"local","x":110,"y":580,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId,type) {
    return /*html*/ `

<md-card ui-template="me.item.format" ui-card-size="6x4" class="grid-stack-item nr-dashboard-template ng-scope _md visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" ng-show="true" node-id="${newNodeId}" aria-hidden="false"
    style="margin: 0px; border: 3px solid green;">
    <div  class="ng-binding ng-scope grid-stack-item-content"><B>${type}</B></div>
</md-card>

          `;
  },
  edit: function (node) {
    console.log(node);
    // $(node).find(".grid-stack-item-content").html('<b>'+$("#node-input-name").val()+'</b>');
  },
  size: function () {
    return {
      width: 3,
      height: 2,
    };
  },
  load: function (node) {
    console.log(node)
    iframe
      .find("md-card[node-id*='" + node.id + "']")
      .prepend(
        `<img style='width:100%;height:100%;opacity: 0;position:absolute;z-index:5' class='grid-stack-item-content'  src="${editor_host}linhtranvu.github.io/node-red/editor/images/blank.jpg">`
      );    
  },
  loadAll: function (node) {},
};//End JS Object

