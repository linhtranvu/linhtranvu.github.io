var ui_button = {
  createNode: function (groupId) {
    return `[{"id":"${Math.random()
      .toString(36)
      .substr(
        2,
        15
      )}","type":"ui_button","z":"a2415835.d93fb8","name":"","group":"${groupId}","order":7,"width":0,"height":0,"passthru":false,"label":"button","tooltip":"","color":"","bgcolor":"","icon":"","payload":"","payloadType":"str","topic":"","x":220,"y":80,"wires":[[]]}]`;
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
    ui_share.edit();
  },
  size: function () {
    return {
      width: 3,
      height: 1,
    };
  },
  createHTML: function (node) {
    if (node.icon !== "") {
      icon = ` <ui-icon  icon="" 
                    aria-hidden="true">
              <i class="fa fa-fw ${node.icon}" ng-class="icon"></i>                    
                </ui-icon>`;
    } else {
      icon = ``;
    }

    shareHTML = ui_share.load(node);

    return /*html*/ `

          <md-card 
            class="nr-dashboard-button visible grid-stack-item " 
            node-id="${node.id}" style="margin: 0px; border: 3px solid green;"
            data-gs-width='${node.width}' data-gs-height='${node.height}'
            data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'
            >
            ${shareHTML}
            <div class="md-button " style="z-index: 1; padding: 0px; inset: 0px;
            background-color:${node.bgcolor};color:${node.color}"
                node-id="${node.id}">
                ${icon}
              <span >${node.label}</span>
            </div>
          </md-card>

          `;
  },
  load: function (node) {},
};//End JS Object

