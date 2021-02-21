var ui_text_input = {

  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_text_input","z":"a7b82102.9b8d38","name":"","label":"Text Input","tooltip":"","group":"${groupId}","order":16,"width":5,"height":1,"passthru":true,"mode":"text","delay":300,"topic":"","x":110,"y":520,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-card-size="5x1" layout="row" layout-align="space-between center"
    class="grid-stack-item nr-dashboard-textinput ng-scope _md layout-align-space-between-center layout-row visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" node-id="${node.id}"
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'        
    style="margin: 0px; border: 3px solid green;">
    ${ui_share.load(node)}
    <md-input-container class=" md-block md-auto-horizontal-margin flex has-label" flex="" md-is-error="false"
        ng-class="{'has-label':me.item.label}"> 
            <label ng-bind-html="me.item.getLabel()" class="ng-binding" for="input_0">${node.label}</label> 
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
        $(node).find("label").removeClass("ng-hide").show();
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
      $(node).find("label").addClass("ng-hide").hide();
    }
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

