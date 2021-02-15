var ui_form = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_form"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Form
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_form.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_form.png");'
            ></div>
          </div>
        </div>

    `,
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"603f8df7.466f8c","type":"ui_form","z":"a7b82102.9b8d38","name":"","label":"","group":"${groupId}","order":29,"width":0,"height":0,"options":[{"label":"","value":"","type":"text","required":true,"rows":null}],"formValue":{"":""},"payload":"","submit":"submit","cancel":"cancel","topic":"","x":300,"y":520,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item md-card-grid    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId) {
    return /*html*/ `

<md-card ui-card-size="6x2" layout="row" layout-align="space-between center"
    class="grid-stack-item md-card-grid nr-dashboard-form ng-scope _md layout-align-space-between-center layout-row visible"
    node-id="${newNodeId}" style="margin: 0px; border: 3px solid green; ">
    <form name="form" ng-submit="me.submit(form)" style="margin-top: 10px"
        class="ng-pristine ng-invalid ng-invalid-required grid-stack-item-content">
        <!-- ngIf: me.item.label -->
        <!-- ngRepeat: opt in me.item.options track by $index -->
        <div layout-gt-sm="row" ng-repeat="opt in me.item.options track by $index" class="ng-scope layout-gt-sm-row">
            <md-input-container class="md-block md-auto-horizontal-margin flex md-input-invalid"
                style="height:48px !important" flex="">
                <!-- ngIf: (opt.type=='text' || opt.type=='number' || opt.type=='email' || opt.type=='multiline' || opt.type=='password' || opt.type=='date') && opt.label -->
                <!-- ngIf: opt.type=='text' || opt.type=='email' || opt.type=='password' --><input
                    ng-if="opt.type=='text' || opt.type=='email' || opt.type=='password'" type="text"
                    ng-model="me.item.formValue[opt.value]" ng-required="opt.required" ng-keydown="me.stop($event)"
                    class="ng-pristine ng-scope md-input ng-empty ng-invalid ng-invalid-required ng-touched"
                    id="input_19" required="required" aria-invalid="true" style="">
                <div class="md-errors-spacer"></div>
 
            </md-input-container>
        </div><
        <div layout-gt-sm="row" style="margin-top:0px" class="layout-gt-sm-row"> <button
                class="md-raised nr-dashboard-form-button md-button md-ink-ripple" type="submit"
                ng-transclude="">submit</button> <!-- ngIf: me.item.cancel != '' --><button
                class="md-raised nr-dashboard-form-button md-button ng-scope md-ink-ripple" type="button"
                ng-transclude="" ng-if="me.item.cancel != ''" ng-click="me.reset()">cancel</button>
        </div>
    </form>
</md-card>
          `;
  },

  // Label          $("#node-input-label").val()

  edit: function (node) {
    $(node)
      .find("form")
      .html($(".node-input-option-container-row > div").html());
  }, //end function edit
  size: function () {
    return {
      width: 4,
      height: 4,
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

