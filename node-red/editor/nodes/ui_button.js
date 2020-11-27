var ui_button = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_button"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Button
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_button.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_button.png");'
            ></div>
          </div>
        </div>

    `,
  createNode: function(groupId){
    return `[{"id":"dd3e69f1.3d3b28","type":"ui_button","z":"a2415835.d93fb8","name":"","group":"${groupId}","order":7,"width":0,"height":0,"passthru":false,"label":"button","tooltip":"","color":"","bgcolor":"","icon":"","payload":"","payloadType":"str","topic":"","x":220,"y":80,"wires":[[]]}]`
  },
  createHTML: function (newNodeId) {
    return /*html*/ `

          <md-card 
            class="nr-dashboard-button visible grid-stack-item " node-id="${newNodeId}" style="margin: 0px; border: 3px solid green;">
            <div class="md-button grid-stack-item-content" style="z-index: 1; padding: 0px; inset: 0px;"
                node-id="${newNodeId}">
                <ui-icon  icon="" 
                    aria-hidden="true">
                    <ng-md-icon  icon="" >
                    </ng-md-icon>
                </ui-icon><span >new button</span>
            </div>
          </md-card>

          `;
  },
  edit: function (node) {

    $(node).find("span").text($("#node-input-label").val());
    $(node)
      .find(".md-button")
      .css({
        "background-color": $("#node-input-bgcolor").val(),
        color: $("#node-input-color").val(),
      });
    if ($("#node-input-icon").val() !== "") {
      $(node)
        .find("ui-icon")
        .removeClass("ng-hide")
        .html(
          `<i class="fa fa-fw ${$(
            "#node-input-icon"
          ).val()}" ng-class="icon"></i>`
        );
    } else {
      $(node).find("ui-icon").addClass("ng-hide");
    }

  },

};//End JS Object
