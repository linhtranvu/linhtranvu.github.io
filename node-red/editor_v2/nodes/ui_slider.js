var ui_slider = {
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_slider","z":"a7b82102.9b8d38","name":"","label":"slider","tooltip":"","group":"${groupId}","order":5,"width":"4","height":1,"passthru":true,"outs":"all","topic":"","min":0,"max":10,"step":1,"x":80,"y":400,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-card-size="4x1" flex="" layout="row" layout-align="space-between center"
    class="grid-stack-item nr-dashboard-slider ng-scope _md layout-align-space-between-center layout-row flex visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled, 'nr-dashboard-slider-v':(me.item.width < me.item.height) }"
    ng-swipe-right="$event.stopPropagation();" ng-swipe-left="$event.stopPropagation();" node-id="${node.id}"
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'        
    style="margin: 0px; border: 3px solid green;">
    ${ui_share.load(node)}
    <p ng-show="true" class="label ng-binding" ng-bind-html="me.item.getLabel()" aria-hidden="false">${node.label}</p>
    <md-slider ng-if="me.item.outs==='all'" flex="100" min="0" max="10" step="1" ng-model="me.item.value"
        aria-label="slider" ng-change="me.valueChanged(10)" ng-on-wheel="me.wheel($event)"
        style="z-index: 1; padding: 0px; inset: 0px;"
        ng-attr-md-vertical="{{ (me.item.width < me.item.height) || undefined}}"
        ng-attr-md-invert="{{ me.item.invert || undefined}}"
        class="ng-pristine ng-untouched ng-valid ng-scope ng-isolate-scope flex-100 ng-not-empty md-max"
        aria-invalid="false">
        <div class="md-slider-wrapper" tabindex="0" role="slider" style="touch-action: pan-y;" aria-valuenow="10"
            aria-valuemin="0" aria-valuemax="10">
            <div class="md-slider-content">
                <div class="md-track-container">
                    <div class="md-track"></div>
                    <div class="md-track md-track-fill" style="width: 100%;"></div>
                    <div class="md-track-ticks"></div>
                </div>
                <div class="md-thumb-container" style="left: 100%;">
                    <div class="md-thumb"></div>
                    <div class="md-focus-thumb"></div>
                    <div class="md-focus-ring"></div>
                    <div class="md-sign"><span class="md-thumb-text">10</span></div>
                    <div class="md-disabled-thumb"></div>
                </div>
            </div>
        </div>
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

