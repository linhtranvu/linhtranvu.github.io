var ui_text_input = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_text_input"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Text input
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_text_input.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_text_input.png");'
            ></div>
          </div>
        </div>

    `,
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"270d9951.22e04e","type":"ui_text_input","z":"a7b82102.9b8d38","name":"","label":"Text Input","tooltip":"","group":"${groupId}","order":16,"width":5,"height":1,"passthru":true,"mode":"text","delay":300,"topic":"","x":110,"y":520,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId) {
    return /*html*/ `

<md-card ui-card-size="5x1" layout="row" layout-align="space-between center"
    class="grid-stack-item nr-dashboard-textinput ng-scope _md layout-align-space-between-center layout-row visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" node-id="${newNodeId}"
    style="margin: 0px; border: 3px solid green;">
    <md-input-container class="grid-stack-item-content md-block md-auto-horizontal-margin flex has-label" flex="" md-is-error="false"
        ng-class="{'has-label':me.item.label}"> 
            <label ng-bind-html="me.item.getLabel()" class="ng-binding" for="input_0">Text Input</label> 
            <input ng-model="me.item.value"
            ng-model-options="{'timezone':'UTC'}" ng-change="me.valueChanged(300)" ng-trim="false"
            aria-label="Text Input" type="text" style="z-index:1"
            ng-style="(me.item.mode==='color') &amp;&amp; {'padding-left':'25%'}" step="any"
            class="ng-pristine ng-untouched ng-valid md-input ng-empty" id="input_0" aria-invalid="false">
        <div class="md-errors-spacer"></div>
    </md-input-container>
</md-card>

          `;
  },
  edit: function (node) {
    if ($("#node-input-label").val() !== "") {
      if ($(node).find("label").length > 0) {
        $(node).find("label").removeClass("ng-hide");
        $(node).find("label").text($("#node-input-label").val());
      } else {
        $(node)
          .find("md-input-container")
          .prepend(
            `<label ng-bind-html="me.item.getLabel()" class="ng-binding" for="input_0">${$(
              "#node-input-label"
            ).val()}</label> `
          );
      }
    } else {
      $(node).find("label").addClass("ng-hide");
    }
  },
  size: function () {
    return {
      width: 3,
      height: 1,
    };
  },
  load: function (node) {
    iframe
      .find("md-card[node-id*='" + node.id + "']")
      .prepend(
        `<img style='width:100%;height:100%;opacity: 0;position:absolute;z-index:5' class='grid-stack-item-content'  src="${editor_host}linhtranvu.github.io/node-red/editor/images/blank.jpg">`
      );      
  },
  loadAll: function (node) {},
};//End JS Object

