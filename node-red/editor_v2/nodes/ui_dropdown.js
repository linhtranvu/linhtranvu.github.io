var ui_dropdown = {

  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_dropdown","z":"a7b82102.9b8d38","name":"","label":"Dropdown","tooltip":"","place":"Select option","group":"${groupId}","order":7,"width":"6","height":"1","passthru":true,"multiple":false,"options":[{"label":"","value":"","type":"str"}],"payload":"","topic":"","x":90,"y":280,"wires":[[]]}]`;
  },
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-card-size="6x1" layout="row" layout-align="space-between center"
    class="nr-dashboard-dropdown ng-scope _md layout-align-space-between-center layout-row visible grid-stack-item"
    node-id="${node.id}"
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'       
    style="margin: 0px; border: 3px solid green;">
    ${ui_share.load(node)}
    <md-input-container style='padding:0px;margin:0px' flex="" layout="row" class="md-auto-horizontal-margin layout-row flex">
        <p class="label ng-binding ng-scope" ng-if="me.item.label" ng-bind-html="me.item.getLabel()">${node.label}</p>
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
        $(node).find(".label").removeClass("ng-hide").show();
        $(node).find(".label").text($("#node-input-label").val());
      } else {
        $(node).find("md-input-container")
          .prepend(`<md-input-container flex="" layout="row" class="md-auto-horizontal-margin layout-row flex grid-stack-item-content">
        <p class="label ng-binding ng-scope" ng-if="me.item.label" ng-bind-html="me.item.getLabel()">${$(
          "#node-input-label"
        ).val()}</p>`);
      }
    } else {
      $(node).find(".label").addClass("ng-hide").hide();
    }
    ui_share.edit()
  },
  size: function () {
    return {
      width: 4,
      height: 1,
    };
  },
  load: function (   
  ) {
    
  },
  loadAll: function (node) {},
};//End JS Object

