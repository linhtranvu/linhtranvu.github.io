var ui_switch = {
  // ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_switch","z":"a7b82102.9b8d38","name":"","label":"switch","tooltip":"","group":"${groupId}","order":1,"width":"3","height":1,"passthru":true,"decouple":"false","topic":"","style":"","onvalue":"true","onvalueType":"bool","onicon":"","oncolor":"","offvalue":"false","offvalueType":"bool","officon":"","offcolor":"","x":80,"y":340,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-card-size="3x1" layout="row" layout-align="space-between center"
    class="nr-dashboard-switch ng-scope _md layout-align-space-between-center layout-row visible grid-stack-item"
    ng-click="me.switchClick()" ng-class="{'nr-dashboard-disabled':me.item.disabled}" node-id="${node.id}"
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'        
    role="button" tabindex="0" style="margin: 0px; border: 3px solid green;">
    ${ui_share.load(node)}
    <p ng-if="me.item.label &amp;&amp; (me.item.width !== 1)" class="label ng-binding ng-scope"
        ng-bind-html="me.item.getLabel()">switch</p>
    <md-switch ng-model="me.item.value" ng-change="me.item.value = !me.item.value"
        ng-swipe-right="$event.stopPropagation();" ng-swipe-left="$event.stopPropagation();" aria-label="switch"
        ng-class="{'center' : !me.item.label}"
        ng-if="!me.item.oncolor || !me.item.onicon || !me.item.offcolor || !me.item.officon" style=" z-index: 1; padding: 0px; inset: 0px;"
        tabindex="0" type="checkbox" role="checkbox"
        class="md-auto-horizontal-margin ng-pristine ng-untouched ng-valid ng-scope ng-empty" aria-checked="false"
        aria-invalid="false">
        <div class="md-container" style="touch-action: pan-x;">
            <div class="md-bar"></div>
            <div class="md-thumb-container">
                <div class="md-thumb md-ink-ripple" md-ink-ripple="" md-ink-ripple-checkbox=""></div>
            </div>
        </div>
        <div ng-transclude="" class="md-label"></div>
</md-card>

          `;
  },
  edit: function (node) {
    if ($("#node-input-label").val() !== "") {
      if ($(node).find(".label").length > 0) {
        $(node).find(".label").removeClass("ng-hide").show();
        $(node).find(".label").text($("#node-input-label").val());
      } else {
        $(node)
          .prepend(`<p ng-if="me.item.label &amp;&amp; (me.item.width !== 1)" class="label ng-binding ng-scope"
        ng-bind-html="me.item.getLabel()">${$("#node-input-label").val()}</p>`);
      }
    } else {
      $(node).find(".label").addClass("ng-hide").hide();
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
    iframe
      .find("md-card[node-id*='" + node.id + "']")
      .prepend(
        `<img style='width:100%;height:100%;opacity: 0;position:absolute;z-index:5' class='grid-stack-item-content'  src="${editor_host}linhtranvu.github.io/node-red/editor_v2/images/blank.jpg">`
      );      
  },
  loadAll: function (node) {},
};//End JS Object

