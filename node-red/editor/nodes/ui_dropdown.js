var ui_dropdown = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_dropdown"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Dropdown
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_dropdown.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_dropdown.png");'
            ></div>
          </div>
        </div>

    `,
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_dropdown","z":"a7b82102.9b8d38","name":"","label":"Dropdown","tooltip":"","place":"Select option","group":"${groupId}","order":7,"width":"6","height":"1","passthru":true,"multiple":false,"options":[{"label":"","value":"","type":"str"}],"payload":"","topic":"","x":90,"y":280,"wires":[[]]}]`;
  },
  createHTML: function (newNodeId) {
    return /*html*/ `

<md-card ui-card-size="6x1" layout="row" layout-align="space-between center"
    class="nr-dashboard-dropdown ng-scope _md layout-align-space-between-center layout-row visible grid-stack-item"
    node-id="${newNodeId}"
    style="margin: 0px; border: 3px solid green;">
    <md-input-container flex="" layout="row" class="md-auto-horizontal-margin layout-row flex grid-stack-item-content">
        <p class="label ng-binding ng-scope" ng-if="me.item.label" ng-bind-html="me.item.getLabel()">Dropdown</p>
        <md-select ng-if="!me.item.multiple" ng-change="me.itemChanged()" ng-model="me.item.value"
            placeholder="Select option" flex="100"
            class="ng-pristine ng-valid md-auto-horizontal-margin ng-scope ng-empty flex-100 ng-touched" tabindex="0"
            aria-label="{{ me.item.place }}" aria-disabled="false" role="button" aria-haspopup="listbox" id="select_53"
            aria-invalid="false" aria-owns="select_listbox_55" style="">
            <md-select-value class="md-select-value md-select-placeholder" id="select_value_label_52"
                aria-hidden="true"><span>Select option</span><span class="md-select-icon" aria-hidden="true"></span>
            </md-select-value>
        </md-select>
    </md-input-container>
</md-card>

          `;
  },
  edit: function (node) {
    if ($("#node-input-label").val() !== "") {
      if ($(node).find(".label").length > 0) {
        $(node).find(".label").removeClass("ng-hide");
        $(node).find(".label").text($("#node-input-label").val());
      } else {
        $(node).find("md-input-container")
          .prepend(`<md-input-container flex="" layout="row" class="md-auto-horizontal-margin layout-row flex grid-stack-item-content">
        <p class="label ng-binding ng-scope" ng-if="me.item.label" ng-bind-html="me.item.getLabel()">${$(
          "#node-input-label"
        ).val()}</p>`);
      }
    } else {
      $(node).find(".label").addClass("ng-hide");
    }
  },
  size: function () {
    return {
      width: 3,
      height: 1,
    };
  },
  load: function (
    iframe
      .find("md-card[node-id*='" + node.id + "']")
      .prepend(
        `<img style='width:100%;height:100%;opacity: 0;position:absolute;z-index:5' class='grid-stack-item-content'  src="${editor_host}linhtranvu.github.io/node-red/editor/images/blank.jpg">`
      );     
  ) {},
  loadAll: function (node) {},
};//End JS Object

